from pyexpat import model
from unicodedata import category
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    category=models.CharField(max_length=300)
    
    def __str__(self):
        return self.category
class Question(models.Model):
    text=models.CharField(max_length=300)
    category=models.ForeignKey(Category, models.CASCADE)
    
    def __str__(self):
        return self.text
    
class Answer(models.Model):
    answer=models.CharField(max_length=500)
    question=models.ForeignKey(Question, models.CASCADE)
    replied_by=models.ForeignKey(User, models.CASCADE)
    
    def __str__(self):
        return self.answer
