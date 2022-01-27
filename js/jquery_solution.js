// Setup
var level = [];
var game_state = true;

if (game_state == true) {
    $("body").click(startGame);
    game_state = false;
}

function startGame() {
    removeEvent();
    nextLevel();
    
}

function nextLevel() {
    level.push(Math.floor(Math.random()*4)+1);
    $("#title").text(`Level ${level.length}`);
}

function removeEvent() {
    $("body").unbind('click', startGame);
}