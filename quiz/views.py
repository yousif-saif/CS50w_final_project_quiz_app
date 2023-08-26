from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from collections import defaultdict
from django.shortcuts import render
from django.db import transaction
from django.urls import reverse
from django.http import *
from .models import *
import string
import json



def seconds_to_time(seconds):
    minutes = 0

    while seconds >= 60:
        seconds -= 60
        minutes += 1
    
    return f"{minutes}:{seconds if len(str(seconds)) == 2 else '0' + str(seconds)}"


def most_freq_difficulty(difficulties):
    l = defaultdict(str)
    max_freq = 0
    max_freq_num = None

    for i in difficulties:
        l[i] = l.get(i, 0) + 1

        if l[i] > max_freq:
            max_freq = l[i]
            max_freq_num = i
    
    return max_freq_num

def index(request):
    if request.user.is_authenticated and request.user.username != None:
        return render(request, "index.html", {
            "username": request.user.username
        })
    
    else:
        return HttpResponseRedirect(reverse("login"))

def login_view(request):
    if request.method == "GET":
        return render(request, "login.html")
    
    else:
        username = request.POST["name"]
        email = request.POST["email"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)
        user_from_db = User.objects.filter(username=username, email=email)


        if user is not None and user_from_db.exists():
            login(request, user)
            
            return HttpResponseRedirect(reverse("index"))

        return render(request, "login.html", {
            "error_message": "User does not exists"
        
        })

def sign_up(request):
    if request.method == "GET":
        return render(request, "sign_up.html")
    
    else:
        username = request.POST["name"]
        email = request.POST["email"]
        password = request.POST["password"]
        
        is_name_in_db = User.objects.filter(username=username).exists()
        is_email_in_db = User.objects.filter(email=email).exists()


        if is_name_in_db or is_email_in_db:
            return render(request, "sign_up.html", {
                "error_message": "Name/email is already taken"
            
            })

        if len(password) < 3:
            return render(request, "sign_up.html", {
                "error_message": "password must be at least 3 characters long"
            
            })

        if len(password) > 15:
            return render(request, "sign_up.html", {
                "error_message": "password must be less than 15 characters"

            })
        
        for i in string.punctuation:
            if i in password:
                new_user = User.objects.create_user(username=username, email=email, password=password)
                new_user.save()

                login(request, new_user)

                return HttpResponseRedirect(reverse("index"))

        
        return render(request, "sign_up.html", {
            "error_message": "password must have at least one symbol"
        })

@login_required
def render_category(request, category_id):
    return render(request, "quiz_settings.html", {
        "username": request.user.username

    })


@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("login"))

@login_required
@csrf_exempt
def create_quiz(request):
    if request.method == "GET":
        return render(request, "create_quiz.html", {
            "username": request.user.username
        })
    
    elif request.method == "PUT":
        response = json.loads(request.body)
        quiz_settings = response["quizSettings"]

        title = quiz_settings["title"]
        category = quiz_settings["category"]
        difficulty = quiz_settings["difficulty"]
        img_url = quiz_settings["img_url"]
        timer = quiz_settings["timer"]
        creator = request.user

        if img_url == "":
            img_url = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"

        new_quiz = Quiz.objects.create(title=title, category=category, difficulty=difficulty, img_url=img_url, creator=creator, timer=int(timer))

        for i in response["questions"]:
            with transaction.atomic():
                question = Question.objects.create(question=i["question"])
                new_quiz.questions.add(question)

                for j in i["choices"]:
                    choice = Choices.objects.create(choice=j[0], isCorrectChoice=j[1])
                    question.choices.add(choice)


        return JsonResponse({"url": reverse("your_quizzes")})


@login_required
def discover_quizzes(request):
    quiz = Quiz.objects.filter(isFromApi=False).all().order_by("id").reverse()

    return render(request, "discover_quizzes.html", {
        "quizzes": quiz,
        "username": request.user.username

    })

@login_required
@csrf_exempt
def your_quizzes(request):
    your_quizzes_db = Quiz.objects.filter(creator=request.user).order_by("id").reverse()

    return render(request, "discover_quizzes.html", {
        "quizzes": your_quizzes_db,
        "username": request.user.username
    })


@csrf_exempt
@login_required
def render_category_from_discover(request, quiz_id):
    if request.method == "GET":
        return render(request, "quiz_settings.html", {
            "username": request.user.username

        })
    
    else:
        results = []

        quiz = Quiz.objects.get(id=int(quiz_id))
        difficulty = quiz.difficulty

        for i in quiz.questions.all():
            question = {}
            correct_answer = None
            incorrect_answers = []

            for j in i.choices.all():
                if j.isCorrectChoice:
                    correct_answer = str(j)
                else:
                    incorrect_answers.append(str(j))
            
            question["difficulty"] = difficulty
            question["question"] = i.question
            question["correct_answer"] = correct_answer
            question["incorrect_answers"] = incorrect_answers
            results.append(question)

        response = {
            "response_code": 0,
            "quiz_id": quiz.id,
            "timer": quiz.timer,
            "pointsPreQuestion": 100/len(results),
            "results": results

        }


        return JsonResponse(response)
    
@login_required
@csrf_exempt
def submit_quiz(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            quiz_id = int(body["quiz_id"])
            user = request.user

            with transaction.atomic():

                if quiz_id != -1:
                    quiz = Quiz.objects.get(id=quiz_id)
                    submission = Submissions.objects.create(user=user, score=body["score"], time_taken=body["time"])
                    submission.quiz.add(quiz)
                
                else:
                    quiz = Quiz.objects.create(category=body["category"], title=body["category"], difficulty=body["difficulty"], isFromApi=True)
                    submission = Submissions.objects.create(user=user, score=body["score"], time_taken=body["time"])
                    submission.quiz.add(quiz)

            
            return JsonResponse({"response_code": 200})
        
        except:
            return JsonResponse({"error": "An error happend while submiting your quiz"})
        
    return JsonResponse({"error": "An error happend"})
        

    
@login_required
def quizzes_analytics(request):
    if request.method == "GET":
        user = request.user
        recent_quizzes = Submissions.objects.filter(user=user).order_by("id").reverse()
        list_recent_quizzes = []
        score_average = 0
        time_average = 0
        difficulties = []

        for i in recent_quizzes:
            score_average += i.score
            time_average += i.time_taken

            for j in i.quiz.all():
                list_recent_quizzes.append({"title": j.title, "score": i.score, "time": seconds_to_time(i.time_taken)})
                difficulties.append(j.difficulty)

        try:
            quizzes_num = len(list_recent_quizzes)

            score_average /= quizzes_num
            time_average /= quizzes_num
            
            time_average = seconds_to_time(int(time_average))
            
            most_played_difficulty = most_freq_difficulty(difficulties)

            return render(request, "quizzes_analytics.html", {
                "list_recent_quizzes": list_recent_quizzes[:3],
                "score_average": round(score_average, 1),
                "time_average": time_average,
                "most_played_difficulty": most_played_difficulty,
                "username": user.username

            })
        
        except ZeroDivisionError:
            return render(request, "quizzes_analytics.html", {
                "list_recent_quizzes": ["No Data"],
                "score_average": "No Data",
                "time_average": "No Data",
                "most_played_difficulty": "No Data",
                "username": user.username

            })