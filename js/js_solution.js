// Setup
var level = [];
var color_class = ["green", "red", "yellow", "blue"];
var pressed_btn_number = 0;
var clicked_btn = [];


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
    let sound = new Audio(`sounds/${color_class[n]}.mp3`);
    level.push(color_class[n]);
    document.getElementById("title").innerText = `Level ${level.length}`;
    setTimeout(() => {
        document.getElementById(`${color_class[n]}`).style.opacity = 0.5;
    }, 50);
    setTimeout(() => {
        document.getElementById(`${color_class[n]}`).style.opacity = 0;
    }, 100);
    sound.play();
    setTimeout(() => {
        document.getElementById(`${color_class[n]}`).style.opacity = 0.5;
    }, 150);
    setTimeout(() => {
        document.getElementById(`${color_class[n]}`).style.opacity = 1;
    }, 200);
    playerTurn();
}


function playerTurn() {
    document.getElementById("green").addEventListener('click', greenButton);
    document.getElementById("yellow").addEventListener('click', yellowButton);
    document.getElementById("blue").addEventListener('click', blueButton);
    document.getElementById("red").addEventListener('click', redButton);
}

function greenButton() {
    btnFlash("green");
    checkBtn("green");
}

function yellowButton() {
    btnFlash("yellow");
    checkBtn("yellow");
}

function blueButton() {
    btnFlash("blue");
    checkBtn("blue");
}

function redButton() {
    btnFlash("red");
    checkBtn("red");
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

function btnFlash(d) {
    let sound = new Audio(`sounds/${d}.mp3`);
    sound.play();
    document.getElementById(`${d}`).classList.add("pressed");
    setTimeout(() => {
        document.getElementById(`${d}`).classList.remove("pressed");
    }, 150);
    return d;
}

function gameOver() {
    document.getElementById("title").innerText = `Game Over, Press Any Key to Restart`;

    let sound = new Audio(`sounds/wrong.mp3`);
    sound.play();
    
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
    document.getElementById("green").removeEventListener('click', greenButton);
    document.getElementById("yellow").removeEventListener('click', yellowButton);
    document.getElementById("blue").removeEventListener('click', blueButton);
    document.getElementById("red").removeEventListener('click', redButton);
}