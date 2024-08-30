//fix bug where is num * 0 = 0 (which is correct) is flagged as false
//make a difficulty eg easy (randomises nums till a certain num, bigger time frame to complete mental math have only add + sub) etc
//make timer for game
//maybe improve gui + add html page of game info or some small add box
//add jest tests maybe

var lives = 3;
var score = 0;
var correctAnswer; 
var isCorrectAnswer; 

const scoreLabel = document.getElementById("show-score");
const livesLabel = document.getElementById("lives-score");
const questionContainer = document.getElementById("question-con");

const startBtn = document.getElementById("sBtn");
const correctBtn = document.getElementById("cBtn");
const falseBtn = document.getElementById("fBtn");

correctBtn.addEventListener("click", function() { questionValidator(true); });
falseBtn.addEventListener("click", function() { questionValidator(false); });

function questionValidator(answer) {
    if (answer === isCorrectAnswer) {
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

function startGame() {
    correctBtn.disabled = false;
    falseBtn.disabled = false;
    lives = 3;
    score = 0;
    updateScoreLives();
    questionCreator();
}

//generates 2 random nums + random arithmetic op, also randomises if the sum is true or false
function questionCreator() {
    var ranNum1 = getRandomInt(50);
    var ranNum2 = getRandomInt(50);
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
                ranNum1 = getRandomInt(50);
                ranNum2 = getRandomInt(50);
            }
            equation = `${ranNum1} ÷ ${ranNum2}`;
            outcome = ranNum1 / ranNum2;
            break;
    }

    correctAnswer = outcome;

    if (correctFalseOdds === 0) {
        outcome += falseOffset * (Math.random() < 0.5 ? 1 : -1);
        isCorrectAnswer = false; // random generated equation is incorrect
    } else {
        isCorrectAnswer = true; // random generated equation is correct
    }

    questionContainer.innerHTML = equation + " = " + outcome;
}

function updateScoreLives() {
    scoreLabel.textContent = `Score: ${score}`;
    livesLabel.textContent = `Lives: ${lives}`;
}

function endGame() {
    livesLabel.textContent = `Lives: ${lives}`;
    questionContainer.innerHTML = "You managed to get: " + score + " math questions right!";
    correctBtn.disabled = true;
    falseBtn.disabled = true;
}

//gets random number created for math question
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

startBtn.addEventListener("click", startGame);