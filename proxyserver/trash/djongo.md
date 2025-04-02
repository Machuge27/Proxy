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