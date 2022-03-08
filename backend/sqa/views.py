import imp
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.decorators import api_view

from .models import Category
from .serializers import CategorySerializer

# Create your views here.
@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    categories_serializer = CategorySerializer(categories, many=True)
    return JsonResponse(categories_serializer.data, safe=False)
