# # chat_app/models.py
# Create your models here.

from django.contrib.auth.models import AbstractUser, User
from django.db import models

class User(AbstractUser):
    username=models.CharField(max_length=100, unique=True, null=False)

    def __str__(self):
        return f"{self.username}"

class UserMessage(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_message')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_message')
    id = models.AutoField(primary_key=True)
    
    def __str__(self):
        return f"Messages for {self.user.username}"    

class Message(models.Model):
    user_message = models.ForeignKey(UserMessage, on_delete=models.CASCADE, related_name='text')
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.text

class Response(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name='responses')
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.text

# from django.db import models
# from django.contrib.auth.models import AbstractUser
# from django.utils import timezone

# class User(AbstractUser):
    
#     def __str__(self):
#         return self.username

# class Message(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_message')
#     text = models.TextField()
#     updated = models.DateTimeField(auto_now=True)
#     timestamp = models.DateTimeField(default=timezone.now)

#     def __str__(self):
#         return self.text

# class Response(models.Model):
#     response = models.ForeignKey(Message, on_delete=models.CASCADE, related_name='responses')
#     text = models.TextField()
#     timestamp = models.DateTimeField(default=timezone.now)
    
#     def __str__(self):
#         return self.text

