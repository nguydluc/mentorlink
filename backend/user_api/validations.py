from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

UserModel = get_user_model()


def validate_registration(data):
    errors = {}
    email = data.get("email", "").strip()
    if not email or UserModel.objects.filter(email=email).exists():
        errors["email"] = "Please choose another email"

    username = data.get("username", "").strip()
    if not username:
        errors["username"] = "Please choose another username"
    elif UserModel.objects.filter(username=username).exists():
        errors["username"] = "Username already exists"

    password = data.get("password", "").strip()
    if not password or len(password) < 8:
        errors["password"] = "Please choose another password, min 8 characters"

    if errors:
        raise ValidationError(errors)

    return data


def validate_login(data):
    errors = {}
    username = data.get("username", "").strip()
    if not username:
        errors["username"] = "Username is required"

    password = data.get("password", "").strip()
    if not password:
        errors["password"] = "Password is required"

    if errors:
        raise ValidationError(errors)

    return data


def validate_email(data):
    email = data["email"].strip()
    if not email:
        raise ValidationError("An email is needed")
    return True


def validate_username(data):
    username = data["username"].strip()
    if not username:
        raise ValidationError("Please choose another username")
    return True


def validate_password(data):
    password = data["password"].strip()
    if not password:
        raise ValidationError("A password is needed")
    return True
