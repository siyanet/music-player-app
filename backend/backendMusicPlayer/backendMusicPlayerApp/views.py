from django.shortcuts import render
from rest_framework import generics
from .serializers import SongSerializer,UserSerializer
from .models import Song
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
class SongListView(generics.ListCreateAPIView):
    serializer_class = SongSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Song.objects.filter(user = self.request.user)
    def perform_create(self, serializer):
        return serializer.save(user = self.request.user)
class SongUpdateView(generics.UpdateAPIView):
    serializer_class = SongSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Song.objects.filter(user = self.request.user)
class SongDeleteView(generics.DestroyAPIView):
    serializer_class = SongSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Song.objects.filter(user = self.request.user)
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return self.request.user
class DefaultSongView(generics.ListAPIView):
    serializer_class = SongSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        admin_user = User.objects.filter(is_superuser = True)
        return Song.objects.filter(user__in = admin_user) 



