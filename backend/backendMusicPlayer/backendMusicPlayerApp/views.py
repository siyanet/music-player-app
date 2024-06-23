from django.shortcuts import render
from rest_framework import generics
from .serializers import SongSerializer,UserSerializer
from .models import Song
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
class SongListView(generics.ListCreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
class SongUpdateView(generics.UpdateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
class SongDeleteView(generics.DestroyAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



