from django.urls import path 
from . import  views
 
urlpatterns = [ 
    path(r'categories', views.get_categories, name='categories'),
    path(r'category/<int:pk>', views.category, name='category'),
    path(r'category', views.create_category, name='create_category'),
    path(r'questions', views.get_questions , name='questions'),
    path(r'question/<int:pk>', views.question, name='question'),
    path(r'create_question', views.create_question, name='create_question'),    
    path(r'answers', views.get_answers , name='answers'),
    path(r'answer/<int:pk>', views.answer, name='answer'),
    path(r'create_answer', views.create_answer, name='create_answer'),
]