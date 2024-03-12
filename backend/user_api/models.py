from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


class AppUserManager(BaseUserManager):
    def create_user(self, email, username, firstname, lastname, password=None):
        if not email:
            raise ValueError("An email is required.")
        if not password:
            raise ValueError("A password is required.")
        email = self.normalize_email(email)
        user = self.model(
            email=email, username=username, firstname=firstname, lastname=lastname
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, firstname, lastname, password=None):
        if not email:
            raise ValueError("An email is required.")
        if not password:
            raise ValueError("A password is required.")
        user = self.create_user(
            email,
            password,
            username,
            firstname,
            lastname,
        )
        user.is_superuser = True
        user.save()
        return user


class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)

    firstname = models.CharField(max_length=50, blank=True, null=False)
    lastname = models.CharField(max_length=50, blank=True, null=False)
    jobtitle = models.CharField(max_length=100, blank=True, null=True)
    company = models.CharField(max_length=100, blank=True, null=True)
    school = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    province = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    objects = AppUserManager()

    def __str__(self):
        return self.username
