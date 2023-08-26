from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Quiz(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="quiz", null=True)
    img_url = models.CharField(max_length=1024, default="https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg")
    title = models.CharField(max_length=1024, default="Untitled")
    difficulty = models.CharField(max_length=100, default="any")
    category = models.CharField(max_length=1024, default="Other")
    timer = models.IntegerField(null=True)
    isFromApi = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title}"


class Question(models.Model):
    question = models.CharField(max_length=1024)
    quiz = models.ManyToManyField(Quiz, related_name="questions")

    def __str__(self):
        return f"{self.question}"


class Choices(models.Model):
    choice = models.CharField(max_length=1024)
    isCorrectChoice = models.BooleanField()
    question = models.ManyToManyField(Question, related_name="choices")

    def __str__(self):
        return f"{self.choice}"

class Submissions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="submissions")
    score = models.IntegerField()
    time_taken = models.IntegerField()
    quiz = models.ManyToManyField(Quiz, related_name="submissions", blank=True)
