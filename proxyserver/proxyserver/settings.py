"""
Django settings for proxyserver project.

Generated by 'django-admin startproject' using Django 5.0.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
import dotenv
import os

# Load environment variables from .env file
dotenv.load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY", default='django-insecure-prm8he^v7n(y5ki@obr*$ax@(voz-!j*qxj2^x1s9i_k*hep8t')

MONGO_USERNAME = os.getenv("MONGO_USERNAME", default='mutaihillary')
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
DATABASE_NAME = os.getenv("DATABASE_NAME")
DEBUG = os.getenv("DEBUG", default=True)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = DEBUG

ALLOWED_HOSTS = ["*"]

CORS_ALLOW_ALL_ORIGINS = True

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "proxyapp",
    "corsheaders",
    "backup",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'proxyserver.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'proxyserver.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

# mongodb+srv://${username}:${password}@cluster0.ch21p.mongodb.net/taskManagerDB?retryWrites=true&w=majority&appName=Cluster0

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    },
    "backup": {
        "ENGINE": "djongo",
        "NAME": "Youflix",  # Ensure this matches your actual database name
        "ENFORCE_SCHEMA": False,  # Helps with schema issues
        "CLIENT": {
            "host": "mongodb+srv://mutaihillary:mutai%2Fatlas25@cluster0.ch21p.mongodb.net/Youflix?retryWrites=true&w=majority&appName=Cluster0",
        },
    },
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Celery settings
CELERY_BEAT_SCHEDULE = {
    "backup-songs-every-6-hours": {
        "task": "proxyapp.tasks.scheduled_backup",  # Adjust to your app name
        "schedule": 60 * 60 * 6,  # 6 hours in seconds
        "kwargs": {"full": False},  # Default to incremental backup
    },
    # You could add another entry for weekly full backups
    "full-backup-weekly": {
        "task": "proxyapp.tasks.scheduled_backup",
        "schedule": 60 * 60 * 24 * 7,  # 7 days in seconds
        "kwargs": {"full": True},
    },
}

# uri http://192.168.76.138:8000/api/backup/
