# Project Overview

My final project is a **quiz app**, The user can choose to take a quiz from an API (`opentdb API`) or take a quiz that other users created.

# Project's Structure

I used **Python** as the backend of this project and **Javascript** as the client side.

At the backend i have 5 models, Their purpose is:
1. User: I inherit the User model from **AbstractUser**.
2. Quiz: It will contain all the quizzes info, which are:
    1. creator: It is a `foreign Key` to the User model.
    2. img_url This is the image url that the user will input and this field is optinal and there is a defulte value in the backend.
    3. title: The title of the quiz.
    4. difficulty: The difficulty of the quiz (optinal).
    5. category: The category of the quiz (optinal).
    6. timer: a timer for the quiz
    7. isFromApi: This field is to tell the backend if this quiz is a quiz from the API (`opentdb API`), because in somepoint on the backend code, i need to provide a Quiz object to pass in to the Submissions model

3. Question model:
    1. question: This field will contain the text question that will appear to the user when the user is taking the quiz.
    2. quiz: This is a `ManyToManyField` that will tell the backend in what quiz this question belongs to.


4. Choices model:
    1. choice: This is the text choice that the user will see when the user is taking the quiz.
    2. isCorrectChoice: This is a boolean field that will tell the backend if this choice is the correct choice.
    3. question: This `ManyToManyField` will tell the backend to what question this choice is belongs to.

5. Submissions model, This model will have all the user submissions:
    1. user: Is a `foreign Key` that will tell the backend what user does this submission belongs to.
    2. score: This field will have the score of this submitted quiz.
    3. time_taken: This will have the time that it took the user to complete the quiz.
    4. Test: This is the field `ManyToManyField` that will refer to the test submitted by the user and its use is to get some information about that submission

And for the front end i used HTML and CSS to style the page, and i used a little amount of Bootstrap.


# Project Features

## Log In

A user can log in, which is the first thing the user sees when the user enters the website if the user is not loged in

![log in](/images/login.png)

## Sign Up

A user can sign up for a new account if the user does not have one.

The password must follow these requirements:
1. password must be at least 3 characters long.
2. password must be less than 15 characters.
3. password must have at least one symbol.

![sign up](/images/sign_up.png)


## Home
Here is where the user will see all the categories that the user can take from the API.

Here is a view to the home page (i zoomed out so you can see all of the page):
![homePage](/images/homePage.png)



## Quiz From opentdb API
The user can take a quiz from **opentdb API** This API does not require an API access key, This API is URL based.

Then i will give the user some choices about how the user would like to take the quiz,

The choices are:

1. 5 points per question (Easy 20 questions in 15 minutes)
2. 10 points per question (Medium 10 questions in 10 minutes)
3. 20 points per question (Hard 5 questions 10 minutes)

And there is a timer on the left side of the page when a user take a quiz.

Here is the view of the choices:
![apiQuizChoces](/images/apiQuizChoces.png)

And here is a view for the full page:
![api quiz](/images/api%20quiz.png)


And based on the user choice i will customize the URL to give me the quiz's questions the user choose.

i used **Javascript** to fetch the URL for the quiz questions and rendering the questions and choices by manipulating the DOM.


## Submitting Quiz
When the user finishes the quiz, the user will click on a submit button, if the user does not answers all the questions, the page will say "Please answer all questions before submitting.", and if the user answers all the questions, the page will say to the user what is the user score and time the user took to complete the quiz in seconds and the page will render the same quiz but the page will show the user:
1. The correct answers for each question and that will be green.
2. The incorrect answers for each question and that will be red.
3. The choices the user choose and from that:
    1. if the choice of the user is wrong, the choice will be half blue (means that this choice has choosen by the user) and half red (means that this is the wrong answer)

    2. if the choice of the user is correct, the choice will be half blue and half green (means this choice is green)

All of this will be handled on the client side insted of the backend to make the user experience faster.

Then when the user submits the quiz, JS will send a basic info about the user's quiz answer it will send via POST request:
1. The score Of the quiz.
2. The time that took the user to complete the quiz in seconds.
3. The quiz id.
4. The category name.
5. And the difficulty level.

This is all a basic info for the server to store in the database.

Here is a view of how does it looks like to take a quiz (in the image i scrooled all the way down so you can see the submit button):

![takingQuiz](/images/takingQuiz.png)

## Quizzes Analytics

The user can see their analytics, They can see their average score, Average time taken to complte a quiz, Most played difficulties and the most recent 3 quizzes the user took followed by the quiz score and time taken.


Here is a view of quizzes analytics (i zoomed out so you can see the full page):

![analytics](/images/analytics.png)


## Create Quizzes
Another thing the user can do is **create quizzes**, the user should press on the nav bar up the page on "create quiz" to create a quiz.

Then the user will be present with a page that tells the user to enter the quiz title, the image URL, The difficulty of the quiz, The category of the quiz and a timer for the quiz.

here is a view for how the user will set up the quiz:
![makeTheQuiz](/images/makeTheQuiz.png)

Then the user will be present with a page, and this page is where the user will create the quiz.

The page contains input fields which are:
1. question.
2. choice.

And there is two buttons, one is for adding a choice to a quiz, and the other is to add a new question with two choices.

The user can choose a correct answer by holding on a choice until it turn to green, And they can delete a choice or a question by double tapping on the choice or the question.

here is a view of how will the user make the quiz:
![setUpQuiz](/images/setUpQuiz.png)


When the user complete the quiz, The user will press on "Finish quiz" button, Then JS will take the user quiz and convert it to a easy to read dictionary then sending it to the server via PUT request.

Then the server will take the user's quiz, and adding it to the database and then redirecting the user to "Your quizzes" page which is a page where you can see all the quizzes you created.



## Discover Quizzes

And finally we have "Discover Quizzes" page, Here you can find what other's users created.

When you click on a quiz it will take the user to a page where the user can take the quiz and answer the questions like i said in **Quiz From opentdb API** and the user can submit the quiz like in **Submitting Quiz**

Here is a view for the page (the resone why the your quizzes and discover quizzes pages are the same because the account i am loged in is the same which i create all of these quizzes):

![discover_and_yourQuizzes](/images/discover_and_yourQuizzes.png)


## Your Quizzes
Here is where the user can see all of the quizzes the user has created.

Here is a view for the page (the resone why the your quizzes and discover quizzes are the same because the account i am loged in is the same which i create all of these quizzes):
![discover_and_yourQuizzes](/images/discover_and_yourQuizzes.png)


# Run The Application
I used a visual environment by a command called
```
pipenv
```

If you don't have pipenv, Run:
```
pip install pipenv
```

When you have `pipenv` installed, execute the following to run the application:

```
pipenv shell
pipenv install django
python manage.py makemigrations quiz
python manage.py migrate
python manage.py runserver
```


# Distinctiveness and Complexity

This project was complex to build, I faced many challenges, errors and bugs, but i could solve all of these errors, and bugs.

And this project is different from the other projects of other students.

This project has more than one model and views, The database structure was complex to build, How i merged the code to handle a quiz from an API and a quiz a user has created it was hard and challenging

# video of the project:
https://www.youtube.com/watch?v=DlMnvUCgQ-o

# Copyright:
The person who created this final project is Yousif Saif, i add this line before putting the project on github