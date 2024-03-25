from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


class AppUserManager(BaseUserManager):
    def create_user(self, email, username, firstname, lastname, password=None):
        if not email:
            raise ValueError("An email is required.")
        if not username:
            raise ValueError("A username is required.")
        if not password:
            raise ValueError("A password is required.")

        email = self.normalize_email(email)
        user = self.model(
            email=email, username=username, firstname=firstname, lastname=lastname
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, firstname, lastname, password):
        user = self.create_user(
            email=email,
            username=username,
            firstname=firstname,
            lastname=lastname,
            password=password,
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)
    firstname = models.CharField(max_length=50, blank=True)
    lastname = models.CharField(max_length=50, blank=True)
    jobtitle = models.CharField(max_length=100, blank=True, null=True)
    company = models.CharField(max_length=100, blank=True, null=True)
    school = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    province = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    program = models.CharField(max_length=200, blank=True, null=True)
    looking = models.CharField(max_length=20, blank=True, null=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = [
        "email",
        "firstname",
        "lastname",
    ]

    objects = AppUserManager()

    def __str__(self):
        return self.username


####################################


class ChatMessage(models.Model):
    user = models.ForeignKey(
        AppUser, on_delete=models.SET_NULL, null=True, related_name="chat_messages"
    )
    sender = models.ForeignKey(
        AppUser, on_delete=models.SET_NULL, null=True, related_name="sent_messages"
    )
    receiver = models.ForeignKey(
        AppUser, on_delete=models.SET_NULL, null=True, related_name="received_messages"
    )

    message = models.TextField()  # Adjusted for a more appropriate field type
    is_read = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["date"]
        verbose_name_plural = "Messages"

    def __str__(self):
        return f"{self.sender.username} to {self.receiver.username}"

    @property
    def sender_profile(self):
        # Assuming you have a related profile or want to use the AppUser directly
        return self.sender

    @property
    def receiver_profile(self):
        # Assuming you have a related profile or want to use the AppUser directly
        return self.receiver

    def mark_read(self):
        self.is_read = True
        self.save(update_fields=["is_read"])
