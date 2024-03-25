# Consolidated and cleaned-up imports
from django.contrib.auth import authenticate, logout, get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework import permissions, status, views
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    AllowAny,
)
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import OuterRef, Subquery
from django.db.models import Q

from .models import AppUser

# Import your serializers and validations
from .serializers import (
    UserRegisterSerializer,
    UserSerializer,
    ChatMessage,
    ChatMessageSerializer,
)
from .validations import validate_registration
from rest_framework import generics

User = get_user_model()


class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user = authenticate(
            username=request.data.get("username"), password=request.data.get("password")
        )
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "token": str(refresh.access_token),
                    "user": user.username,
                    "id": user.user_id,
                }
            )
        return Response(
            {"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )


class SaveUserDetailView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserSerializer(
            request.user, data=request.data, partial=True
        )  # partial=True for allowing partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterUserView(APIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        try:
            # Validate registration data first
            clean_data = validate_registration(request.data)
        except ValidationError as e:
            # Return a response with the validation errors
            return Response(e.message_dict, status=status.HTTP_400_BAD_REQUEST)

        # Assuming clean_data is valid and you have a UserRegisterSerializer to save the user
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Return any errors encountered when saving the user
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class LogoutUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = []

    def post(self, request):
        try:
            clean_data = validate_registration(request.data)
        except ValidationError as e:
            # Assuming the errors are in a dict format; adjust if necessary
            return Response(e.message_dict, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Use logging in production code
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUserDetailView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, pk, format=None):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ListUsersView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        users = AppUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MyInbox(generics.ListAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]

        # Fetch messages where the user is either the sender or the receiver.
        # This simplifies the previous complex query, aiming directly at the desired outcome.
        messages = (
            ChatMessage.objects.filter(Q(sender_id=user_id) | Q(receiver_id=user_id))
            .distinct()
            .order_by("-date")
        )  # Assuming you want the latest messages first

        return messages


class GetMessages(generics.ListAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        sender_id = self.kwargs["sender_id"]
        receiver_id = self.kwargs["receiver_id"]
        messages = ChatMessage.objects.filter(
            (Q(sender_id=sender_id) & Q(receiver_id=receiver_id))
            | (Q(sender_id=receiver_id) & Q(receiver_id=sender_id))
        ).order_by(
            "date"
        )  # Assuming you want the messages in chronological order

        return messages


class SendMessages(generics.CreateAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]


class MarkMessageReadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, message_id):
        try:
            print(message_id)
            message = ChatMessage.objects.get(pk=message_id)
            message.mark_read()
            return Response({"success": True, "message": "Message marked as read."})
        except ChatMessage.DoesNotExist:
            return Response(
                {"success": False, "error": "Message not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
