from django.db import models

from .firebase_config import storage as firebase_storage
def generate_sequence_id(instance):
    # Fetch the count of existing instances to determine the next ID
    existing_count = instance.__class__.objects.count()
    next_id = existing_count + 1
    return next_id
class FirebaseStorageFileField(models.FileField):
   def pre_save(self, model_instance, add):
        file = super().pre_save(model_instance, add)
        
        if file:
            # Upload the file content directly to Firebase Storage
            file_content = file.file.read()
            firebase_storage.child(file.name).put(file_content)
            
            # Get the URL of the uploaded file
            file_url = firebase_storage.child(file.name).get_url(None)
            
            # Save the URL to the database field
            setattr(model_instance, self.attname, file_url)
        
        return file
