//JS file to add functionality to the 'index.html' file.

let gameSeq = []; //stores a sequence of buttons, which are flashing in the game, in an order.
let userSeq = []; //stores a sequence of buttons, clicked by the user, in an order. 

let gameStarted = false; //stores true, if the game is started, else false.
let lvl = 0; //stores the level of the game

document.addEventListener("keypress", function () {
    if (gameStarted == false) {
        console.log("GAME STARTED!");
        gameStarted = true;
        setTimeout(function () {
            levelUp();
            let btn = selectRandomBtn();
            gameFlash(btn);
            console.log(gameSeq);
        }, 500);
    }
}); //means, as the event is triggered, then the game gets started, if it is not. The 
//level gets updated, and a random button will flash, which will be the first 
//button of the game sequence.

let h2 = document.querySelector("h2");
function levelUp() { //function to level up the game
    lvl++;
    h2.textContent = `Level ${lvl}`;
}

let btns = document.querySelectorAll(".btn");
function selectRandomBtn() { //function to selects a random button among 4 buttons.
    let randIdx = Math.floor(Math.random() * 4);
    let randBtn = btns[randIdx];
    gameSeq.push(randBtn);
    return randBtn;
};

function gameFlash(btn) { //function to flash the button, by the game or program.
    btn.classList.add("gameFlash");
    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 200);
}

function userFlash(btn) { //function to flash the button, when the user clicks the button
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 200);
}

for (btn of btns) { //loop to define 'click' event for all buttons.
    btn.addEventListener("click", btnPress);
}

let userBtnIdx = 0; //stores the idx of button, which is clicked by the user, in the userSeq[]. 
function btnPress(event) { //function that performs operations, when a button is clicked.
    if (gameStarted == true) {
        let btn = event.target; //stores the button that triggered the event
        userFlash(btn);
        userSeq.push(btn);
        checkAns();
    }
}

function checkAns() { //function that checks that userSeq == gameSeq, or not.
    let idx = userBtnIdx;
    if (userSeq[idx] === gameSeq[idx] && userSeq.length == gameSeq.length) {
        setTimeout(function () {
            levelUp();
            gameFlash(selectRandomBtn());
            console.log(gameSeq);
        }, 700);
        userSeq = [];
        userBtnIdx = 0;
    }
    else if (userSeq[idx] === gameSeq[idx] && userSeq.length < gameSeq.length) {
        userBtnIdx++;
    }
    else if (userSeq[idx] != gameSeq[idx]) {
        h2.innerHTML = `GAME OVER! Your score is <b>${lvl}<b>. <br>Press any key to restart.`;
        gameOver_Flash();
        updateHighScore(lvl);
        gameReset();
    }
}

function gameReset() {
    gameStarted = false;
    lvl = 0;
    gameSeq = []; //delete all buttons from the array
    userSeq = []; //empty all buttons from the array
    userBtnIdx = 0;
}

function gameOver_Flash() { //function to flash the document when the game is over.
    let body = document.querySelector("body");
    body.classList.add("gameOver-Flash");
    setTimeout(function () {
        body.classList.remove("gameOver-Flash");
    }, 150);
}

let highestScore = 0;
function updateHighScore(lvl) {
    if (lvl > highestScore) {
        highestScore = lvl;
        document.querySelector("#highScore").textContent = `✨Highest Score: ${highestScore}`;
    }
}