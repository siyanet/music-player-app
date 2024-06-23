from django.urls import path,include
from .views import SongListView,SongUpdateView,SongDeleteView,UserCreateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,)
urlpatterns = [
 
    path('register',UserCreateView.as_view(),name = 'user-create'),
    path('token/access', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('songs/', SongListView.as_view(), name='song-list'),
    path('songUpdate/<int:pk>/',SongUpdateView.as_view(),name ='song-update'),
    path('songDelete/<int:pk>/',SongDeleteView.as_view(),name = 'song-delete'),
]
