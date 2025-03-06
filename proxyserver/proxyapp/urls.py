from django.urls import path

from .views import proxy_request

urlpatterns = [
    path("proxy/", proxy_request, name='proxy_request'),
]