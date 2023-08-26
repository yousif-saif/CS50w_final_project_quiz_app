from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("sign_up", views.sign_up, name="sign_up"),
    path("<int:category_id>", views.render_category),
    path("<int:quiz_id>/discover", views.render_category_from_discover),
    path("logout", views.logout_view),
    path("discover_quizzes", views.discover_quizzes, name="discover_quizzes"),
    path("create_quiz", views.create_quiz, name="create_quiz"),
    path("your_quizzes", views.your_quizzes, name="your_quizzes"),
    path("submit_quiz", views.submit_quiz),
    path("quizzes_analytics", views.quizzes_analytics, name="quizzes_analytics")

]

