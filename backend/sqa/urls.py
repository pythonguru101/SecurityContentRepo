from django.urls import path 
from .views import  get_categories
 
urlpatterns = [ 
    path('categories', get_categories, name='get_categories_list')
]