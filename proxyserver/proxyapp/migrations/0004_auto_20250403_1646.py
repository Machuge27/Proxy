# Generated by Django 3.1.12 on 2025-04-03 13:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('proxyapp', '0003_auto_20250403_1635'),
    ]

    operations = [
        migrations.DeleteModel(
            name='BackupStatus',
        ),
        migrations.DeleteModel(
            name='SongBackup',
        ),
    ]
