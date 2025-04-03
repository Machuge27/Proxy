# Example Queries

### Get favourite songs (category "Fav")
```http
GET /api/songs?filter=favourites
```

### Search for favourite songs by title
```http
GET /api/songs?filter=favourites&search=lofi
```

### Get songs from a specific category (e.g., "Hip-hop")
```http
GET /api/songs?category=Hip-hop
```

### Get songs from a specific channel
```http
GET /api/songs?channel=ChillVibes
```

---

# Setting Up MongoDB Atlas for Backup

Using **MongoDB Atlas** for backup is a great choice. 🗃️ Here's how you can set it up to back up your songs from your **Django app**.

## Steps to Set Up MongoDB Atlas as a Backup DB

### 1️⃣ Set Up MongoDB Atlas
1. **Create an Atlas Account**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. **Create a Cluster** in Atlas.
3. **Create a Database User** with read/write permissions.
4. **Obtain the Connection String** (e.g., `mongodb+srv://<username>:<password>@cluster.mongodb.net/myDatabase`).

---

### 2️⃣ Install Dependencies
Install `djongo` to connect Django with MongoDB.

```bash
pip install djongo
```

---

### 3️⃣ Configure MongoDB Atlas in Django
Update your **Django settings** to use MongoDB as a secondary backup database.

#### `settings.py`
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_main_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    },
    'backup': {
        'ENGINE': 'djongo',
        'NAME': 'backup_db',
        'ENABLED': True,
        'CLIENT': {
            'host': 'mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority',
        },
    }
}
```

---

### 4️⃣ Create a Custom Management Command to Back Up Songs

#### Create the Command
```bash
python manage.py startapp backup
```

Inside `backup/management/commands`, create `backup_songs.py`.

#### `backup/management/commands/backup_songs.py`
```python
from django.core.management.base import BaseCommand
from django.db import connections
from backup.models import SongBackup
from songs.models import Song

class Command(BaseCommand):
    help = 'Backs up songs from the main DB to the MongoDB backup DB'

    def handle(self, *args, **kwargs):
        backup_db = connections['backup']
        songs = Song.objects.all()

        for song in songs:
            SongBackup.objects.using('backup').create(
                channelName=song.channelName,
                currentTime=song.currentTime,
                duration=song.duration,
                savedAt=song.savedAt,
                title=song.title,
                url=song.url,
                videoId=song.videoId,
                category=song.category,
                is_favourite=song.is_favourite
            )
        self.stdout.write(self.style.SUCCESS('Successfully backed up songs to MongoDB Atlas'))
```

---

### 5️⃣ Set Up the Backup Model

#### `backup/models.py`
```python
from djongo import models

class SongBackup(models.Model):
    channelName = models.CharField(max_length=100)
    currentTime = models.CharField(max_length=10)
    duration = models.CharField(max_length=10)
    savedAt = models.DateTimeField()
    title = models.CharField(max_length=100)
    url = models.URLField()
    videoId = models.CharField(max_length=100)
    category = models.CharField(max_length=10)
    is_favourite = models.BooleanField(default=False)

    def __str__(self):
        return self.title
```

---

### 6️⃣ Running the Backup Command
Run the custom management command to back up your songs.

```bash
python manage.py backup_songs
```

---

### 7️⃣ Automating Backups (Optional)
Automate the process using **cron jobs** or **Celery**.

#### Cron Job Example
Run the backup command daily at midnight:
```bash
0 0 * * * /path/to/your/venv/bin/python /path/to/your/project/manage.py backup_songs
```

---

## Backup Considerations
- **Consistency**: Ensure the backup process is atomic.
- **Size**: Use pagination for large datasets.
- **Restore**: Create a restore command if needed.

---

## Conclusion
- **MongoDB Atlas** serves as your backup database.
- Automate the process for regular backups.
- Query both your primary and backup databases as needed.

Let me know if you need further assistance! 😎

To implement incremental backups where every time the server runs, it backs up only the songs that have been **added or updated since the last backup**, we can use **timestamps** to track when the last backup was done. 

Here’s how we can handle this:

### **1️⃣ Track Last Backup Timestamp**
We need a way to store the timestamp of the **last successful backup**. You can store this timestamp in the **database** (preferably in a separate table for backup tracking) or in a **file**.

For this example, we will use a **backup status model** to store the timestamp in the database.

---

### **2️⃣ Add a Backup Status Model**
We’ll create a simple model to store the **last backup timestamp**.

#### **backup/models.py**
```python
from django.db import models

