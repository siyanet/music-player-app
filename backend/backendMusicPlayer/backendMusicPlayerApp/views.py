from django.shortcuts import render
import pyrebase
import uuid
from rest_framework import generics,status
from rest_framework.response import Response
from .serializers import SongSerializer,UserSerializer
from .models import Song
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from .firebase_config import storage as firebase_storage 
from rest_framework.decorators import api_view,permission_classes
from rest_framework.views import APIView
from django.http import Http404 

# class SongListView(generics.ListCreateAPIView):
#     serializer_class = SongSerializer
#     permission_classes = [AllowAny]
#     def get_queryset(self):
#         return Song.objects.filter(user = self.request.user)
    
    
#     def perform_create(self, serializer):
#         # Retrieve file from request
#         file = self.request.FILES.get('file')

#         if not file:
#             return Response({"error": "No file provided"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         try:
#             # Generate unique filename using UUID
#             unique_id = uuid.uuid4()
#             filename = f"{unique_id}.mp3"

#             # Upload file to Firebase Storage
#             firebase_storage.child("songs/" + filename).put(file)

#             # Get download URL of the uploaded file
#             download_url = firebase_storage.child("songs/" + filename).get_url(None)

#             # Save song with file URL in database
#             serializer.save(file=download_url)

#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         except Exception as e:
#             # Log the exception for debugging
#             print(f"Error uploading file: {e}")
#             return Response({"error": "Failed to upload file"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 



class SongListView(generics.ListAPIView):
    serializer_class = SongSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Song.objects.filter(user = self.request.user)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_song(request):
    print("Creating a new song...")

    file = request.FILES.get('file')

    if not file:
        return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Generate unique filename using UUID
        unique_id = uuid.uuid4()
        filename = f"{unique_id}.mp3"

        # Upload file to Firebase Storage
        firebase_storage.child("songs/" + filename).put(file)

        # Get download URL of the uploaded file
        download_url = firebase_storage.child("songs/" + filename).get_url(None)

        # Create a new song object
        serializer = SongSerializer(data={
            'file': download_url,  # Assuming 'file' is the field storing the URL
            'title': request.data.get('title'),  # Adjust according to your serializer fields
            'artist': request.data.get('artist'),
            'user': request.user.id  # Assuming user is authenticated
        })

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f"Error uploading file: {e}")
        return Response({"error": "Failed to upload file"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class SongUpdateView(generics.UpdateAPIView):
    serializer_class = SongSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Song.objects.filter(user = self.request.user)
# class SongPatchView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get_object(self, pk):
#         try:
#             return Song.objects.get(pk=pk, user=self.request.user)
#         except Song.DoesNotExist:
#             print('not working')
#             raise Http404

#     def patch(self, request, pk, format=None):
#         song = self.get_object(pk)
#         serializer = SongSerializer(song, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# class SongDeleteView(generics.DestroyAPIView):
#     serializer_class = SongSerializer
#     permission_classes = [IsAuthenticated]
#     def get_queryset(self):
#         return Song.objects.filter(user = self.request.user)

class SongDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, format=None):
        print('deleteing')
        try:
            song = Song.objects.get(pk=pk, user=request.user)
        except Song.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        # Extract the file path from the URL
        file_url = song.file
        file_path = file_url.split('/o/')[1].split('?')[0]
        file_path = file_path.replace('%2F', '/')

        try:
            # Delete the file from Firebase Storage
          #  firebase_storage.child(file_path).delete(None)
            
            # Delete the song instance
            song.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            # Log the exception for debugging
            print(f"Error deleting file: {e}")
            return Response({"error": "Failed to delete file"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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



