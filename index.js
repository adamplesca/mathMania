//make into a chrome extension, thats online 
//maybe add leaderboard and so users can save their topscores if they like 
    //add second timer for total time played liek speedrunning scroes etc, track difficulty and and user name ( prompt user after game if they want to save it)
//disabled startbtn when game is playing so you cant just restart and reenambled it 
//config info for user in visual way

var lives = 3;
var score = 0;
var levelChoosen; //level
var correctAnswer; 
var isCorrectAnswer; 
let time; // countdown for game
let questionTimer; // holds interval for the question timer

const scoreLabel = document.getElementById("show-score");
const livesLabel = document.getElementById("lives-score");
const timerLabel = document.getElementById("timer");
const rulesLabel = document.getElementById("rules");
const questionContainer = document.getElementById("question-con");

document.getElementById("level").addEventListener("change", difficultyLevel);

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
    difficultyLevel(); //gets diff level player chose
    updateScoreLives();
    questionCreator(); // generate question and start timer
    level.disabled = true;
}

function questionCreator() {
    clearInterval(questionTimer); // stop old timers

    var ranNum1;
    var ranNum2;
    var symbolGenerator;

    switch(levelChoosen){
        case "easy" : 
            time = 20;
            ranNum1 = getRandomInt(200) + 1;
            ranNum2 = getRandomInt(200) + 1;
            symbolGenerator = getRandomInt(2) + 1;
            break;
        case "medium" : 
            time = 10;
            ranNum1 = getRandomInt(20) + 1;
            ranNum2 = getRandomInt(20) + 1;
            symbolGenerator = getRandomInt(3) + 1;
            break;
        case "hard" : 
            time = 5;
            ranNum1 = getRandomInt(25) + 1;
            ranNum2 = getRandomInt(25) + 1;
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
        outcome += falseOffset * (Math.random() < 0.5 ? 1 : -1);
        isCorrectAnswer = false; // random generated equation is incorrect
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
    timerLabel.textContent = `Timer: 00:00`
    livesLabel.textContent = `Lives: ${lives}`;

    questionContainer.innerHTML = "You got: " + score + " questions correct";
    correctBtn.disabled = true;
    falseBtn.disabled = true;
    level.disabled = false;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//info for user
function showInfo() {
    questionContainer.style.fontSize = '0.5rem';
    questionContainer.innerHTML = 
    `
    Welcome to the Math Challenge Game!
    <br><br>
    In this game, you will be presented with a random math equation, which could be correct or incorrect. Your task is to decide whether the equation is right or wrong.
    <br><br>
    Press "Correct" if you think the equation is right, or "False" if it's wrong.
    <br><br>
    For every correct answer, you gain a point. But if you're wrong or if the timer runs out, you lose a life. The game ends when you run out of lives.
    <br><br>
    <strong>Difficulty Levels:</strong>
    <ul>
        <li><strong>Easy:</strong> More time and larger numbers.</li>
        <li><strong>Medium:</strong> Less time with smaller numbers and more complex equations.</li>
        <li><strong>Hard:</strong> Minimal time with tricky equations and tougher challenges.</li>
    </ul>
    Try to get the highest score possible!
    <br><br>
    Good luck and have fun!
    `;
}
function hideInfo() {
    questionContainer.style.fontSize = '4rem';
    questionContainer.innerHTML = 'Press "Start Game" to play!'; 
}
rulesLabel.addEventListener("mouseenter", showInfo); 
rulesLabel.addEventListener("mouseleave", hideInfo); 