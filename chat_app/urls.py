from django.urls import path
from .views import messages_view, chat_page, log_out, getResponse

urlpatterns = [
    path('user_messages/', messages_view, name='messages_view'),
    path('messages/', chat_page, name='chat_page'),
    path('getResponse/', getResponse, name='getResponse'),
]
