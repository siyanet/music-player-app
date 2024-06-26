

from django.contrib.auth.models import User
# admin.py

from django.contrib import admin
from .models import Song
from .forms import SongAdminForm

@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    form = SongAdminForm
    list_display = ('title', 'artist', 'file')  # Display these fields in admin list view
