var lives = 3;
var score = 0;

const scoreLabel = document.getElementById("show-score");
const livesLabel = document.getElementById("lives-score");
//const timerLabel = document.getElementById("timer");

const startBtn = document.getElementById("sBtn");
const correctBtn = document.getElementById("cBtn");
const falseBtn = document.getElementById("fBtn");

correctBtn.addEventListener("click", questionValidator);
falseBtn.addEventListener("click", questionValidator);

/* 
function questionValidator(){
    if()
}
 */
function startGame() {
    while(lives > 0){
        if(correctBtn.onclick() == "true" || falseBtn.onclick() == "false"){
            score ++;
            questionCreator();

        }else{
            lives --;
            questionCreator();
        }
    }

    if (lives <= 0) { 
        document.getElementById("question-con").innerHTML = "You mananged to get: " + score + " math questions right!";
    } 
}

function questionCreator() {
    var ranNum1 = getRandomInt(100);
    var ranNum2 = getRandomInt(100);
    var symbolGenerator = getRandomInt(4) + 1;
    var correctFalseOdds = getRandomInt(2);
    var falseOffset = getRandomInt(10) + 1;

    var equation;
    var outcome;

    switch (symbolGenerator) {
        case 1:
            equation = `${ranNum1} + ${ranNum2}`;
            outcome = ranNum1 + ranNum2;
            break;
        case 2:
            equation = `${ranNum1} - ${ranNum2}`;
            outcome = ranNum1 - ranNum2;
            break;
        case 3:
            equation = `${ranNum1} x ${ranNum2}`;
            outcome = ranNum1 * ranNum2;
            break;
        case 4:
            while (ranNum2 === 0 || ranNum1 % ranNum2 !== 0 || ranNum1 < ranNum2) {
                ranNum1 = getRandomInt(100);
                ranNum2 = getRandomInt(100);
            }
            equation = `${ranNum1} ÷ ${ranNum2}`;
            outcome = ranNum1 / ranNum2;
            break;
    }

    correctAnswer = outcome;
    if (correctFalseOdds === 0) {
        outcome += falseOffset * (Math.random() < 0.5 ? 1 : -1);
    }

    document.getElementById("question-con").innerHTML = equation + " = " + outcome;
}

function checkAnswer(isCorrect) {
    if ((isCorrect && correctAnswer == outcome) || (!isCorrect && correctAnswer != outcome)) {
        score++;
    } else {
        lives--;
    }
    if (lives <= 0) {
        endGame();
    } else {
        updateScoreLives();
        questionCreator();
    }
}

//gets random number created for math question (could add more for greater difficulty)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


//tests
function test() {
    var ranNum1 = getRandomInt(100);
    var ranNum2 = getRandomInt(100);

    var equation = "rn1: " + ranNum1 + " rn2: " + ranNum2;

    document.getElementById("question-con").innerHTML = equation;
}

/* 
function startGame() {

    const score = document.getElementById("show-score");
    const questionDisplay = document.getElementById("question-con");
    const TRUE = document.getElementById("tBtn");
    const FALSE = document.getElementById("fBtn");

    const q = [
        "2 + 2 = 4",
        "3 + 6 = 8",
        "10 x 2 = 21",
        "10 x 12 = 120",
        "13 x 16 = 168",
        "21 x 9 = 189",
        "30 x 15 = 150",
        "186 + 114 = 300",
        "18 x 18 = 36",
        "58 + 27 = 95",
        "12 x 14 = 168",
        "1 + 1 = 2",
        "9 + 10 = 21"
    ];

    const qA = [
        "True",
        "False",
        "False",
        "True",
        "False",
        "True",
        "False",
        "True",
        "False",
        "False",
        "True",
        "True",
        "False"
    ];

    var correctAns = 0;
    var question = 0;

    TRUE.addEventListener("click", tBtnClick);
    FALSE.addEventListener("click", fBtnClick);

    questionDisplay.textContent = q[question];

    function tBtnClick() {
        if (qA[question] == "True") {
            correctAns++;
            question++;
            score.textContent = "Score: " + correctAns;
            nextQ();
        } else {
            question++;
            nextQ()
        }
    }

    function fBtnClick() {
        if (qA[question] == "False") {
            correctAns++;
            question++;
            score.textContent = "Score: " + correctAns;
            nextQ();
        } else {
            question++;
            nextQ()
        }
    }

    function nextQ() {
        if (question < q.length) {
            questionDisplay.textContent = q[question];
        } else {
            questionDisplay.textContent = "Your total score was on this quiz was " + correctAns + "/" + q.length;
            score.textContent = "Score: ";
        }
    }
} 

*/