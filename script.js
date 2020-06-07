// Array of questions
var questionsArray = [{
        question: "What is CSS?",
        answerA: "Cascading Sheets Style",
        answerB: "Cascading Level Sheets Style",
        answerC: "Cascading Style Sheets",
        answerD: "Cascading Style Sliders",
        correct: "C",
    },
    {
        question: "What is HTML?",
        answerA: "Hyper Text Markup Language",
        answerB: "Hommer Tool Markup Language",
        answerC: "Hyper Thread Markup Language",
        answerD: "Hyperlinks Text Markup Language",
        correct: "A",
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        answerA: "Style",
        answerB: "Class",
        answerC: "Styles",
        answerD: "Font",
        correct: "A",
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        answerA: "head",
        answerB: "heading",
        answerC: "h6",
        answerD: "h1",
        correct: "D",
    },
    {
        question: "In JavaScript, what is a block of code called that is used to perform a specific task?",
        answerA: "Function",
        answerB: "Declaration",
        answerC: "Variable",
        answerD: "String",
        correct: "A",
    },
    {
        question: "Which character is used to indicate an end tag?",
        answerA: "*",
        answerB: "<",
        answerC: "/",
        answerD: "ˆ",
        correct: "C",
    },
    {
        question: "HTML comments start with <!-- and end with -->",
        answerA: "False",
        answerB: "True",
        answerC: "Conditional statements",
        answerD: "NA",
        correct: "B",
    },
    {
        question: "In JavaScript, what element is used to store multiple values in a single variable?",
        answerA: "Arrays",
        answerB: "Strings",
        answerC: "Variables",
        answerD: "Functions",
        correct: "A",
    },
    {
        question: "What is the name of the object that allows you to perform mathematical tasks with the interpreter?",
        answerA: "Count",
        answerB: "Solve",
        answerC: "Number",
        answerD: "Math",
        correct: "D",
    },
    {
        question: "What can loops offer JavaScript code as a whole?",
        answerA: "Improved performance",
        answerB: "Added plug-ins",
        answerC: "Cross-platform support",
        answerD: "Cleaner syntax",
        correct: "A",
    },
];

// Variables storing elements
var nav = document.querySelector("nav");
var navHighscoreLink = document.querySelector("#highscore-link");
var timeCount = document.querySelector(".time-count");
var startDiv = document.querySelector("#start");
var startButton = document.querySelector("#start-button");
var quizDiv = document.querySelector("#quiz");
var questionDiv = document.getElementById("question");
var answerAButton = document.getElementById("A");
var answerBButton = document.getElementById("B");
var answerCButton = document.getElementById("C");
var answerDButton = document.getElementById("D");
var resultsDiv = document.querySelector("#results");
var resultsScoreDiv = document.querySelector("#score-display");
var initialsInput = document.querySelector("#initials");
var submitScoreButton = document.querySelector("#submit-button");
var highScoresDiv = document.querySelector("#highscores");
var scoresRankedOl = document.querySelector("#score-ranking");
var goBackButton = document.querySelector("#go-back");
var clearScoresButton = document.querySelector("#clear-scores");

// Variables for use in script

var lastQuestion = questionsArray.length - 1;
var currentQuestion = 0;
var totalSeconds = 0;
var secondsElapsed = 0;
var quizTimer;
var quizScore = 0;
var localStorageArray = [];
var scoresArray = [];

init();

// Hiding resultsDiv and highScoresDiv on page load
function init() {
    resultsDiv.style.display = "none";
    highScoresDiv.style.display = "none";

    // Retrieves locally stored scores
    scoresArray = JSON.parse(localStorage.getItem("score"));

    // If scoresArray were retrieved from localStorage, update the localStorageArray to it
    if (scoresArray !== null) {
        localStorageArray = scoresArray;
    }
}

// startQuiz function activates on click of startButton.
function startQuiz() {
    // The startDiv and highScoreLink whilst appending the quizDiv
    startDiv.style.display = "none";
    navHighscoreLink.style.display = "none";
    quizDiv.style.display = "block";

    // Questions and Answers render
    renderQuestion();
    // quizTimer commences countdown
    renderCounter();
}

// Function renders a question from the questionsArray along with the answers relevant to that question.
function renderQuestion() {
    var q = questionsArray[currentQuestion];

    questionDiv.innerHTML = "<p>" + q.question + "</p>";
    answerAButton.innerHTML = q.answerA;
    answerBButton.innerHTML = q.answerB;
    answerCButton.innerHTML = q.answerC;
    answerDButton.innerHTML = q.answerD;
}

