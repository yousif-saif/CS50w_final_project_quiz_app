const createQuiz = document.getElementById("createQuiz")
const quiz = document.getElementById("quiz")
const quizSettings = document.getElementById("quiz_settings")

createQuiz.addEventListener("click", () => {
    const quizTitle = document.getElementById("quiz_title").value
    const mins = parseInt(document.getElementById("mins").value)

    if (mins == 0){
        alert("Please enter a time that is more than 0 mins")
        return false
    }

    if (!(mins <= 59 && mins >= 0)){
        alert("Please enter a vaild timer for your quiz")
        return false
    }

    if (quizTitle == ""){
        alert('Please enter a title for your Quiz')
        return false
    }

    quizSettings.style.display = "none"    
    quiz.style.display = "block"

})

let pressTimer;

function startHold(question) {
    pressTimer = setTimeout(() => onHold(question), 1000)
}

function endHold() {
    clearTimeout(pressTimer)
}

function onHold(question) {
    const otherCorrectChoiceIfExists = question.parentElement.querySelector("#question[data-correct='true']")
    if ((question.dataset.correct == "true")){
        question.style.backgroundColor = "white"
        question.removeAttribute("data-correct")
        
    }else{
        if (otherCorrectChoiceIfExists){
            otherCorrectChoiceIfExists.style.backgroundColor = "white"
            otherCorrectChoiceIfExists.removeAttribute("data-correct")
        }

        question.style.backgroundColor = "lightgreen"
        question.setAttribute("data-correct", "true")

    }

}

function addChoice(addChoiceButton){
    const choicesDiv = addChoiceButton.parentElement.parentElement.querySelector("#choices")
    const newChoice = document.createElement("input")
    newChoice.type = "text"
    newChoice.classList.add("form-control", "mb-3")
    newChoice.setAttribute("id", "question")
    newChoice.placeholder = "Choice: "

    choicesDiv.appendChild(newChoice)
}

quiz.addEventListener("mousedown", (event) => {
    if (event.target.matches("#question")) {
        startHold(event.target)
    }
})

quiz.addEventListener("touchstart", (event) => {
    if (event.target.matches("#question")) {
        startHold(event.target)
    }
})

quiz.addEventListener("dblclick", (event) => {
    if (event.target.matches("#question")) {
        event.target.remove()
    }
})

quiz.addEventListener("click", (event) => {
    if (event.target.matches("#addChoice")){
        addChoice(event.target)
    }
})

quiz.addEventListener("dblclick", (event) => {
    if (event.target.matches("#questionText")){
        event.target.parentElement.remove()

    }
})


quiz.addEventListener("mouseup", endHold)
quiz.addEventListener("mouseleave", endHold)
quiz.addEventListener("touchend", endHold)
quiz.addEventListener("touchcancel", endHold)



document.getElementById("addQuestion").addEventListener("click", () => {
    const questionDivHTML = `
        <input type="text" class="form-control mb-3" id="questionText" placeholder="Question: ">

        <div id="choices">
            <input type="text" id="question" class="form-control mb-3" placeholder="Choice: ">
            <input type="text" id="question" class="form-control mb-3" placeholder="Choice: ">

        </div>
                
        <div class="d-flex justify-content-center text-center">
            <button class="btn btn-primary" id="addChoice">Add choice</button>

        </div>

    `

    const questionDiv = document.createElement("div")
    questionDiv.classList.add("mb-3")
    questionDiv.setAttribute("id", "questionDiv")

    questionDiv.innerHTML = questionDivHTML

    document.getElementById("questions").appendChild(questionDiv)
    


})

document.getElementById("finshQuiz").addEventListener("click", () => {
    const questionDivsCount = document.querySelectorAll("#questionDiv").length
    const correctAswersCount = document.querySelectorAll("#question[data-correct='true']").length

    if (correctAswersCount != questionDivsCount){
        alert("Please add a correct answer for every question")
        return false

    }

    if (questionDivsCount == 0){
        alert("Please add at least one question")
        return false

    }

    const quizTitle = document.getElementById("quiz_title").value
    const quizImg = document.getElementById("quiz_img").value
    const difficulty = document.getElementById("difficulty").value
    const category = document.getElementById("categorySelect").value
    const mins = parseInt(document.getElementById("mins").value)



    const quizSettings = {
        title: quizTitle,
        img_url: quizImg,
        difficulty: difficulty,
        category: category,
        timer: mins
    }

    let data = {
        questions: [],
        quizSettings: quizSettings

    }

    const questions = document.querySelectorAll("#questionDiv")
    questions.forEach(question => {
        let choices = []

        question.querySelectorAll("#question").forEach(choice => {
            choices.push([choice.value, choice.dataset.correct == "true"])
        })

        const oneQuestion = {
            question: question.querySelector("#questionText").value,
            choices: choices
        }

        data.questions.push(oneQuestion)
    })


    fetch("/create_quiz", {
        method: "PUT",
        body: JSON.stringify(data)

    })
    .then(response => response.json())
    .then(response => window.location.href = response.url)

})