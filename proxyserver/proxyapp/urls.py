from django.urls import path

from . import views

urlpatterns = [
    path('', views.proxy_request, name='proxy'),
    re_path(r'^(?P<path>.*)$', views.proxy_request, name='proxy_with_path'),
    path("test/", views.test, name='test_request'),
]

