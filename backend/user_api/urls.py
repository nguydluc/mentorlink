from django.urls import path
from .views import (
    LoginUserView,
    LogoutUserView,
    RegisterUserView,
    GetUserView,
    GetUserDetailView,
    SaveUserDetailView,
    ListUsersView,
    MyInbox,
    GetMessages,
    SendMessages,
    MarkMessageReadView,
)

urlpatterns = [
    path("login", LoginUserView.as_view(), name="login"),
    path("logout", LogoutUserView.as_view(), name="logout"),
    path("register", RegisterUserView.as_view(), name="register"),
    path("user", GetUserView.as_view(), name="get_user"),
    path("user/<int:pk>", GetUserDetailView.as_view(), name="get_user_detail"),
    path("user/update", SaveUserDetailView.as_view(), name="update_user_detail"),
    path("users/", ListUsersView.as_view(), name="list-users"),
    path("my-messages/<int:user_id>/", MyInbox.as_view(), name="my_messages"),
    path("get-messages/<sender_id>/<receiver_id>/", GetMessages.as_view()),
    path("send-messages", SendMessages.as_view()),
    path(
        "messages/mark-read/<int:message_id>/",
        MarkMessageReadView.as_view(),
        name="mark_message_read",
    ),
]
