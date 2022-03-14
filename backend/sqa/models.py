import datetime
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Tenant(models.Model):
    tenant = models.CharField(max_length=150, null=False)
    user = models.ForeignKey(User, models.CASCADE)
    upsert_at=models.DateTimeField(default=datetime.datetime.now())
    upsert_by=models.IntegerField(null=True)
    
class Category(models.Model):
    category=models.CharField(max_length=300, null=False)
    upsert_at=models.DateTimeField(default=datetime.datetime.now())
    upsert_by=models.IntegerField(null=True)
    
    def __str__(self):
        return self.category
    
class Question(models.Model):
    text=models.CharField(max_length=300, null=False)
    category=models.ForeignKey(Category, models.CASCADE)
    tenant=models.ForeignKey(Tenant, default=1,on_delete= models.CASCADE)
    upsert_at=models.DateTimeField(default=datetime.datetime.now())
    upsert_by=models.IntegerField(null=True)
    
    def __str__(self):
        return self.text
    
class Answer(models.Model):
    answer=models.CharField(max_length=500, null=False)
    question=models.ForeignKey(Question, models.CASCADE)
    replied_by=models.ForeignKey(User, models.CASCADE, null=True, blank=True)
    upsert_at=models.DateTimeField(default=datetime.datetime.now())
    upsert_by=models.IntegerField(null=True)
    
    def __str__(self):
        return self.answer
