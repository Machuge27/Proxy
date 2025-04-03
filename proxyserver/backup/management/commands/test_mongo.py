from django.core.management.base import BaseCommand
from pymongo import MongoClient
from django.conf import settings

class Command(BaseCommand):
    help = 'Test direct MongoDB connection with PyMongo'

    def handle(self, *args, **options):
        try:
            # Get the MongoDB connection string from settings.py
            mongo_uri = settings.DATABASES['backup']['CLIENT']['host']

            # Connect using PyMongo directly
            client = MongoClient(mongo_uri)
            db_info = client.server_info()

            self.stdout.write(self.style.SUCCESS('Successfully connected to MongoDB Atlas'))
            self.stdout.write(f'MongoDB version: {db_info.get("version", "unknown")}')

            # Get database name
            db_name = settings.DATABASES['backup']['NAME']
            db = client[db_name]  # Select the database
            collections = db.list_collection_names()  # List all collections

            self.stdout.write(f'Collections in database: {", ".join(collections) if collections else "No collections found"}')

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Connection failed: {e}'))
