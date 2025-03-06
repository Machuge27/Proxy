from django.urls import path

from .views import proxy_request, test

urlpatterns = [
    path("proxy/", proxy_request, name='proxy_request'),
    path("test/", test, name='test_request'),
]