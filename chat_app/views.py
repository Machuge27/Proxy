from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from .forms import CustomSignUpForm, CustomSignInForm
from .models import Message, Response
import json


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


def sign_up(request):
    if request.method == "POST":
        form = CustomSignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            UserMessage.objects.create(user=user)
            tokens = get_tokens_for_user(user)
            login(request, user)
            response = redirect("chat_page")
            response.set_cookie("access_token", tokens["access"], httponly=True)
            response.set_cookie("refresh_token", tokens["refresh"], httponly=True)
            print(response)
            return response
    else:
        form = CustomSignUpForm()
    return render(request, "chat_app/custom_sign_up.html", {"form": form})


def sign_in(request):
    if request.method == "POST":
        messages_data1 = [
            {
                "message": [
                    {
                        "text": "text",
                        "responses": ["good morning", "good morning too"],
                        "id": 1,
                        "timestamp": "22:20",
                    },
                    {
                        "text": "text1",
                        "responses": ["good evening"],
                        "id": 2,
                        "timestamp": "12:43",
                    },
                ]
            },
            {
                "message": [
                    {
                        "text": "text",
                        "responses": ["good morning", "good morning too"],
                        "id": 1,
                        "timestamp": "18:48",
                    },
                    {
                        "text": "text1",
                        "responses": ["good evening"],
                        "id": 2,
                        "timestamp": "5:16",
                    },
                ]
            },
        ]
            
        try:
            user_details = json.loads(request.body)
            username = user_details["username"]
            password = user_details["password"]
            print(username, password)
            user = authenticate(request, username=username, password=password)
            print(user)
            if user is not None:
                print("signed in")
                tokens = get_tokens_for_user(user)
                login(request, user)
                # Return JSON response with tokens and redirect URL
                for message in messages_data1:
                    messageList = message["message"]
                    for message in messageList:
                        messageInstance = Message.objects.create(
                            text=message['text'], user=request.user
                        )
                        for response in message.responses:
                            response = Response.objects.create(
                                text=response, message=messageInstance
                            )
                    print("data added")
                return JsonResponse(
                    {
                        "access": tokens["access"],
                        "refresh": tokens["refresh"],
                        "redirect_url": "/chat/",  # URL to redirect to after successful login
                    }
                )
            else:
                print("not signed in")
                return JsonResponse({"detail": "Invalid credentials"}, status=400)
        except Exception as e:
            return JsonResponse({"detail": str(e)}, status=500)
        
    return render(request, "chat_app/login.html")


def messages_view(request):
    # if not request.user.is_authenticated:
    #     return redirect("sign_in")

    user_message = UserMessage.objects.get(user=request.user)
    messages = user_message.messages.all().prefetch_related("responses")

    messages_data = [
        {
            "message": [
                {
                    "text": message.text,
                    "responses": [
                        response.text for response in message.responses.all()
                    ],
                    "id": message.id,
                    "timestamp": message.timestamp,
                }
                for message in messages
            ]
        }
    ]

    return JsonResponse({"messages": messages_data})


def chat_page(request):
    if not request.user.is_authenticated:
        return redirect("sign_in")
    user = request.user
    return render(request, "chat_app/messages.html", {"user": user})


def log_out(request):
    logout(request)
    return redirect("sign_in")


# from .models import Notice, Message

# def notices(request):
#     notices = Notice.objects.all()
#     messages = Message.objects.all()
#     print(notices)
#     return render(request, 'index.html', {
#         'notices': notices,
#         'messages': messages,
#     })


def getResponse(request):

    pass
