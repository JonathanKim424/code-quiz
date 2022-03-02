var pageContentEl = document.querySelector("#page-content");
var highscoreEl = document.querySelector(".highscore");
var dispTimeEl = document.querySelector(".disp-time");
var windowEl = document.querySelector(".main-window");

var currQuestion;
var questionList;
var question0 = {
    question: "Arrays in JavaScript can be used to store ______.",
    answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correctanswer: "booleans"
};

var question1 = {
    question: "Test question 1?",
    answers: ["answer1", "answer2", "answer3", "answer4"],
    correctanswer: "answer2"
};

var question2 = {
    question: "Test question 2?",
    answers: ["answer1", "answer2", "answer3", "answer4"],
    correctanswer: "answer2"
};

var question3 = {
    question: "Test question 3?",
    answers: ["answer1", "answer2", "answer3", "answer4"],
    correctanswer: "answer2"
};

var question4 = {
    question: "Test question 4?",
    answers: ["answer1", "answer2", "answer3", "answer4"],
    correctanswer: "answer2"
};

var question5 = {
    question: "Test question 5?",
    answers: ["answer1", "answer2", "answer3", "answer4"],
    correctanswer: "answer2"
};

var timer;
var timerStop;

var loadedHighScores = [];

var introScreen = function() {
    questionList = [question0, question1, question2, question3, question4, question5];
    timer = 0;
    timerStop = 0;
    highscoreEl.innerHTML = "<a id='highscore' href='#'>View high scores</a>";
    dispTimeEl.textContent = "Time: " + timer;
    windowEl.innerHTML = "";
    var mainHTML =
        "<h2>Coding Quiz challenge</h2>" +
        "Try to answer the following code-related questions within the time limit.<br>" +
        "Keep in mind that incorrect answers will penalize your score/time by ten seconds!";

    var mainWindowEl = document.createElement("div");
    mainWindowEl.className = "intro";
    mainWindowEl.innerHTML = mainHTML;
    windowEl.appendChild(mainWindowEl);

    var actionContainerEl = document.createElement("div");
    mainWindowEl.appendChild(actionContainerEl);

    var startBtnEl = document.createElement("button");
    startBtnEl.textContent = "Start Quiz";
    startBtnEl.className = "btn start-btn";
    actionContainerEl.appendChild(startBtnEl);
};

var startQuiz = function() {
    // start the timer
    timer = 60;
    dispTimeEl.textContent = "Time: " + timer;
    var setTimer = setInterval(function() {
        timer = timer - 1;
        dispTimeEl.textContent = "Time: " + timer;
        if (timer === 0 || timerStop === 1) {
            clearInterval(setTimer);
        }
    }, 1000);

    // run the quiz function
    highscoreEl.innerHTML = "";
    quizQuestion();
};

var quizQuestion = function() {
    windowEl.innerHTML = "";

    var ranQue = Math.floor(Math.random()*questionList.length);
    currQuestion = questionList[ranQue];
    questionList.splice(ranQue, 1);

    var quizQuestionEl = document.createElement("div");
    quizQuestionEl.className = "quiz-question";
    quizQuestionEl.innerHTML = currQuestion.question;
    windowEl.appendChild(quizQuestionEl);

    var actionContainerEl = document.createElement("div");
    windowEl.appendChild(actionContainerEl);
    for (var i = 0; i < 4; i++) {
        var ranAns = Math.floor(Math.random()*currQuestion.answers.length);
        var answerText = currQuestion.answers[ranAns];
        currQuestion.answers.splice(ranAns, 1);

        var answerButtonEl = document.createElement("button");
        answerButtonEl.className = "btn ans-btn";
        answerButtonEl.textContent = (i + 1) + ". " + answerText;
        actionContainerEl.appendChild(answerButtonEl);
    }
};

var answerCheck = function(targetEl) {
    var playerAns = targetEl.textContent.slice(3, targetEl.textContent.length);
    var answerCheckEl = document.createElement("div");
    answerCheckEl.className = "answer-check";
    if (playerAns === currQuestion.correctanswer) {
        answerCheckEl.textContent = "Correct!";
    }
    else {
        answerCheckEl.textContent = "Wrong!";
        timer = timer - 10;
    }

    if (questionList.length > 0) {
        quizQuestion();
    }
    else {
        finalScore();
    }
    windowEl.appendChild(answerCheckEl);
};

