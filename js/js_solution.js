// Setup
var level = [];
var color_class = ["green", "red", "yellow", "blue"];
var pressed_btn_number = 0;


window.onload = () => {
    startGame();
}
    
function startGame(){
    document.getElementsByTagName("body")[0].addEventListener('click', startRound); 
    document.getElementsByTagName("body")[0].addEventListener('keydown', startRound); 
    document.getElementsByTagName("body")[0].removeEventListener('click', startGame);
    document.getElementsByTagName("body")[0].removeEventListener('keydown', startGame);
}
    
function startRound() {
    pressed_btn_number = 0;
    removeEvent();
    setTimeout(nextLevel, 300);
}

function nextLevel() {
    let n = Math.floor(Math.random()*4);
    level.push(color_class[n]);
    document.getElementById("title").innerText = `Level ${level.length}`;
    // ---------------------------------------------------------- add sound
    setTimeout(() => {
        document.getElementById(`${color_class[n]}`).style.opacity = 0.5;
    }, 50);
    setTimeout(() => {
        document.getElementById(`${color_class[n]}`).style.opacity = 0;
    }, 100);
    setTimeout(() => {
        document.getElementById(`${color_class[n]}`).style.opacity = 0.5;
    }, 150);
    setTimeout(() => {
        document.getElementById(`${color_class[n]}`).style.opacity = 1;
    }, 200);
    playerTurn();
}

function playerTurn() {
    let pressed_btn = "";
    for (let i=0; i<color_class.length; i++) {
        $(`.${color_class[i]}`).click(() => {         // I need this jquery for my code to work...
            pressed_btn = btnFlash(color_class[i]);
            checkBtn(pressed_btn);
        });
    }
}

function checkBtn(s) {
    if (s != level[pressed_btn_number]) {
        gameOver();
    }else {
        pressed_btn_number += 1;
        if (pressed_btn_number >= level.length) {
            startRound();
        }
    }
}

function btnFlash(btn_class) {
    // ------------------------------------------------------------------------- add sound
    document.getElementById(`${btn_class}`).classList.add("pressed");
    setTimeout(() => {
        document.getElementById(`${btn_class}`).classList.remove("pressed");
    }, 150);
    return btn_class;
}

function gameOver() {
    document.getElementById("title").innerText = `Game Over, Press Any Key to Restart`;

    // ------------------------------------------------------------------------- add sound
    
    document.getElementsByTagName("body")[0].classList.add("game-over");
    setTimeout(() => {
        document.getElementsByTagName("body")[0].classList.remove("game-over");
    }, 150);

    level = [];
    removeEvent();

    document.getElementsByTagName("body")[0].addEventListener('click', startGame); 
    document.getElementsByTagName("body")[0].addEventListener('keydown', startGame); 
}

function removeEvent() {

    document.getElementsByTagName("body")[0].removeEventListener('click', startRound); 
    document.getElementsByTagName("body")[0].removeEventListener('keydown', startRound); 
    
    for (let i=0; i<color_class.length; i++) {
        $(`.${color_class[i]}`).unbind();
    }
}