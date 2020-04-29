from django.urls import path

from vue_login_app import views
from vue_login_app.views import UserView

app_name = 'vue_login_app'

urlpatterns = [
    path('users/', UserView.as_view()),
    path('login/', views.mylogin),
    path('index/', views.index, name='index'),
]
