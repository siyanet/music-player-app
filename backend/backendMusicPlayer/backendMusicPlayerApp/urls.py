from django.urls import path
from .views import SongListView,SongUpdateView,SongDeleteView

urlpatterns = [
    path('songs/', SongListView.as_view(), name='song-list'),
    path('songUpdate/<int:pk>/',SongUpdateView.as_view(),name ='song-update'),
    path('songDelete/<int:pk>/',SongDeleteView.as_view(),name = 'song-delete'),
]