class BackupStatus(models.Model):
    last_backup = models.DateTimeField()

    def __str__(self):
        return f"Last Backup: {self.last_backup}"
```

Now, every time we perform a backup, we’ll update the `last_backup` field with the current timestamp.

---

### **3️⃣ Modify the Backup Command for Incremental Backups**
The backup command will now check the **last backup timestamp**, fetch songs that were **added or updated after that timestamp**, and then perform the backup.

#### **backup/management/commands/backup_songs.py**
```python
from django.core.management.base import BaseCommand
from django.db import connections
from backup.models import SongBackup, BackupStatus
from songs.models import Song
from django.utils import timezone

class Command(BaseCommand):
    help = 'Backs up songs from the main DB to the MongoDB backup DB, incrementally'

    def handle(self, *args, **kwargs):
        # Get the last backup timestamp
        try:
            last_backup = BackupStatus.objects.first().last_backup
        except BackupStatus.DoesNotExist:
            # If no backup exists, back up everything
            last_backup = timezone.now() - timezone.timedelta(days=365)  # Just an old date for the first run

        # Fetch songs updated after the last backup timestamp
        songs_to_backup = Song.objects.filter(savedAt__gt=last_backup)

        if not songs_to_backup.exists():
            self.stdout.write(self.style.SUCCESS('No new songs to backup'))
            return

        # Connect to MongoDB Atlas backup DB
        backup_db = connections['backup']

        # Backup the songs to MongoDB Atlas
        for song in songs_to_backup:
            SongBackup.objects.using('backup').create(
                channelName=song.channelName,
                currentTime=song.currentTime,
                duration=song.duration,
                savedAt=song.savedAt,
                title=song.title,
                url=song.url,
                videoId=song.videoId,
                category=song.category,
                is_favourite=song.is_favourite
            )

        # Update the backup timestamp
        # If the backup is successful, update the last_backup time
        if songs_to_backup.exists():
            # Update last backup time
            BackupStatus.objects.update_or_create(
                id=1,
                defaults={'last_backup': timezone.now()}
            )

        self.stdout.write(self.style.SUCCESS('Successfully backed up songs to MongoDB Atlas'))
