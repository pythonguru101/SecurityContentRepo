
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Tenant(models.Model):
    tenant = models.CharField(max_length=150, null=False)
    
class Category(models.Model):
    category=models.CharField(max_length=300, null=False)
    
    def __str__(self):
        return self.category
    
class Question(models.Model):
    text=models.CharField(max_length=300, null=False)
    category=models.ForeignKey(Category, models.CASCADE)
    tenant=models.ForeignKey(Tenant, default=1,on_delete= models.CASCADE)
    
    def __str__(self):
        return self.text
    
class Answer(models.Model):
    answer=models.CharField(max_length=500, null=False)
    question=models.ForeignKey(Question, models.CASCADE)
    replied_by=models.ForeignKey(User, models.CASCADE)
    
    def __str__(self):
        return self.answer
