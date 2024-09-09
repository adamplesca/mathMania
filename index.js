//make a difficulty eg easy (randomises nums till a certain num, bigger time frame to complete mental math have only add + sub) etc
//have diff mode where its a countdown but still with the lives

var lives = 3;
var score = 0;
var correctAnswer; 
var isCorrectAnswer; 
let time = 10; // 10 sec countdown
let questionTimer; // holds interval for the question timer

const scoreLabel = document.getElementById("show-score");
const livesLabel = document.getElementById("lives-score");
const timerLabel = document.getElementById("timer");
const rulesLabel = document.getElementById("rules");
const questionContainer = document.getElementById("question-con");

const startBtn = document.getElementById("sBtn");
const correctBtn = document.getElementById("cBtn");
const falseBtn = document.getElementById("fBtn");

correctBtn.addEventListener("click", function() { questionValidator(true); });
falseBtn.addEventListener("click", function() { questionValidator(false); });

function updateTimer(){
    const seconds = time < 10 ? '0' + time : time;
    timerLabel.innerHTML = `Timer: 00:${seconds}`;
    time--;

    if(time < 0){
        lives--;
        if (lives <= 0) {
            endGame();
        } else {
            updateScoreLives();
            questionCreator();
        }
    }
}

function questionValidator(answer) {
    clearInterval(questionTimer); // stops current timer
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
    questionContainer.style.fontSize = '4rem';
    lives = 3;
    score = 0;
    updateScoreLives();
    questionCreator(); // generate question and start timer
}

function questionCreator() {
    clearInterval(questionTimer); // stop old timers
    time = 10; // resets time to 10 sec for every q
    
    var ranNum1 = getRandomInt(20);
    var ranNum2 = getRandomInt(20);
    var symbolGenerator = getRandomInt(1) + 1;
    var correctFalseOdds = getRandomInt(2);
    var falseOffset = getRandomInt(10) + 1;

    var equation;
    var outcome;

    switch (symbolGenerator) {
        case 3:
            equation = `${ranNum1} + ${ranNum2}`;
            outcome = ranNum1 + ranNum2;
            break;
        case 2:
            equation = `${ranNum1} - ${ranNum2}`;
            outcome = ranNum1 - ranNum2;
            break;
        case 1:
            equation = `${ranNum1} x ${ranNum2}`;
            outcome = ranNum1 * ranNum2;
            break;
        case 4:
            while (ranNum2 === 0 || ranNum1 % ranNum2 !== 0 || ranNum1 < ranNum2) {
                ranNum1 = getRandomInt(20);
                ranNum2 = getRandomInt(20);
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

    // starts timer for the new q
    questionTimer = setInterval(updateTimer, 1000);
}

function updateScoreLives() {
    scoreLabel.textContent = `Score: ${score}`;
    livesLabel.textContent = `Lives: ${lives}`;
}

function endGame() {
    clearInterval(questionTimer); // stops timer
    timerLabel.textContent = `Timer: 00:00`
    livesLabel.textContent = `Lives: ${lives}`;

    questionContainer.innerHTML = "You got: " + score + " questions correct";
    correctBtn.disabled = true;
    falseBtn.disabled = true;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function info(){
    questionContainer.style.fontSize = '1rem';
    questionContainer.innerHTML = 
    `
    A random math equation will generate either being RIGHT or WRONG, if you believe the equation is correct press "Correct", else press "False".
    <br> 
    <br>
    If you deduce the answer correctly before the timer runs out. You will get a point for being correct, if not a life will be deducted.
    <br> 
    <br>
    If the timer hits 00:00 you will lose a life & if you run out of lives the game ends.
    <br> 
    <br> 
    Your goal is to get as many questions correct before you run out of lives. 
    <br> 
    <br> 
    Good luck and have Fun!
    `;
}

startBtn.addEventListener("click", startGame);