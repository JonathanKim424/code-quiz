// define DOM element variables
var pageContentEl = document.querySelector("#page-content");
var highscoreEl = document.querySelector(".highscore");
var dispTimeEl = document.querySelector(".disp-time");
var windowEl = document.querySelector(".main-window");

// define variables related to the list of questions and answers objects
var currQuestion;
var questionList;
var question0 = {
    question: "Inside which HTML element do we puth the JavaScript?",
    answers: ["<scripting>", "<javascript>", "<script>", "<js>"],
    correctanswer: "<script>"
};

var question1 = {
    question: "Which of these values is NOT considered false?",
    answers: ["0", '"0"', "null", '""'],
    correctanswer: '"0"'
};

var question2 = {
    question: "How to write an IF statement in JavaScript?",
    answers: ["if i = 5 then", "if (i == 5) {}", "if i == 5 then", "if i = 5 {}"],
    correctanswer: "if (i == 5) {}"
};

var question3 = {
    question: "How does a FOR loop start?",
    answers: ["for (i = 0; i <= 5; i++) {}", "for i = 1 to 5 {}", "for (i <= 5; i++) {}", "for (i = 0; i <= 5) {}"],
    correctanswer: "for (i = 0; i <= 5; i++) {}"
};

var question4 = {
    question: "How can you add a comment in a JavaScript?",
    answers: ["// this is a comment", "<!-- this is a comment -->", "# this is a comment", "'this is a comment'"],
    correctanswer: "// this is a comment"
};

var question5 = {
    question: "How do you find the number with the highest value of x and y?",
    answers: ["ceil(x,y)", "top(x,y)", "Math.ceil(x,y)", "Math.max(x,y)"],
    correctanswer: "Math.max(x,y)"
}

// define variables related to the timer function
var timer;
var timerStop;

// define variable for the localStorage function for high scores
var loadedHighScores = [];


