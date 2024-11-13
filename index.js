//make functionn that displays text total time once game is complete
//make harder digit offset so you can't guess based off last digit

var lives;
var score;
var levelChoosen; //level

var correctAnswer; 
var isCorrectAnswer; 

let countDownTime; // countdown for game

var stopwatchTimer = 0;
var secondTimeHolder = 0; // Starts from 0 seconds
var minTimeHolder = 0;
var hourTimeHolder = 0;

let questionTimer; // holds interval for the question timer

const scoreLabel = document.getElementById("show-score");
const livesLabel = document.getElementById("lives-score");
const timerLabel = document.getElementById("timer");
const rulesLabel = document.getElementById("rules");

const questionContainer = document.getElementById("question-con");

const startBtn = document.getElementById("sBtn");
const correctBtn = document.getElementById("cBtn");
const falseBtn = document.getElementById("fBtn");

correctBtn.disabled = true;
falseBtn.disabled = true;

correctBtn.addEventListener("click", function() { questionValidator(true); });
falseBtn.addEventListener("click", function() { questionValidator(false); });

document.getElementById("level").addEventListener("change", difficultyLevel);

function startGame() {
    correctBtn.disabled = false;
    falseBtn.disabled = false;
    questionContainer.style.fontSize = '4rem';
    lives = 3;
    score = 0;
    totalTimeTracker(); //starts total timer
    difficultyLevel(); //gets diff level player chose
    updateScoreLives();
    questionCreator(); // generate question and start timer
    level.disabled = true;
}

function difficultyLevel(){
    const level = document.getElementById("level").value; // get the selected value
    switch(level){
        case "easy" : 
            levelChoosen = "easy";
            break;
        case "medium" : 
            levelChoosen = "medium";
            break;
        case "hard" : 
            levelChoosen = "hard";
            break;
        default : 
            console.log("Level chooser not working");
            break;
    }   
}

function updateTimer(){
    const countDownseconds = countDownTime < 10 ? '0' + countDownTime : countDownTime;
    timerLabel.innerHTML = `Timer: 00:${countDownseconds}`;
    countDownTime--;

    if(countDownTime < 0){
        lives--;
        if (lives <= 0) {
            endGame();
        } else {
            updateScoreLives();
            questionCreator();
        }
    }
}

function totalTimeTracker(){
    stopwatchTimer = setInterval(() => {
        secondTimeHolder++;
        if(secondTimeHolder == 60){
            minTimeHolder++;
            secondTimeHolder = 0;
        }
        if(minTimeHolder == 60){
            hourTimeHolder++;
            minTimeHolder = 0;
        }
    },  1000);
    
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

function questionCreator() {
    clearInterval(questionTimer); // stop old timer

    var ranNum1;
    var ranNum2;
    var symbolGenerator;

    switch(levelChoosen){
        case "easy" : 
            countDownTime = 30;
            ranNum1 = getRandomInt(20) + 1;
            ranNum2 = getRandomInt(20) + 1;
            symbolGenerator = getRandomInt(2) + 1;
            break;
        case "medium" : 
            countDownTime = 20;
            ranNum1 = getRandomInt(25) + 1;
            ranNum2 = getRandomInt(25) + 1;
            symbolGenerator = getRandomInt(3) + 1;
            break;
        case "hard" : 
            countDownTime = 10;
            ranNum1 = getRandomInt(30) + 1;
            ranNum2 = getRandomInt(30) + 1;
            symbolGenerator = getRandomInt(4) + 1;
            break;
        default : console.log("THIS SHIT NOT WORKING");
            break;
    }
    
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
                ranNum1 = getRandomInt(20);
                ranNum2 = getRandomInt(20);
            }
            equation = `${ranNum1} ÷ ${ranNum2}`;
            outcome = ranNum1 / ranNum2;
            break;
    }

    correctAnswer = outcome;

    if (correctFalseOdds === 0) {
        outcome += falseOffset * Math.floor((Math.random() < 0.5 ? 1.5 : -1.5)) + 1;
        isCorrectAnswer = false; // random generated equation is incorrect by small offset
    } else {
        isCorrectAnswer = true; // random generated equation is correct
    }

    questionContainer.innerHTML = equation + " = " + outcome;

    // starts timer for the new q
    questionTimer = setInterval(updateTimer, 1000); //clock speed
}

function updateScoreLives() {
    scoreLabel.textContent = `Score: ${score}`;
    livesLabel.textContent = `Lives: ${lives}`;
}

function endGame() {
    clearInterval(questionTimer); // stops timer
    clearInterval(stopwatchTimer); //gets total time played
    timerLabel.textContent = `Timer: 00:00`
    livesLabel.textContent = `Lives: ${lives}`;

    questionContainer.innerHTML = `You got: ${score} questions correct in "${hourTimeHolder}hrs ${minTimeHolder}mins ${secondTimeHolder}s"`;
    correctBtn.disabled = true;
    falseBtn.disabled = true;
    level.disabled = false;
    secondTimeHolder = 0;
    minTimeHolder = 0;
    hourTimeHolder = 0;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//game info for user
function showInfo() {
    questionContainer.style.fontSize = '1rem';
    questionContainer.innerHTML = `
    <div style="display: flex; flex-direction: column;">
        Random Maths equations will show on screen. Decide if they are correct or incorrect. Press "Correct" if the equation is right, or "Incorrect" if not.
        <br><br> 
        <strong>GAME RULES:</strong>
        <p>For each correct answer, you gain a point.</p>
        <p>If you are wrong or time runs out, you lose a life.</p>
        <p>The game ends when you lose all your lives.</p>
        <br>
        <strong>DIFFICULTY LEVELS:</strong>
        <p>Easy: 30s per question, [+ , -]</p>
        <p>Medi: 20s per question, [+ , - , x]</p>
        <p>Hard: 10s per question, [+ , - , x , ÷] </p>
        <br>
        <p>Try to get the highest score possible. Have fun!</p>
    </div>
    `;
}
function hideInfo() {
    questionContainer.style.fontSize = '4rem';
    questionContainer.innerHTML = 'Press "Start Game" to play!'; 
}
rulesLabel.addEventListener("mouseenter", showInfo); 
rulesLabel.addEventListener("mouseleave", hideInfo); 
