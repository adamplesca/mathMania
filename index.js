//add lives, once lives are gone game ends 
//track total score of player
//generate random math questions, 50/50 on if the answer is false or true
//add time limit per question, so player does the math mentally while also (maybe)
//make jest tests too?

var lives = 3;
var score = 0;

const scoreLabel = document.getElementById("show-score");
const livesLabel = document.getElementById("lives-score");
//const timerLabel = document.getElementById("timer");

const startBtn = document.getElementById("sBtn");
const correctBtn = document.getElementById("cBtn");
const falseBtn = document.getElementById("fBtn");

function startGame() {

    while(lives > 0){

    }

    //lives tracker
    //score tracker 
    //btn tracker

    if (lives <= 0) { 
        document.getElementById("question-con").innerHTML = "You mananged to get: " + score + " math questions right!";
    } 
}

/* function correctFalseChecker(){
    if(){

    }
} */

function questionCreator() {
    var ranNum1 = getRandomInt(100);
    var ranNum2 = getRandomInt(100);

    var symbolGenerator = getRandomInt(4) + 1;
    var correctFalseOdds = getRandomInt(2);
    var falseOffset = getRandomInt(10) + 1;

    var equation;
    var outcome;

    switch (symbolGenerator) {
        case 1: {
            equation = ranNum1 + " + " + ranNum2;
            outcome = ranNum1 + ranNum2;
        }
            break;
        case 2: {
            equation = ranNum1 + " - " + ranNum2;
            outcome = ranNum1 - ranNum2;
        }
            break;
        case 3: {
            equation = ranNum1 + " x " + ranNum2;
            outcome = ranNum1 * ranNum2;
        }
            break;
        case 4: {
            while (ranNum2 === 0 || ranNum1 % ranNum2 !== 0 || ranNum1 < ranNum2) {
                ranNum1 = getRandomInt(100);
                ranNum2 = getRandomInt(100);
            }
            equation = ranNum1 + " ÷ " + ranNum2;
            outcome = ranNum1 / ranNum2;
            
        }
            break;
    }

    if (correctFalseOdds === 0) {
        outcome += falseOffset * (Math.random() < 0.5 ? 1 : -1); // Randomly add or subtract the false offset
    }
    document.getElementById("question-con").innerHTML = equation + " = " + outcome;
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