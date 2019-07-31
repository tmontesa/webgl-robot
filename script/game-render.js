//
// game-render.js
// =========
// Includes the necessary WebGL functions to render game-specific objects.
//

//
// Main Render Function
//

function game_render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    UpdateModelTransform(base, mRotateBase);
    UpdateModelTransform(larm, mRotateLArm);
    UpdateModelTransform(uarm, mRotateUArm);
    UpdateModelTransform(sphere, mPositionSphere);
    
    RenderModel(base, gl.TRIANGLES);
    RenderModel(larm, gl.TRIANGLES);
    RenderModel(uarm, gl.TRIANGLES);
    RenderModel(sphere, gl.TRIANGLES);
    RenderModel(base, gl.LINE_STRIP, [1.0, 1.0, 1.0]);
    RenderModel(larm, gl.LINE_STRIP, [1.0, 1.0, 1.0]);
    RenderModel(uarm, gl.LINE_STRIP, [1.0, 1.0, 1.0]);
    RenderModel(sphere, gl.LINE_STRIP, [1.0, 1.0, 1.0]);
}