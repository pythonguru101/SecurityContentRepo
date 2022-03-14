from datetime import datetime
from drf_yasg.utils import swagger_auto_schema
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Category, Question, Answer, Tenant
from .serializers import (BasicUserSerializer,
                          CategorySerializer, 
                          QuestionCreateSerializer, 
                          QuestionSerializer, 
                          AnswerSerializer, 
                          AnswerCreateSerializer, 
                          TenantCreateSerializer,
                          TenantSerializer)


# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = BasicUserSerializer(request.user)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_user(request):
    user_data = JSONParser().parse(request)
    for key, value in user_data.items():
        print(key, ' : ', value)
    user = User.objects.create_user(user_data['username'], user_data['email'], user_data['password'])
    user.first_name = user_data['first_name']
    user.last_name = user_data['last_name']
    user.save()
    user_serializer = BasicUserSerializer(user, many=False)
    return JsonResponse(user_serializer.data, safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_categories(request):
    categories = Category.objects.all()
    categories_serializer = CategorySerializer(categories, many=True)
    return JsonResponse(categories_serializer.data, safe=False)

@swagger_auto_schema(method='put', operation_description='Update category', request_body=CategorySerializer)
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def category(request, pk):    
    category = Category.objects.get(pk=pk)
    if category is None:
        return JsonResponse({'message': 'Category is not found.'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        category_serializer = CategorySerializer(category, many=False)
        return JsonResponse(category_serializer.data, safe=False)
    elif request.method == 'DELETE':
        category.delete()
        return JsonResponse({'message': 'Category is deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        category_data = JSONParser().parse(request)
        category_serializer = CategorySerializer(category, data=category_data)
        if category_serializer.is_valid():
            inserted = category_serializer.save()
            inserted.upsert_by = request.user.id
            inserted.save()
            return JsonResponse(category_serializer.data, safe=False)
        return JsonResponse(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@swagger_auto_schema(method='post', operation_description='Create question category', request_body=CategorySerializer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_category(request):
    user = request.user;
    category_data = JSONParser().parse(request)
    category_data.upsert_by=user.id
    category_serializer = CategorySerializer(data=category_data)
    if category_serializer.is_valid():
        inserted = category_serializer.save()
        inserted.upsert_by = request.user.id
        inserted.save()
        return JsonResponse(category_serializer.data, safe=False)
    return JsonResponse(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

#
# Insert, update, delete, get and list of Question
#
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_questions(request):    
    search_keyword = request.GET.get('search_keyword')
    questions = None
    if(search_keyword is None):
        questions = Question.objects.all()
    else:
        questions = Question.objects.filter(text__icontains=search_keyword)
          
    questions_serializer = QuestionSerializer(questions, many=True)
    return JsonResponse(questions_serializer.data, safe=False)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def question(request, pk):
    try:    
        question = Question.objects.get(pk=pk)
        if question is None:
            return JsonResponse({'message': 'Question is not found.'}, status=status.HTTP_404_NOT_FOUND)
        if request.method == 'GET':
            question_serializer = QuestionSerializer(question, many=False)
            return JsonResponse(question_serializer.data, safe=False)
        elif request.method == 'DELETE':
            question.delete()
            return JsonResponse({'message': 'The question is deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        elif request.method == 'PUT':
            question_data = JSONParser().parse(request)
            question_serializer = QuestionCreateSerializer(question, data=question_data)
            if question_serializer.is_valid():
                inserted = question_serializer.save()
                inserted.upsert_by = request.user.id
                inserted.save()
                return JsonResponse(question_serializer.data, safe=False)
            return JsonResponse(question_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    except Question.DoesNotExist:
        return JsonResponse({'message': 'The question is not found.'}, status=status.HTTP_404_NOT_FOUND)

@swagger_auto_schema(method='post', operation_description='Create question', request_body=QuestionCreateSerializer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_question(request):
    question_data = JSONParser().parse(request)
    question_serializer = QuestionCreateSerializer(data=question_data)
    if question_serializer.is_valid():
        inserted = question_serializer.save()
        inserted.upsert_by = request.user.id
        inserted.save()
        return JsonResponse(question_serializer.data, safe=False)
    return JsonResponse(question_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 

#
# Insert, update, delete, get and list of Answer
#
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_answers(request):
    search_keyword = request.GET.get('search_keyword')
    answers = None
    if(search_keyword is None):
        answers = Answer.objects.filter()
    else:
        answers = Answer.objects.filter(answer__icontains=search_keyword)

    answers_serializer = AnswerSerializer(answers, many=True)
    return JsonResponse(answers_serializer.data, safe=False)

@swagger_auto_schema(method='put', operation_description='Update tenant', request_body=AnswerCreateSerializer)
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def answer(request, pk):
    try:    
        answer = Answer.objects.get(pk=pk)
        if answer is None:
            return JsonResponse({'message': 'Answer is not found.'}, status=status.HTTP_404_NOT_FOUND)
        if request.method == 'GET':
            answer_serializer = AnswerSerializer(answer, many=False)
            return JsonResponse(answer_serializer.data, safe=False)
        elif request.method == 'DELETE':
            answer.delete()
            return JsonResponse({'message': 'Answer is deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        elif request.method == 'PUT':
            answer_data = JSONParser().parse(request)
            answer_serializer = AnswerCreateSerializer(answer, data=answer_data)
            if answer_serializer.is_valid():
                inserted = answer_serializer.save()
                inserted.upsert_by = request.user.id
                inserted.save()
                return JsonResponse(answer_serializer.data, safe=False)
            return JsonResponse(answer_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    except Answer.DoesNotExist:
        return JsonResponse({'message': 'Answer is not found.'}, status=status.HTTP_404_NOT_FOUND)

@swagger_auto_schema(method='post', operation_description='Create answer', request_body=AnswerCreateSerializer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_answer(request):
    answer_data = JSONParser().parse(request)
    answer_serializer = AnswerCreateSerializer(data=answer_data)
    if answer_serializer.is_valid():
        inserted = answer_serializer.save()
        inserted.replied_by_id = request.user.id
        inserted.upsert_by = request.user.id
        inserted.save()
        return JsonResponse(answer_serializer.data, safe=False)
    return JsonResponse(answer_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_answers(request):
    user = request.user
    answers = Answer.objects.filter(replied_by=user.id)
    answers_serializer = AnswerSerializer(answers, many=True)
    return JsonResponse(answers_serializer.data, safe=False)

#
#
#
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tenants(request):
    tenants = Tenant.objects.all()
    tenants_serializer = TenantSerializer(tenants, many=True)
    return JsonResponse(tenants_serializer.data, safe=False)

@swagger_auto_schema(method='put', operation_description='Update tenant', request_body=TenantSerializer)
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def tenant(request, pk):    
    tenant = Tenant.objects.get(pk=pk)
    if tenant is None:
        return JsonResponse({'message': 'Tenant is not found.'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        tenant_serializer = TenantSerializer(tenant, many=False)
        return JsonResponse(tenant_serializer.data, safe=False)
    elif request.method == 'DELETE':
        print(tenant.id)
        tenant.delete()
        return JsonResponse({'message': 'Tenant is deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        tenant_data = JSONParser().parse(request)
        tenant_serializer = TenantSerializer(tenant, data=tenant_data)
        if tenant_serializer.is_valid():
            inserted = tenant_serializer.save()
            inserted.upsert_by = request.user.id
            inserted.save()
            return JsonResponse(tenant_serializer.data, safe=False)
        return JsonResponse(tenant_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@swagger_auto_schema(method='post', operation_description='Create tenant', request_body=TenantSerializer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_tenant(request):
    tenant_data = JSONParser().parse(request)
    tenant_serializer = TenantCreateSerializer(data=tenant_data)
    if tenant_serializer.is_valid():        
        inserted = tenant_serializer.save()        
        inserted.upsert_by = request.user.id
        inserted.save()
        return JsonResponse(tenant_serializer.data, safe=False)
    return JsonResponse(tenant_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


