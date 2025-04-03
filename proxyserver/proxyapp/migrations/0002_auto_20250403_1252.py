# Generated by Django 3.1.12 on 2025-04-03 09:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proxyapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BackupStatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_backup', models.DateTimeField()),
            ],
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
        migrations.AlterField(
            model_name='song',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
