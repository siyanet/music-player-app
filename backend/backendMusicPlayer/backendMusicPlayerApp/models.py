from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator


# Create your models here.
class Song(models.Model):
    title = models.CharField(max_length= 30)
    artist = models.CharField(max_length=30)
    file = models.FileField(upload_to='songs/', validators=[FileExtensionValidator(allowed_extensions=['mp3'])])
    user = models.ForeignKey(User,on_delete= models.CASCADE,null = True, blank = True)
    def __str__(self) -> str:
        return self.title