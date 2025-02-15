from rest_framework import serializers
from .models import User, UserMessage, Message, Response

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = ['id', 'text', 'timestamp']

class MessageSerializer(serializers.ModelSerializer):
    responses = ResponseSerializer(many=True)

    class Meta:
        model = Message
        fields = ['id', 'text', 'timestamp', 'responses']

        
        
class UserMessagesSerializer(serializers.ModelSerializer):     
    user = UserSerializer()
    message = MessageSerializer(many=True) 
    response = ResponseSerializer(many=True) 
    