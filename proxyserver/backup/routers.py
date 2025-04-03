class BackupRouter:
    """
    A router to control all database operations on models in the backup application.
    """
    def db_for_read(self, model, **hints):
        """
        Attempts to read backup models go to backup database.
        """
        if model._meta.app_label == 'backup':
            return 'backup'
        return None

    def db_for_write(self, model, **hints):
        """
        Attempts to write backup models go to backup database.
        """
        if model._meta.app_label == 'backup':
            return 'backup'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the backup app is involved.
        """
        if obj1._meta.app_label == 'backup' or obj2._meta.app_label == 'backup':
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the backup app only appears in the 'backup' database.
        """
        if app_label == 'backup':
            return db == 'backup'
        return None