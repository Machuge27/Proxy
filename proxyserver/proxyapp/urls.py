from django.urls import path, re_path

from . import views

urlpatterns = [
    path('proxy/', views.proxy_request, name='proxy'),
    # re_path(r'^(?P<path>.*)$', views.proxy_request, name='proxy_with_path'),
    path("test/", views.test, name='test_request'),
]

