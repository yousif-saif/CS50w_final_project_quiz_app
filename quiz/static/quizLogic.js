const url = window.location.href
const urlParts = url.split("/")
let categoryId = urlParts[urlParts.length - 1]
const isFromDiscover = categoryId == "discover"
const quizSettingsButton = document.getElementById("quizSettingsButton")
const quizSettings = document.getElementById("quiz_settings")
const quiz = document.getElementById("quiz")
let responseToSubmit = null
let intervalId = null


if (isFromDiscover){
    quizSettings.style.display = "none"
    categoryId = urlParts[urlParts.length - 2]
    getQuizFromDB()
    

}else{
    if (categoryId == "30"){
        categoryId = "" // according to the api documentation anything that is an empty string it will be random
        
    
    }else{
        categoryId = `&category=${categoryId}`
    }

}


quizSettingsButton.addEventListener("click", () => {
    makeApiRequest()

})


function getQuizFromDB(){
    fetch(window.location.href, {
        method: "POST"

    })
    .then(response => response.json())
    .then(response => {
        responseToSubmit = response
        renderQuiz(response)
    })

    document.getElementById("wait").style.display = "block"

}

const quizData = {
    easy: {pointsPreQuestion: 5, numQuestions: 20, time: 15},
    medium: {pointsPreQuestion: 10, numQuestions: 10, time: 10},
    hard: {pointsPreQuestion: 20, numQuestions: 5, time: 10}

}

function makeApiRequest(){
    quizSettingsButton.disabled = true
    const HowQuizWorks = document.getElementById("HowQuizWorks").value
    const num_questions = quizData[HowQuizWorks].numQuestions

    
    let difficulty = `&difficulty=${HowQuizWorks}` // here will assign the difficulty of the quiz
    

    fetch(`https://opentdb.com/api.php?amount=${num_questions}${categoryId}${difficulty}`)
    .then(response => response.json())
    .then(response => {
        response.timer = quizData[HowQuizWorks].time
        response.pointsPreQuestion = quizData[HowQuizWorks].pointsPreQuestion
        responseToSubmit = response
        renderQuiz(response)

    })

    document.getElementById("wait").style.display = "block"


}

    

function renderQuiz(response){
    document.getElementById("wait").style.display = "none"

    response.results.forEach(question => {
        const templateQuestionDiv = document.createElement("div")
        templateQuestionDiv.setAttribute("id", "questionDiv")

        templateQuestionDiv.style.display = "block"

        const h3 = document.createElement("h3")
        h3.style.color = "white"
        h3.classList.add("mb-2")
        h3.innerHTML = question.question

        let incorrectAnswers = question.incorrect_answers
        const correct_answer = question.correct_answer
        console.log("correct answer: ", correct_answer)

        if (!incorrectAnswers.includes(correct_answer)){
            const randomIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1))
            incorrectAnswers.splice(randomIndex, 0, correct_answer)

        }

        templateQuestionDiv.appendChild(h3)
        templateQuestionDiv.appendChild(document.createElement("br"))

        for (let i = 0; i < incorrectAnswers.length; i++){
            const choice = document.createElement("div")
            choice.classList.add("mb-2", "form-control")
            choice.setAttribute("id", "question")
            if (incorrectAnswers[i] == correct_answer){
                choice.setAttribute("data-correct", "true")

            }

            choice.innerHTML = incorrectAnswers[i]
            templateQuestionDiv.appendChild(choice)

        }

        quiz.appendChild(templateQuestionDiv)

    })

    document.getElementById("submitButton").style.display = "block"


    document.getElementById("quiz").style.display = "block"
    document.getElementById("timer").style.display = "block"
    quizSettings.style.display = "none"

    quizChoices(response)


}

function choicesLogic(question){
    const questionDiv = question.parentElement
    const questionsInThatDiv = questionDiv.querySelectorAll("#question")
    

    let selectedQuestionIfExists = null

    questionsInThatDiv.forEach(questionInDiv => {
        if ("selected" in questionInDiv.dataset){
            selectedQuestionIfExists = questionInDiv
        }
    })
    
    if (question.dataset.selected == "True"){
        question.style.backgroundColor = "white"
        question.style.borderColor = "white"
        question.style.color = "black"
        question.removeAttribute("data-selected")

    }else{
        if (selectedQuestionIfExists){
            selectedQuestionIfExists.style.backgroundColor = "white"
            selectedQuestionIfExists.style.color = "black"
            question.style.borderColor = "white"

            selectedQuestionIfExists.removeAttribute("data-selected")

        }

        question.style.backgroundColor = "rgb(13, 110, 253)"
        question.style.borderColor = "rgb(13, 110, 253)"
        question.style.color = "white"
        question.setAttribute("data-selected", "true")

    }

}

