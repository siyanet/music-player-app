from django.shortcuts import render
from rest_framework import generics
from .serializers import SongSerializer
from .models import Song
class SongListView(generics.ListCreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
class SongUpdateView(generics.UpdateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
class SongDeleteView(generics.DestroyAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer



