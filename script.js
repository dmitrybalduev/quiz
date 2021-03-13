const startButton = document.getElementById("start");
const timerEl = document.getElementById("timer");
const answers = document.getElementById("answers");
const question = document.getElementById("question");
const quiz = document.getElementById("quiz");
const answerA = document.getElementById("A");
const answerB = document.getElementById("B");
const answerC = document.getElementById("C");
const answerD = document.getElementById("D");
const scoreEl = document.getElementById("score");
const form = document.getElementById("form");
const userInitials = document.getElementById("initials");
const goBackButton = document.getElementById("go-back-button")
const clearListButton = document.getElementById("clear-list-button");
const introEl = document.getElementById("intro");
const isCorrect = document.getElementById("is-correct");
let listScores = document.getElementById("listScores");
let timeInterval;

let storeScore = [];
let timeLeft = 120;
let score = 0;

let countQuestion = 0;

//add eventListener for Start button
startButton.addEventListener("click", startQuiz);

//fcuntion to start the quiz, render timer, display questions, and score
function startQuiz(){
    countdown();
    introEl.style.display = "none";
    quiz.style.display = "block";
    scoreEl.textContent = "Score: " + score;
    scoreEl.style.display = "block";
    displayChoices(countQuestion);
    countQuestion++;
}

//function for countdown
function countdown() {
    timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time left: " + timeLeft ;
    if(timeLeft === 0){
        clearInterval(timeInterval);
        finishGame();
    }
    }, 1000);
}
//stop timer
function stopTimer(){
    clearInterval(timeInterval);
}
//substract 10 sec from timer
function substractTimer(){
    stopTimer();
    timeLeft = timeLeft - 10;
    countdown();
}

//function to display questions
function displayChoices(number){
    question.innerHTML = choices[number].question;
    answerA.innerHTML = choices[number].choiceA;
    answerB.innerHTML = choices[number].choiceB;
    answerC.innerHTML = choices[number].choiceC;
    answerD.innerHTML = choices[number].choiceD;

}

//object to store questions and answers and correct answer
let choices = [
    {
        question : "Please choose a programming language from list",
        choiceA : "JavaScript",
        choiceB : "CSS",
        choiceC : "HTML",
        choiceD : "English",
        correct : "A"
    },
    {
        question : "How do you write 'Hello World' in an alert box?",
        choiceA : "console.log('Hello World')",
        choiceB : "alert('Hello World')",
        choiceC : "alertBox('Hello World')",
        choiceD : "msg('Hello World')",
        correct : "B"
    },
    {
        question : "How to write an IF statement in JavaScript?",
        choiceA : "if i == 5 then",
        choiceB : "if i = 5 then",
        choiceC : "if(i == 5)",
        choiceD : "if i = 5",
        correct : "C"
    }
];

//function to submit answer and check if it's correct or not
//if correct --> increase score by 10
function submitAnswer(option){
    if(option === choices[countQuestion-1].correct){
        score = score + 10;
        scoreEl.textContent = "Score: " + score;
        isCorrect.textContent = "Correct!";
    }else{
        //if wrong answer --> substract time by 10 sec
        substractTimer();
        scoreEl.textContent = "Score: " + score;
        isCorrect.textContent = "Wrong!";
    }
    //if last question --> finish the game and stop timer
    if(countQuestion === 3){
        //if it's last question, show the form
        finishGame();
        clearInterval(timeInterval)
    }else{
        //if not display next question
        displayChoices(countQuestion);
    }
    countQuestion++;
}
//function to hide quiz and finish game
function finishGame(){
    quiz.style.display = "none";
    form.style.display = "block";
}

//function for adding initials to list
form.addEventListener("submit", function(event){
    //preventing default behaviour
    event.preventDefault();
    //creating new list element
    let newItem = document.createElement("li");
    //adding a class name
    newItem.className = "list-group-item";
    //adding text to the list element
    newItem.innerHTML = userInitials.value + " - " + score;
    //appending list item to the list
    listScores.appendChild(newItem);
    //displaying the whole list
    document.getElementById("list-w-buttons").style.display = "block";
    //clearing user's input
    userInitials.value = "";
    //hiding form
    form.style.display = "none";
});
//fucntion to reload the page
function reloadPage(){
    location.reload();
    return false;
}
//function for clicking Back button
goBackButton.addEventListener("click", reloadPage);
//function to clear list
clearListButton.addEventListener("click", function(){
    listScores.innerHTML = "";
});
