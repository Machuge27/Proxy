# views.py
# from django.http import JsonResponse
# from django.core.management import call_command
# from backup.models import BackupStatus

# def trigger_backup(request):
#     try:
#         # Call the management command directly via API
#         call_command('backup')  # Backup command
        
#         return JsonResponse({"status": "success", "message": "Backup started!"}, status=200)
#     except Exception as e:
#         return JsonResponse({"status": "error", "message": str(e)}, status=500)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.core.management import call_command
import threading

class BackupAPIView(APIView):
    # permission_classes = [IsAdminUser]  # Only admin users can trigger a backup
    
    def post(self, request, *args, **kwargs):
        # Get parameters from request
        is_full = request.data.get('full', False)
        
        # Run the backup in a separate thread to avoid blocking the API response
        def run_backup():
            call_command('backup', full=is_full)
        
        thread = threading.Thread(target=run_backup)
        thread.start()
        
        return Response({
            "status": "success",
            "message": "Backup process started",
            "type": "full" if is_full else "incremental"
        })