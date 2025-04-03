from django.core.management.base import BaseCommand
from pymongo import MongoClient
from django.conf import settings
from backup.models import BackupStatus 
from proxyapp.models import Song 
from django.utils import timezone
import logging
import datetime

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Backs up songs from the main DB to the MongoDB backup DB, incrementally'

    def add_arguments(self, parser):
        parser.add_argument(
            '--full',
            action='store_true',
            help='Perform a full backup instead of incremental',
        )

    def handle(self, *args, **options):
        # Create a new backup status record
        backup_status = BackupStatus.objects.create(
            is_full=options['full'],
            status="running"
        )
        
        try:
            # Get MongoDB connection
            mongo_uri = settings.DATABASES['backup']['CLIENT']['host']
            db_name = settings.DATABASES['backup']['NAME']
            
            # Connect directly with PyMongo
            client = MongoClient(mongo_uri)
            db = client[db_name]
            
            # Collections for songs and backup status
            songs_collection = db['backup_songbackup']
            status_collection = db['backup_backupstatus']
            
            # Determine backup type
            is_full_backup = options['full']
            
            if is_full_backup:
                self.stdout.write(self.style.WARNING('Starting full backup...'))
                songs_to_backup = Song.objects.all()
                self.stdout.write(f"Found {songs_to_backup.count()} songs to backup")
            else:
                # Get the last backup timestamp
                try:
                    last_backup_doc = status_collection.find_one({"_id": 1})
                    if not last_backup_doc:
                        self.stdout.write(self.style.WARNING('No previous backup found, performing full backup'))
                        last_backup_time = timezone.now() - timezone.timedelta(days=365)
                    else:
                        last_backup_time = last_backup_doc.get('last_backup', timezone.now() - timezone.timedelta(days=365))
                        if isinstance(last_backup_time, str):
                            # Parse string to datetime if needed
                            last_backup_time = datetime.datetime.fromisoformat(last_backup_time)
                        self.stdout.write(f"Last backup was on {last_backup_time}")
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'Error getting last backup time: {e}'))
                    last_backup_time = timezone.now() - timezone.timedelta(days=365)
                
                # Fetch songs updated after the last backup timestamp
                songs_to_backup = Song.objects.filter(savedAt__gt=last_backup_time)
                self.stdout.write(f"Found {songs_to_backup.count()} new songs to backup")

            if not songs_to_backup.exists():
                self.stdout.write(self.style.SUCCESS('No new songs to backup'))
                backup_status.status = "completed"
                backup_status.completed_at = timezone.now()
                backup_status.save()
                return

            # Create songs in batches to improve performance
            batch_size = 100
            songs_list = list(songs_to_backup)
            total_songs = len(songs_list)
            success_count = 0
            error_count = 0

            for i in range(0, total_songs, batch_size):
                batch = songs_list[i:i+batch_size]
                
                try:
                    for song in batch:
                        try:
                            # Convert Django model to dictionary for MongoDB
                            song_dict = {
                                'channelName': song.channelName,
                                'currentTime': song.currentTime,
                                'duration': song.duration,
                                'savedAt': song.savedAt,
                                'title': song.title,
                                'url': song.url,
                                'videoId': song.videoId,
                                'category': song.category,
                            }
                            
                            # Check if song already exists
                            existing = songs_collection.find_one({'videoId': song.videoId})
                            
                            if existing:
                                # Update existing document
                                songs_collection.update_one(
                                    {'videoId': song.videoId},
                                    {'$set': song_dict}
                                )
                            else:
                                # Insert new document
                                songs_collection.insert_one(song_dict)
                                
                            success_count += 1
                        except Exception as e:
                            self.stdout.write(self.style.ERROR(f'Error backing up song {song.videoId}: {e}'))
                            error_count += 1
                            continue
                    
                    self.stdout.write(f"Backed up batch {i//batch_size + 1}/{(total_songs-1)//batch_size + 1}")
                
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'Error in batch {i//batch_size + 1}: {e}'))
                    error_count += len(batch)

            # Update the backup timestamp
            current_time = timezone.now()
            status_collection.update_one(
                {'_id': 1},
                {'$set': {'last_backup': current_time}},
                upsert=True
            )

            self.stdout.write(self.style.SUCCESS(
                f'Backup completed: {success_count} songs backed up successfully, {error_count} errors'
            ))
            
            # Update the backup status record
            backup_status.status = "completed"
            backup_status.completed_at = timezone.now()
            backup_status.success_count = success_count
            backup_status.error_count = error_count
            backup_status.save()
            
        except Exception as e:
            error_message = f'Backup failed: {e}'
            self.stdout.write(self.style.ERROR(error_message))
            
            # Update the backup status record to failed
            backup_status.status = "failed"
            backup_status.completed_at = timezone.now()
            backup_status.error_message = str(e)
            backup_status.save()