// Function checks if the answer is correct or wrong as selected by the user.
function checkAnswer(answer) {
    if (answer == questionsArray[currentQuestion].correct) {
        // Answer is correct
        quizScore += 5;
    } else {
        // else if answer is incorrect, minus 10 seconds from quizTimer
        secondsElapsed += 10;
    }
    // Increases currentQuestion if less than lastQuestion and renders a new question
    if (currentQuestion < lastQuestion) {
        currentQuestion++;
        renderQuestion();
    } else {
        // else ends the quiz and shows the resultsDiv
        stopTimer();
    }
}

// Controls setting, countdown and stopping of the quizTimer
function renderCounter() {
    // Clears the quizTimer & sets the totalSeconds
    setTime();

    // Increases secondsElapsed by 1 second which gets subtracted from the totalSeconds set in setTime()
    quizTimer = setInterval(function() {
        secondsElapsed++;

        renderTime();
    }, 1000);
}

// Sets the totalSeconds
function setTime() {
    // Clears the quizTimer
    clearInterval(quizTimer);
    totalSeconds = 70;
}

// Changes the timeCount in the html based on the secondsLeft
function renderTime() {
    secondsLeft = totalSeconds - secondsElapsed;
    timeCount.textContent = secondsLeft;
    // If secondsElapsed equals totalSeconds, the quizTimer stops
    if (secondsElapsed >= totalSeconds) {
        stopTimer();
    }
}

// Renders the submitScorePage whilst stopping and resetting the quizTimer
function stopTimer() {
    secondsElapsed = 0;
    setTime();
    // Resets the timeCount in the html based on the time in setTime()
    renderTime();
    recordScorePage();
}

// Renders resultsDiv to be able to log your score with your initials
function recordScorePage() {
    quizDiv.style.display = "none";
    resultsDiv.style.display = "block";
    resultsScoreDiv.innerHTML =
        "<h4>" + "Your final score is: " + quizScore + "</h4>";
    initialsInput.value = "";
}

// Renders highScoresDiv to display results in order from highest to lowest
function renderRecordedScores(event) {
    event.preventDefault();

    // Stores the users score
    storeScores();
    // Renders the score/s to the scoresRankedOl
    renderScores();

    resultsDiv.style.display = "none";
    nav.style.display = "none";
    highScoresDiv.style.display = "block";
}

// Stores the users score
function storeScores() {
    // If no initials are entered, alerts the user and prevents the highScoresDiv from rendering
    if (initialsInput.value.length == 0) {
        alert("Please enter your initials Brother");
        return false;
    }

    // Stores initials entered and score in an empty array
    var scoreObject = { initials: initialsInput.value, userScore: quizScore };
    // Score is pushed to the localStorageArray
    localStorageArray.push(scoreObject);
    // Stores the users score in localStorage
    localStorage.setItem("score", JSON.stringify(localStorageArray));
}

// Renders the score/s to the scoresRankedOl
function renderScores() {
    // Clears any existing appended li
    scoresRankedOl.innerHTML = "";
    // Sorts the scores
    localStorageArray.sort(function(a, b) {
        return b.userScore - a.userScore;
    });
    // Loops through the scoresArray and appends each li
    for (var i = 0; i < localStorageArray.length; i++) {
        scoreStored = localStorageArray[i];

        var li = document.createElement("li");
        li.textContent = scoreStored.initials + " - " + scoreStored.userScore;
        li.setAttribute("id", "userScore");

        scoresRankedOl.appendChild(li);
    }
}

// Function hides startDiv & navbar & loads highScoresDiv on click of highScoreLink in navbar
function renderHighScoresLink() {
    startDiv.style.display = "none";
    nav.style.display = "none";
    highScoresDiv.style.display = "block";
}

// Function to return user to the quiz start page to have another attempt
function goBackButtonFunction() {
    highScoresDiv.style.display = "none";
    nav.style.display = "flex";
    navHighscoreLink.style.display = "flex";
    startDiv.style.display = "block";
    resetQuiz();
}

// Resets the quiz currentQuestion and quizScore to 0 so the user can start again
function resetQuiz() {
    currentQuestion = 0;
    quizScore = 0;
}

// Clears the scores onClick of the clearScoreButton
function clearScore() {
    localStorage.removeItem("score");
    localStorageArray = [];
    scoresRankedOl.innerHTML = "";
}

// Event Listeners
navHighscoreLink.addEventListener("click", renderHighScoresLink);
startButton.addEventListener("click", startQuiz);
submitScoreButton.addEventListener("click", renderRecordedScores);
goBackButton.addEventListener("click", goBackButtonFunction);
clearScoresButton.addEventListener("click", clearScore);