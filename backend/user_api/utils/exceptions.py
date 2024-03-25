# my_app/utils/exceptions.py

from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None and hasattr(response.data, "detail"):
        response.data["message"] = response.data["detail"]
        del response.data["detail"]

    return response
