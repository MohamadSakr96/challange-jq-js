// Setup
var level = [];
var color_class = [".green", ".red", ".yellow", ".blue"];
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
    let n = Math.floor(Math.random()*4);
    level.push(color_class[n]);
    $("#title").text(`Level ${level.length}`);
    $(`${level[level.length-1]}`).fadeOut();
    $(`${level[level.length-1]}`).fadeIn();
}

function removeEvent() {
    $("body").unbind('click', startGame);
}