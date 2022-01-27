// Setup
var level = [];
var color_class = [".green", ".red", ".yellow", ".blue"];
var game_state = true;
var pressed_btn_number = 0;
var round_state = true;

if (game_state == true) {
    $("body").click(startRound);
    game_state = false;
}

function startRound() {
    pressed_btn_number = 0;
    removeEvent();
    setTimeout(nextLevel, 300);
}

function nextLevel() {
    let n = Math.floor(Math.random()*4);
    level.push(color_class[n]);
    $("#title").text(`Level ${level.length}`);
    $(`${level[level.length-1]}`).fadeOut(150);
    // ------------------------------------------------------- Sound effect
    $(`${level[level.length-1]}`).fadeIn(150);
    console.log(level);
    playerTurn();
}

function playerTurn() {
    let pressed_btn = "";
    for (let i=0; i<color_class.length; i++) {
        $(`${color_class[i]}`).click(() => {
            pressed_btn = btnFlash(color_class[i]);
            checkBtn(pressed_btn);
        });
    }
}

function checkBtn(s) {
    console.log(s,pressed_btn_number)
    if (s != level[pressed_btn_number]) {
        gameOver();
    }
    pressed_btn_number += 1;
    if (pressed_btn_number >= level.length) {
        startRound();
    }
}

function btnFlash(btn_class) {
    $(`${btn_class}`).addClass("pressed");
    // ------------------------------------------------------------------------- add sound
    setTimeout(() => {
        $(`${btn_class}`).removeClass("pressed");
    }, 150);
    return btn_class;
}

function gameOver() {
    game_state = false;
    console.log("You Lost");

    removeEvent();
}

function removeEvent() {
    $("body").unbind('click', startRound);
    $(".btn").unbind('click', btnFlash);
    for (let i=0; i<color_class.length; i++) {
        $(`${color_class[i]}`).unbind();
    }
}