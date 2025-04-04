# Generated by Django 3.1.12 on 2025-04-03 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('backup', '0004_auto_20250403_1642'),
    ]

    operations = [
        migrations.CreateModel(
            name='BackupStatus',
            fields=[
                ('backup_id', models.AutoField(primary_key=True, serialize=False)),
                ('started_at', models.DateTimeField(auto_now_add=True)),
                ('completed_at', models.DateTimeField(blank=True, null=True)),
                ('is_full', models.BooleanField(default=False)),
                ('success_count', models.IntegerField(default=0)),
                ('error_count', models.IntegerField(default=0)),
                ('status', models.CharField(default='running', max_length=20)),
                ('error_message', models.TextField(blank=True, null=True)),
            ],
            options={
                'ordering': ['-started_at'],
            },
        ),
        migrations.CreateModel(
            name='SongBackup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('channelName', models.CharField(max_length=100)),
                ('currentTime', models.CharField(max_length=10)),
                ('duration', models.CharField(max_length=10)),
                ('savedAt', models.DateTimeField()),
                ('title', models.CharField(max_length=100)),
                ('url', models.URLField()),
                ('videoId', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=10)),
            ],
        ),
    ]
