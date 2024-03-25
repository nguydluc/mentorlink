from django.forms import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from user_api.models import ChatMessage

UserModel = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = [
            "email",
            "username",
            "password",
            "firstname",
            "lastname",
        ]  # Adjust field names as necessary
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        user = UserModel.objects.create_user(
            email=validated_data["email"],
            username=validated_data["username"],
            password=validated_data["password"],
            firstname=validated_data.get("firstname", ""),
            lastname=validated_data.get("lastname", ""),
        )
        return user

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters long."
            )
        return value

    def validate_first_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("First name cannot be empty.")
        return value

    def validate_last_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Last name cannot be empty.")
        return value


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data["username"], password=data["password"])
        if not user:
            raise serializers.ValidationError(
                "Invalid login credentials, please try again."
            )
        data["user"] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = (
            "email",
            "username",
            "firstname",
            "lastname",
            "jobtitle",
            "company",
            "school",
            "city",
            "province",
            "country",
            "bio",
            "program",
            "looking",
            "user_id",
        )


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ["id", "sender", "receiver", "message", "date", "is_read"]
        read_only_fields = [
            "id",
            "date",
            "sender",
        ]  # 'sender' might be automatically set based on the logged-in user

    def create(self, validated_data):
        # Automatically set the sender to the logged-in user if not explicitly provided
        if "sender" not in validated_data:
            validated_data["sender"] = self.context["request"].user
        return super().create(validated_data)
