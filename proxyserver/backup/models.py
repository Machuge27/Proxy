from django.db import models

class SongBackup(models.Model):
    channelName = models.CharField(max_length=100)
    currentTime = models.CharField(max_length=10)
    duration = models.CharField(max_length=10)
    savedAt = models.DateTimeField()
    title = models.CharField(max_length=100)
    url = models.URLField()
    videoId = models.CharField(max_length=100)
    category = models.CharField(max_length=10)

    def __str__(self):
        return self.title

class BackupStatus(models.Model):
    backup_id = models.AutoField(primary_key=True)
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    is_full = models.BooleanField(default=False)
    success_count = models.IntegerField(default=0)
    error_count = models.IntegerField(default=0)
    status = models.CharField(
        max_length=20, default="running"
    )  # running, completed, failed
    error_message = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ["-started_at"]

    def __str__(self):
        return f"Backup {self.backup_id} - {self.started_at.strftime('%Y-%m-%d %H:%M')}"