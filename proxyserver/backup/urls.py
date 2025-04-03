from django.urls import path
from .views import BackupAPIView

urlpatterns = [
    # Other URL patterns...
    path('backup/', BackupAPIView.as_view(), name='backup-api'),
]