function handleQuestionClick(){
    choicesLogic(this)
}

function quizChoices(response){
    const questions = document.querySelectorAll("#question")

    questions.forEach(question => {
        question.addEventListener("click", handleQuestionClick)

    })

    timer(response)

}


function timer(response){
    const num_questions = response.timer
    const timerP = document.getElementById("timeLeft")
    const oneSecondAsMilliseconds = 1000
    let timeInSeconds = num_questions

    let strTime = ""
    let minuts = 0
    let seconds = 0

    while (timeInSeconds != 0){
        timeInSeconds -= 0.5
        seconds += 30
        if (seconds == 60){
            seconds = 0
            minuts += 1
        }

    }

    function updateTimer(){
        if (strTime == "0:01"){
            document.getElementById("quiz").style.display = "none"
            const timesUp = document.getElementById("timesUp")
            timesUp.style.display = "block"

            clearInterval()
            return
        }
        seconds -= 1
        if (seconds <= 0){
            minuts -= 1
            seconds = 59

        }

        strTime = `${minuts}:${seconds}`

        if (`${seconds}`.length == 1){
            strTime = `${minuts}:0${seconds}`

        }
        timerP.textContent = strTime

    }

    intervalId = setInterval(updateTimer, oneSecondAsMilliseconds)


}

document.getElementById("submitButton").addEventListener("click", () => {    
    const allSelectedQuestions = Array.from(document.querySelectorAll("#question[data-selected='true'"))
    const timerP = document.getElementById("timeLeft")
    const pointsPreQuestion = responseToSubmit.pointsPreQuestion
    const numQuestions = responseToSubmit.results.length
    const selectedQuestionLength = allSelectedQuestions.length
    let finalScore = 0
  
    if (selectedQuestionLength !== numQuestions) {
        if (timerP.textContent === "00:01") {
            const cloneNode = allSelectedQuestions[0].cloneNode(true)
            cloneNode.innerHTML = " "
            const lengthToFill = numQuestions - selectedQuestionLength
    
            for (let i = 0; i < lengthToFill; i++) {
                allSelectedQuestions.push(cloneNode.cloneNode(true))
            }
        }
        else{
            alert("Please answer all questions before submitting.")
            return;
        }
    }


    for (let i = 0; i < numQuestions; i++) {
        let correctAnswer = responseToSubmit.results[i].correct_answer
        if (allSelectedQuestions[i].innerHTML === correctAnswer) {
            finalScore += pointsPreQuestion

        }
    }
  
    document.getElementById("submitButton").style.display = "none"
    document.getElementById("timer").style.display = "none"
    clearInterval(intervalId)

    const timeSolvingQuiz = document.getElementById("timeLeft").textContent
    const minsAndSeconds = timeSolvingQuiz.split(":")
    let timeInSeconds = responseToSubmit.timer * 60 - (parseInt(minsAndSeconds[0]) * 60 + parseInt(minsAndSeconds[1]))

    const score = document.getElementById("score")
    score.style.display = "block"
    score.textContent = `Your score score is ${finalScore}/100, You finished the quiz in ${timeInSeconds} seconds`
    let quizIdIfExsits = -1

    if ("quiz_id" in responseToSubmit){
        quizIdIfExsits = responseToSubmit.quiz_id
        
    }

    const data = {
        score: finalScore,
        time: timeInSeconds,
        quiz_id: quizIdIfExsits,
        category: responseToSubmit.results[0].category,
        difficulty: responseToSubmit.results[0].difficulty
    }


    const allChoices = document.querySelectorAll("#question")

    allChoices.forEach(choice => {
        const isSelected = choice.dataset.selected == "true"

        if (choice.dataset.correct == "true"){
            if (isSelected){
                choice.classList.add("selectedAndCorrect")

            }else{
                choice.style.backgroundColor = "lightgreen"
                choice.style.color = "white"
            }

        }else{
            choice.style.backgroundColor = "red"
            choice.style.color = "white"

        }

        if (isSelected){
            choice.style.backgroundColor = "rgb(13, 110, 253)"
            // i did not add color: white because it's already white

        }

        choice.removeEventListener("click", handleQuestionClick)


    })
    

    fetch("/submit_quiz", {
        method: "POST",
        body: JSON.stringify(data)

    })
    .then(response => response.json())
    .then(response => {
        if ("error" in response){
            alert(response.error)
            
        }
    })

})