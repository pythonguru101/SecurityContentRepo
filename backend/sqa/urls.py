from django.urls import path 
from .views import  get_categories, get_users
 
urlpatterns = [ 
    path('categories', get_categories, name='get_categories_list'),
    path('users', get_users, name='get_users')
]