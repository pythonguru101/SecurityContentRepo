from rest_framework import serializers
from .models import Category,Question,Answer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'category')
        
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'text', 'category')
        
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('id', 'answer', 'question', 'replied_by')