// initial all quiz question variables, timer functions, and display opening splash screen
var introScreen = function() {
    // init question list & timer flags
    questionList = [question0, question1, question2, question3, question4, question5];
    timer = 0;
    timerStop = 0;

    // creates game header for high score and timer
    highscoreEl.innerHTML = "<a id='highscore' href='#'>View high scores</a>";
    dispTimeEl.textContent = "Time: " + timer;

    // deletes any existing HTML in the window element and replaces content
    windowEl.innerHTML = "";
    var mainHTML =
        "<h2>Coding Quiz Challenge</h2>" +
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

// starts quiz based on the event of clicking start button
var startQuiz = function() {
    // starts the timer
    timer = 60;
    dispTimeEl.textContent = "Time: " + timer;
    var setTimer = setInterval(function() {
        // counts down timer every 1 second interval
        timer = timer - 1;
        dispTimeEl.textContent = "Time: " + timer;
        // sets timer stop condition to either be 0 seconds or by
        // timerStop flag triggered by end of game
        if (timer === 0 || timerStop === 1) {
            clearInterval(setTimer);
        }
    }, 1000);

    // removes the high score text/button as QoL improvement
    // (prevents accidental selection in middle of quiz)
    highscoreEl.innerHTML = "";
    // run the quiz function
    quizQuestion();
};

// displays question and answer buttons
var quizQuestion = function() {
    windowEl.innerHTML = "";

    // randomly selects a question object based on existing question list
    var ranQue = Math.floor(Math.random()*questionList.length);
    // deep copy of object to prevent modification of original object
    currQuestion = JSON.parse(JSON.stringify(questionList[ranQue]));
    // after setting question, current question is spliced from question list
    questionList.splice(ranQue, 1);

    // displays set question
    var quizQuestionEl = document.createElement("div");
    quizQuestionEl.className = "quiz-question";
    quizQuestionEl.innerHTML = currQuestion.question;
    windowEl.appendChild(quizQuestionEl);

    // break element for formatting
    var breakEl = document.createElement("div");
    breakEl.className = "break";
    windowEl.appendChild(breakEl);

    // container for answer buttons
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "ansBtn"
    windowEl.appendChild(actionContainerEl);
    // generates answer buttons
    for (var i = 0; i < 4; i++) {
        // randomly selects an answer based on the current array for available answers
        var ranAns = Math.floor(Math.random()*currQuestion.answers.length);
        var answerText = currQuestion.answers[ranAns];
        // splices answer to remove from available answer pool
        currQuestion.answers.splice(ranAns, 1);

        // creates answer button
        var answerButtonEl = document.createElement("button");
        answerButtonEl.className = "btn ans-btn";
        answerButtonEl.textContent = (i + 1) + ". " + answerText;
        actionContainerEl.appendChild(answerButtonEl);
    }
};

// performs an answer check based on user selecting an answer
var answerCheck = function(targetEl) {
    // set text value by removing the number heading in the answer
    var playerAns = targetEl.textContent.slice(3, targetEl.textContent.length);
    var answerCheckEl = document.createElement("div");
    answerCheckEl.className = "answer-check";
    // displays results
    if (playerAns === currQuestion.correctanswer) {
        answerCheckEl.textContent = "Correct!";
    }
    else {
        answerCheckEl.textContent = "Wrong!";
        // if answer wrong, deducts 10 seconds from timer
        timer = timer - 10;
    }

    // checks to see if there are any more questions left
    if (questionList.length > 0) {
        // if yes, reruns quiz function
        quizQuestion();
    }
    else {
        // if no, ends game and displays result screen
        finalScore();
    }

    // break element for formatting
    var breakEl = document.createElement("div");
    breakEl.className = "break";
    windowEl.appendChild(breakEl);

    // appends the answer results to window
    windowEl.appendChild(answerCheckEl);
};

// final result screen after game is over
var finalScore = function() {
    // sets timer flag to stop timer
    timerStop = 1;
    // disconnect between timer function and displayed time, offset for correction
    var score = timer - 1;

    // clears window element and displays end game text, score, and user form for initials
    windowEl.innerHTML = "";
    var quizEndEl = document.createElement("div");
    quizEndEl.className = "quizend"
    quizEndEl.innerHTML =
        "<h2>All done!</h2>" +
        "<p>Your final score is " + score + ".";
    windowEl.appendChild(quizEndEl);

    // break element for formatting
    var break1El = document.createElement("div");
    break1El.className = "break";
    windowEl.appendChild(break1El);

    // create form to capture user input for high score
    var highscoreFormEl = document.createElement("form");
    highscoreFormEl.className = "highscoreForm"
    highscoreFormEl.innerHTML = 
        "Enter initials: " +
        "<input type='text' name='score-name'/> " +
        "<button class='btn' id='save-score' type='submit'>Submit</button>";
    windowEl.appendChild(highscoreFormEl);
};

// saves high score based on user input of submit in final result screen
var saveHighScore = function(event) {
    // prevent window from refresshing from form submit
    event.preventDefault();

    var initialInputEl = document.querySelector("input[name='score-name']").value;
    // checks to make sure something is in input form
    if (!initialInputEl) {
        alert("You need to enter your initials!");
        return false;
    }

    // cycles through existing high score such that scores are always logged from highest to lowest
    for (var i = 0; i < 10; i++) {
        // if current high score is higher than existing score, inserts score
        if (timer > loadedHighScores[i].score) {
            var highscoreObj = {
                name: initialInputEl,
                score: timer
            };

            loadedHighScores.splice(i, 0, highscoreObj);

            // if after score insert, there are more than 10 scores, removes last (lowest) score
            if (loadedHighScores.length > 10) {
                loadedHighScores.pop();
            }

            // break so that once a score position is determined, it stops loop
            break;
        }
    }

    // saves current score list to localStorage
    localStorage.setItem("highScores", JSON.stringify(loadedHighScores));

    // displays high score screen
    highScoreScreen();
};

// high score screen from either user button selection on intro screen or from end game
var highScoreScreen = function() {
    highscoreEl.innerHTML = "";
    dispTimeEl.innerHTML = "";
    windowEl.innerHTML = "";
    
    var headerEl = document.createElement("div");
    headerEl.className = "highscoreheader"
    headerEl.innerHTML = "<h2>High Scores!!!</h2>";
    windowEl.appendChild(headerEl);

    // break element for formatting
    var break1El = document.createElement("div");
    break1El.className = "break";
    windowEl.appendChild(break1El);

    // creates ordered list that generates list item based on current high score list
    var highScoreListEl = document.createElement("div");
    highScoreListEl.className = "highscorelist"
    windowEl.appendChild(highScoreListEl);
    for (var i = 0; i < 10; i++) {
        var highScoreItemEl = document.createElement("div");
        highScoreItemEl.className = "highscoreitem"
        var scorepos = i + 1;
        highScoreItemEl.textContent = scorepos + ". " + loadedHighScores[i].name + " - " + loadedHighScores[i].score;
        highScoreListEl.appendChild(highScoreItemEl);
    }

    // break element for formatting
    var break2El = document.createElement("div");
    break2El.className = "break";
    windowEl.appendChild(break2El);

    // generates go back button and clear high score button
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

// runs clear high score if user selects button on high score screen
var clearHighScores = function() {
    var clearHSConfirm = window.confirm("Are you sure you want to clear high scores?");

    // if user confirms, replaces all values in high score list as below
    if (clearHSConfirm) {
        for (var i = 0; i < 10; i++) {
            var highscoreObj = {
                name: "??",
                score: 0
            };
            loadedHighScores[i] = highscoreObj;
        }
        // saves to localStorage the now deleted score list
        localStorage.setItem("highScores", JSON.stringify(loadedHighScores));
        // refreshes high score screen to display changes
        highScoreScreen();
    }
    // stops function if user declines clear high score function
    return false;
};

// universal handler for all click events based on target class/id
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

// loads high score from localStorage
var loadHighScore = function() {
    var savedHighScores = localStorage.getItem("highScores");

    // if no high scores are available, sets default values for score list
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

// runs intro splash screen
introScreen();
// runs load high score function
loadHighScore();
// activates global event listener for clicks
pageContentEl.addEventListener("click", taskHandler);