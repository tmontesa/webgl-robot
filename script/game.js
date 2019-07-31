//
// game.js
// =========
// Initializes game-specific objects, constants, and functions that will be used outside of 
// rendering and game updates.
//

// Create listeners for keyboard & mouse input.
document.addEventListener("keydown", handlerKeyDown, false);
document.addEventListener("keyup", handlerKeyUp, false);
document.addEventListener("mousedown", handlerMouseDown, false);
document.addEventListener("mouseup", handlerMouseUp, false);
document.addEventListener("mousemove", handlerMousePosition, false);
canvas_offset_x = document.getElementById("game").offsetLeft;
canvas_offset_y = document.getElementById("game").offsetTop;

//
// Game Loop
//

function game_loop() {
    game_update();
    game_render();
}