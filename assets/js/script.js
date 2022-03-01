var pageContentEl = document.querySelector("#page-content");
var highscoreEl = document.querySelector(".highscore");
var dispTimeEl = document.querySelector(".disp-time");
var windowEl = document.querySelector(".main-window");

var currQuestion;
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

var questionList = [question0, question1, question2, question3, question4, question5]

var introScreen = function() {
    highscoreEl.innerHTML = "<a id='highscore' href='#'>View high scores</a>";
    dispTimeEl.innerHTML = "Time: <span id='timer'>0</span>";
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
    highscoreEl.innerHTML = "";
    windowEl.innerHTML = "";

    currQuestion = question0;

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
    if (targetEl.textContent.slice(3, targetEl.textContent.length) === currQuestion.correctanswer) {
        console.log("Correct Answer!!");
    }
    else {
        console.log("Wrong answer!");
    }
};

var loadHighScore = function() {
    highscoreEl.innerHTML = "";
    dispTimeEl.innerHTML = "";
    windowEl.innerHTML = "";
    
    var mainWindowEl = document.createElement("div");
    mainWindowEl.className = "high-score-window";
    mainWindowEl.innerHTML = "<h2>High Scores!!!</h2>";
    windowEl.appendChild(mainWindowEl);

    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "highscore-btns";
    mainWindowEl.appendChild(actionContainerEl);

    var goBackBtnEl = document.createElement("button");
    goBackBtnEl.textContent = "Go Back";
    goBackBtnEl.className = "btn goBack-btn";

    var clearHighScoreBtnEl = document.createElement("button");
    clearHighScoreBtnEl.textContent = "Clear High Scores";
    clearHighScoreBtnEl.className = "btn clearHighScores-btn";

    actionContainerEl.appendChild(goBackBtnEl);
    actionContainerEl.appendChild(clearHighScoreBtnEl);
    //
    //for (var i = 0; i < 10; i++) {
    //    var listScore = document.createElement("li");
    //    listScore.className = "highScoreList";
    //    
    //}


    //var savedScores = localStorage.getItem("highScores");

    //if (!savedScores) {
    //    console.log("No high scores to load!");
    //    return false;
    //}

    //savedScores = JSON.parse(savedScores);
};

var taskHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches(".start-btn")) {
        startQuiz();
    }

    if (targetEl.matches(".ans-btn")) {
        answerCheck(targetEl);
    }

    if (targetEl.matches("#highscore")) {
        loadHighScore();
    }

    if (targetEl.matches(".goBack-btn")) {
        introScreen();
    }
};


introScreen();
pageContentEl.addEventListener("click", taskHandler);