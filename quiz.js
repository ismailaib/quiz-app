

function Quiz(questions) {
    this.score = 0
    this.questions = questions;
    this.questionIndex = 0;

}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}

function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        displayQuestion();
    }
};


function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML =
        `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

function showScores() {
    let quizEndHTML =`
        <div class="quiz-repeat">
            <h2 id='score'> Your scored: ${quiz.score} of ${quiz.questions.length}</h2>
            <a href="QA.html">Take Quiz Again</a>
        </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

const questions = [
    new Question(
        "Inside which HTML element do we put the JavaScript <...> ?",
        ["script", "js", "scripting", "javascript"], "script"
    ),
    new Question(
        "Cascading Style sheet stands for?",
        ["HTML", "JQuery", "CSS", "XML"], "CSS"
    ),
    new Question(
        "Which is a JavaScript Framework?",
        ["React", "Laravel", "Django", "Sass"], "React"
    ),
    new Question(
        "Which is a backend language?",
        ["PHP", "HTML", "React", "All"], "PHP"
    ),
    new Question(
        "Which is best for Artificial intelligence?",
        ["React", "Laravel", "Python", "Sass"], "Python"
    )
];

const quiz = new Quiz(questions);

displayQuestion();

const time = 0.5;
const quizTimeInSeconde = time * 60 * 60;
let quizTime = quizTimeInSeconde / 60;

const counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function () {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            counting.innerHTML = `${sec}`;
        }
    }, 1000);
}

startCountdown();

