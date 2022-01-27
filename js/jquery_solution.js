// Setup
var level = [];
var color_class = ["green", "red", "yellow", "blue"];
var pressed_btn_number = 0;


$(document).ready(() => {
    startGame();
});
    
function startGame(){
    $("body").click(startRound);
    $("body").keydown(startRound);
    $("body").unbind("click",startGame);
    $("body").unbind("keydown",startGame);
}
    
function startRound() {
    pressed_btn_number = 0;
    removeEvent();
    setTimeout(nextLevel, 300);
}

function nextLevel() {
    let n = Math.floor(Math.random()*4);
    level.push(color_class[n]);
    let sound = new Audio(`sounds/${color_class[n]}.mp3`);
    sound.play();
    $("#title").text(`Level ${level.length}`);
    $(`.${color_class[n]}`).fadeOut(150);
    $(`.${color_class[n]}`).fadeIn(150);
    playerTurn();
}

function playerTurn() {
    let pressed_btn = "";
    for (let i=0; i<color_class.length; i++) {
        $(`.${color_class[i]}`).click(() => {
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
    let sound = new Audio(`sounds/${btn_class}.mp3`);
    sound.play();
    $(`.${btn_class}`).addClass("pressed");
    setTimeout(() => {
        $(`.${btn_class}`).removeClass("pressed");
    }, 150);
    return btn_class;
}

function gameOver() {
    $("#title").text(`Game Over, Press Any Key to Restart`);
    $("body").addClass("game-over");

    let sound = new Audio(`sounds/wrong.mp3`);
    sound.play();

    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 150);
    level = [];
    removeEvent();
    $("body").click(startGame);
    $("body").keydown(startGame);
}

function removeEvent() {
    $("body").unbind('click', startRound);
    $("body").unbind('keydown', startRound);
    $(".btn").unbind('click', btnFlash);
    for (let i=0; i<color_class.length; i++) {
        $(`.${color_class[i]}`).unbind();
    }
}