```

### **Explanation:**
1. **Backup Status Model**: We use a `BackupStatus` model to track the timestamp of the **last successful backup**. This way, we know which songs to back up next time.
   
2. **Incremental Backup Logic**:
   - The command first checks the timestamp of the last backup.
   - It then fetches only the **songs** that have been added or updated **since the last backup** using `Song.objects.filter(savedAt__gt=last_backup)`.
   
3. **MongoDB Backup**: It then backs up these songs to MongoDB Atlas using `SongBackup.objects.using('backup').create(...)`.

4. **Updating the Timestamp**: After performing a successful backup, the command updates the `last_backup` timestamp in the `BackupStatus` model to the current time.

---

### **4️⃣ Handling the First Backup**
If it's the first time you're running the backup, there won't be any backup status stored in the database. In that case, we assign a **default timestamp** (e.g., a date far in the past, such as 365 days ago). This ensures that all songs will be backed up during the first run.

---

### **5️⃣ Automating the Incremental Backup**
You can still automate this process with **cron jobs** or **Celery** so that the incremental backup happens periodically.

For example, you can run the backup every day at midnight:

```bash
0 0 * * * /path/to/your/venv/bin/python /path/to/your/project/manage.py backup_songs
```

This will trigger the incremental backup and ensure only new or updated songs are backed up.

---

### **6️⃣ Additional Considerations**
- **Handling Failures**: If the backup fails midway, you may want to have a retry mechanism or handle failures gracefully to avoid partial backups.
- **Database Changes**: If your song model changes (e.g., fields are added or removed), make sure to adjust the backup logic accordingly.

---

### **Conclusion:**
Now, your Django app will perform **incremental backups** to MongoDB Atlas, only backing up **new or modified songs** since the last backup. The `BackupStatus` model ensures you’re always backing up the right songs.

Let me know if you need more help or further customizations! 🚀


---
---

Yes! Your username **"mutai"** is being misinterpreted as the port number. This typically happens when there's an **issue with how the connection string is formatted** in your `settings.py`.  

### **Why This Happens?**
MongoDB's connection string follows this pattern:  
```
mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/DB_NAME?options
```
If your username or password contains **special characters** like `@`, `:`, or `/`, they must be **URL-encoded**, or MongoDB will misinterpret them.

---

### **✅ Steps to Fix It**

#### **1. URL-Encode Your Username & Password**
- If your **username is `mutai`** and your **password is `p@ssw:rd`**, you must **URL-encode special characters**:
  - `@` → `%40`
  - `:` → `%3A`
  - `/` → `%2F`

- Example: If your **password** is `mutai@123`, it should be written as:
  ```
  mutai%40123
  ```

✅ **Correct example:**
```python
"CLIENT": {
    "host": "mongodb+srv://mutai:mutai%40123@cluster0.ch21p.mongodb.net/Youflix?retryWrites=true&w=majority",
}
```

---

#### **2. Validate Your Connection String**
Before running your Django command, **test your MongoDB connection** manually with `pymongo`:

```python
import pymongo

uri = "mongodb+srv://mutai:mutai%40123@cluster0.ch21p.mongodb.net/Youflix?retryWrites=true&w=majority"

try:
    client = pymongo.MongoClient(uri)
    db_info = client.server_info()
    print(f"Connected to MongoDB! Version: {db_info['version']}")
except Exception as e:
    print(f"Connection failed: {e}")
```
✅ **If this works**, your issue is in how `djongo` handles the connection.

---

#### **3. Update `settings.py`**
Ensure your **database settings** are correctly defined:
```python
DATABASES = {
    "backup": {
        "ENGINE": "djongo",
        "NAME": "Youflix",
        "CLIENT": {
            "host": "mongodb+srv://mutai:mutai%40123@cluster0.ch21p.mongodb.net/Youflix?retryWrites=true&w=majority",
        },
    }
}
```

---

#### **4. Restart Your Django App**
After fixing the settings, restart your Django project:
```sh
python manage.py runserver
```
Then test the connection:
```sh
python manage.py test_mongo
```

---
### **🚀 Expected Output**
If everything is correct, you should see:
```sh
Successfully connected to MongoDB Atlas
MongoDB version: 5.0.14
Collections in database: users, videos, playlists
```

---
### **✅ Summary**
✔ URL-encode special characters in **username/password**  
✔ Test connection manually using `pymongo`  
✔ Update `settings.py` with the **correct connection string**  
✔ Restart Django & test again  

Try this and let me know if you still get an error! 🚀

### Here's how we can approach this:

1. **Manual backup via the Django command**: You're already using this part to back up songs manually using a Django management command.
2. **API request-based backup**: This involves creating an API endpoint that triggers the backup when needed.
3. **Automating the backup process**: We can use Django's built-in **`crontab`** or **`Celery`** for scheduling the automated backup every 6 hours.

---

### **1. API Request to Trigger Backup**

We'll expose an API endpoint that triggers this backup process. First, you'll need to add a new view that calls your backup logic.

#### **Create the API Endpoint**

1. **Create a view** to handle the backup API request:
```python
# views.py
from django.http import JsonResponse
from django.core.management import call_command

