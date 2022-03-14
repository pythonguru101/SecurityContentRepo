from rest_framework import serializers
from .models import Category,Question,Answer, Tenant
from django.contrib.auth.models import User


class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_active')
class TenantSerializer(serializers.ModelSerializer):
    user = BasicUserSerializer(many=False, read_only=True)
    class Meta:
        model = Tenant
        fields = ('id', 'tenant', 'user','upsert_at', 'upsert_by')        
class TenantCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = ('id', 'tenant','user')
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'category','upsert_at', 'upsert_by')
        
class QuestionSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=False, read_only=True)
    tenant=TenantSerializer(many=False, read_only=True)
    class Meta:
        model = Question
        fields = ('id', 'text', 'category','tenant','upsert_at', 'upsert_by')
        
class QuestionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'text', 'category','tenant')

        
class AnswerSerializer(serializers.ModelSerializer):
    replied_by=BasicUserSerializer(many=False, read_only=True)
    question=QuestionSerializer(many=False, read_only=True)
    class Meta:
        model = Answer
        fields = ('id', 'answer', 'question', 'replied_by','upsert_at', 'upsert_by')

class AnswerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('id', 'answer', 'question', 'replied_by')
        



