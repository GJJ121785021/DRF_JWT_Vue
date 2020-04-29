from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import generics, permissions
# Create your views here.
from vue_login_app.serializers import UserSerializer


class UserView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]


def mylogin(request):
    return render(request, 'login.html')


def index(request):
    return render(request, 'index.html')