var finalScore = function() {
    timerStop = 1;
    var score = timer - 1;

    windowEl.innerHTML = "";

    var quizEndEl = document.createElement("div");
    windowEl.appendChild(quizEndEl);
    quizEndEl.innerHTML =
        "<h2>All done!</h2>" +
        "<p>Your final score is " + score + ".";

    var highscoreFormEl = document.createElement("form");
    highscoreFormEl.innerHTML = 
        "Enter initials: " +
        "<input type='text' name='score-name'/> " +
        "<button class='btn' id='save-score' type='submit'>Submit</button>";
    windowEl.appendChild(highscoreFormEl);
};

var saveHighScore = function(event) {
    event.preventDefault();

    var initialInputEl = document.querySelector("input[name='score-name']").value;
    console.log(initialInputEl);
    if (!initialInputEl) {
        alert("You need to enter your initials!");
        return false;
    }

    for (var i = 0; i < 10; i++) {
        if (timer > loadedHighScores[i].score) {
            var highscoreObj = {
                name: initialInputEl,
                score: timer
            };

            loadedHighScores.splice(i, 0, highscoreObj);

            if (loadedHighScores.length > 10) {
                loadedHighScores.pop();
            }

            break;
        }
    }

    console.log(loadedHighScores);

    localStorage.setItem("highScores", JSON.stringify(loadedHighScores));

    highScoreScreen();
};

var highScoreScreen = function() {
    highscoreEl.innerHTML = "";
    dispTimeEl.innerHTML = "";
    windowEl.innerHTML = "";
    
    windowEl.innerHTML = "<h2>High Scores!!!</h2>";

    var highScoreListEl = document.createElement("ol");
    windowEl.appendChild(highScoreListEl);

    for (var i = 0; i < 10; i++) {
        var highScoreItemEl = document.createElement("li");
        highScoreItemEl.textContent = loadedHighScores[i].name + " - " + loadedHighScores[i].score;
        highScoreListEl.appendChild(highScoreItemEl);
    }

    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "highscore-btns";
    windowEl.appendChild(actionContainerEl);

    var goBackBtnEl = document.createElement("button");
    goBackBtnEl.textContent = "Go Back";
    goBackBtnEl.className = "btn goBack-btn";

    var clearHighScoreBtnEl = document.createElement("button");
    clearHighScoreBtnEl.textContent = "Clear High Scores";
    clearHighScoreBtnEl.className = "btn clearHighScores-btn";

    actionContainerEl.appendChild(goBackBtnEl);
    actionContainerEl.appendChild(clearHighScoreBtnEl);
};

var clearHighScores = function() {
    var clearHSConfirm = window.confirm("Are you sure you want to clear high scores?");

    if (clearHSConfirm) {
        for (var i = 0; i < 10; i++) {
            var highscoreObj = {
                name: "??",
                score: 0
            };
            loadedHighScores[i] = highscoreObj;
        }
        localStorage.setItem("highScores", JSON.stringify(loadedHighScores));
        highScoreScreen();
    }
    return false;
};

var taskHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches(".start-btn")) {
        startQuiz();
    }

    if (targetEl.matches(".ans-btn")) {
        answerCheck(targetEl);
    }

    if (targetEl.matches("#save-score")) {
        saveHighScore(event);
    }

    if (targetEl.matches("#highscore")) {
        highScoreScreen();
    }

    if (targetEl.matches(".goBack-btn")) {
        introScreen();
    }

    if (targetEl.matches(".clearHighScores-btn")) {
        clearHighScores();
    }
};

var loadHighScore = function() {
    var savedHighScores = localStorage.getItem("highScores");

    if (!savedHighScores) {
        console.log("No high scores to load!");
        for (var i = 0; i < 10; i++) {
            var highscoreObj = {
                name: "??",
                score: 0
            };
            loadedHighScores.push(highscoreObj);
        }
        return false;
    }

    loadedHighScores = JSON.parse(savedHighScores);
};

introScreen();
loadHighScore();
pageContentEl.addEventListener("click", taskHandler);