def trigger_backup(request):
    try:
        # Call the management command directly via API
        call_command('backup_songs')  # Name of your backup command
        
        return JsonResponse({"status": "success", "message": "Backup started!"}, status=200)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
```

2. **Add URL routing** for the backup endpoint:
```python
# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('api/backup/', views.trigger_backup, name='trigger_backup'),
]
```

---

### **2. Automating the Backup Process**

You have two main ways to schedule tasks in Django: **Crontab** or **Celery**. Let's go over both options:

#### **A. Using Django-crontab (Simple Cron Job)**

If you prefer not to use Celery, **Django-crontab** allows you to schedule management commands.

1. **Install Django-crontab**:
   ```sh
   pip install django-crontab
   ```

2. **Add it to `INSTALLED_APPS` in `settings.py`**:
   ```python
   INSTALLED_APPS = [
       ...,
       'django_crontab',
   ]
   ```

3. **Set up a cron job to run every 6 hours**:
   You can schedule the backup command to run every 6 hours by adding it to `CRONJOBS` in your `settings.py`:
   ```python
   CRONJOBS = [
       ('0 */6 * * *', 'django.core.management.call_command', ['backup_songs']),
   ]
   ```

4. **Apply the cron jobs**:
   Run this command to add the cron jobs:
   ```sh
   python manage.py crontab add
   ```

5. **Check and remove cron jobs**:
   If needed, you can list the scheduled jobs or remove them with:
   ```sh
   python manage.py crontab show
   python manage.py crontab remove
   ```

#### **B. Using Celery for Task Scheduling (Advanced Option)**

If you're dealing with complex tasks or want better control over task scheduling, **Celery** is a more powerful solution.

1. **Install Celery** and **Redis** (used as the message broker):
   ```sh
   pip install celery[redis]
   ```

2. **Create a Celery app** (`celery.py`):
   ```python
   # your_project/celery.py
   from __future__ import absolute_import, unicode_literals
   import os
   from celery import Celery

   # set the default Django settings module for the 'celery' program.
   os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')

   app = Celery('your_project')

   # Using a string here means the worker doesn't have to serialize
   # the configuration object to child processes.
   app.config_from_object('django.conf:settings', namespace='CELERY')

   # Load task modules from all registered Django app configs.
   app.autodiscover_tasks()
   ```

3. **Configure Celery in `settings.py`**:
   ```python
   CELERY_BROKER_URL = 'redis://localhost:6379/0'  # Redis as the broker
   CELERY_ACCEPT_CONTENT = ['json']
   CELERY_TASK_SERIALIZER = 'json'
   ```

4. **Create a Celery task** for the backup:
   ```python
   # tasks.py
   from celery import shared_task
   from django.core.management import call_command

   @shared_task
   def backup_songs():
       try:
           call_command('backup_songs')  # Name of your backup command
           return "Backup started!"
       except Exception as e:
           return f"Backup failed: {str(e)}"
   ```

5. **Schedule the task in `settings.py`**:
   You can use Celery's **periodic tasks** to schedule the backup every 6 hours.
   ```python
   from celery.schedules import crontab

   CELERY_BEAT_SCHEDULE = {
       'backup_songs_every_6_hours': {
           'task': 'your_project.tasks.backup_songs',
           'schedule': crontab(minute=0, hour='*/6'),  # Every 6 hours
       },
   }
   ```

6. **Run Celery workers**:
   First, run **Celery worker** and **beat**:
   ```sh
   celery -A your_project worker --loglevel=info
   celery -A your_project beat --loglevel=info
   ```

7. **Testing the setup**: You can manually trigger a backup via the API endpoint, and Celery will automatically handle the scheduled backups.

---

### **Summary**

- **Manual Backup**: You already have a working Django management command.
- **API-based Trigger**: Use Django views to call the management command, triggering the backup through an API endpoint.
- **Automated Backup**: You can use **Django-crontab** for simple scheduling or **Celery** for more control and scalability.

Let me know if you'd like to go deeper into any of these setups! 😄