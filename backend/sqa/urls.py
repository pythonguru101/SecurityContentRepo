from django.urls import path 
from . import  views
 
urlpatterns = [ 
    path(r'me', views.current_user, name='me'),
    path(r'account/sign-up', views.create_user, name='sign-up'),
    path(r'categories', views.get_categories, name='categories'),
    path(r'category/<int:pk>', views.category, name='category'),
    path(r'category', views.create_category, name='create-category'),
    path(r'questions', views.get_questions , name='questions'),
    path(r'question/<int:pk>', views.question, name='question'),
    path(r'create-question', views.create_question, name='create-question'),    
    path(r'answers', views.get_answers , name='answers'),
    path(r'my-answers', views.my_answers , name='my-answers'),
    path(r'answer/<int:pk>', views.answer, name='answer'),
    path(r'create-answer', views.create_answer, name='create-answer'),
    path(r'tenants', views.get_tenants , name='tenants'),
    path(r'tenant/<int:pk>', views.tenant, name='tenant'),
    path(r'create-tenant', views.create_tenant, name='create-tenant'),
]