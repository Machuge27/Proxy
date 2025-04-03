from celery import shared_task
from django.core.management import call_command

@shared_task
def scheduled_backup(full=False):
    call_command('backup', full=full)