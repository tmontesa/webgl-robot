//
// game-update.js
// =========
// Includes the necessary functions in order to calculate game-specific events.
//

//
// Main Update Function
//

var angle_base = 0.0;
var angle_larm = 0.0;
var angle_uarm = 0.0;
var last_angle_base = 0.0;
var last_angle_larm = 0.0;
var last_angle_uarm = 0.0; 
var increase_angle_base = 0.0;
var increase_angle_larm = 0.0;
var increase_angle_uarm = 0.0; 

var sphere_position = {
    x: 0.0,
    y: 0.0
}

var mRotateBase = mat4();
var mRotateLArm = mat4();
var mRotateUArm = mat4();
var mPositionSphere = mat4();

var in_progress = false;
var transition_time_max = 60;
var transition_time = 0;


function game_update_slider() {
    angle_base = Number(document.getElementById("base").value);
    angle_larm = Number(document.getElementById("larm").value);
    angle_uarm = Number(document.getElementById("uarm").value);
}

function game_update_base() {
    mRotateBase = rotate(angle_base, vec3(0.0, 1.0, 0.0)); 
}

function game_update_larm() {
    mRotateLArm = mult(
        mRotateBase,
        translate(0.0, base_height, 0.0),
        
    );

    mRotateLArm = mult(
        mRotateLArm,
        rotate(angle_larm, vec3(0.0, 0.0, 1.0)),
        
    );
}

function game_update_uarm() {
    mRotateUArm = mult(
        mRotateLArm,
        translate(larm_length, 0.0, 0.0),
        
    );

    mRotateUArm = mult(
        mRotateUArm,
        rotate(angle_uarm, vec3(0.0, 0.0, 1.0))      
    );
}

function game_update_sphere() {
    if (!key.MOUSE_1) { return; }
    if (mouse.ABS_X < canvas_offset_x ||
        mouse.ABS_X > canvas_offset_x + canvas.width ||
        mouse.ABS_Y < canvas_offset_y ||
        mouse.ABS_Y > canvas_offset_y + canvas.height) { return; }
    
    // Get relative distance of x,y coords from 0-1.
    var ratio_x = mouse.X/canvas.width;
    var ratio_y = 1.0 - (mouse.Y/canvas.height);

    // Then, by multiplying that with the bounds w,h, then adding by min,
    // you get the position in WebGL coordinates.
    sphere_position.x = ((bounds_size.w) * ratio_x) + bounds.h_min;
    sphere_position.y = ((bounds_size.h) * ratio_y) + bounds.v_min;

    mPositionSphere = InstanceTransform(
        sphere_position.x, sphere_position.y, 0.0,
        0.0, 0.0, 0.0,
        1.0, 1.0, 1.0
    );

    var hyp_angle = Math.acos(
        (sphere_position.x) 
        / 
        sqrt( sq(sphere_position.x) +  sq(sphere_position.y - base_height) )
    );

    angle_larm = hyp_angle - Math.acos(
        ( sq(larm_length) + sq(sphere_position.x) + sq(sphere_position.y - base_height) - sq(uarm_length) ) 
        / 
        ( 2 * larm_length * sqrt( sq(sphere_position.x) + sq(sphere_position.y - base_height) ) )
    );

    angle_uarm = Math.PI - Math.acos(
        ( sq(larm_length) + sq(uarm_length) - sq(sphere_position.x) - sq(sphere_position.y - base_height) )
        /
        ( 2 * larm_length * uarm_length )
    );

    if (Number.isNaN(angle_larm) || Number.isNaN(angle_uarm) || sphere_position.y < base_height) {
        gl.clearColor(0.4, 0.0, 0.0, 1.0);
        angle_larm = 90.0;
        angle_uarm = 0.0;
    } else {
        gl.clearColor(0.2, 0.2, 0.2, 1.0);
        angle_larm = (angle_larm * (180/Math.PI)) % 180;
        angle_uarm = (angle_uarm * (180/Math.PI)) % 180;  
    }

    angle_base = 0.0;
    
    increase_angle_base = angle_base - last_angle_base;
    increase_angle_larm = angle_larm - last_angle_larm;
    increase_angle_uarm = angle_uarm - last_angle_uarm;

    in_progress = true;
    transition_time = 0.0;
}

function game_update_info() {
    document.getElementById("info").innerHTML = `
        Angle Set: (${Math.round(angle_base)}, ${Math.round(angle_larm)}, ${Math.round(angle_uarm)})<br />
        Pointer: (${Math.round(sphere_position.x * 1000) / 1000}, ${Math.round(sphere_position.y * 1000) / 1000})<br />
        In Progress: (${in_progress}, ${transition_time}/${transition_time_max})
    `;
}

function game_update() {
    if (!in_progress) {

        last_angle_base = angle_base;
        last_angle_larm = angle_larm; 
        last_angle_uarm = angle_uarm; 

        game_update_slider();
        game_update_sphere();

    } 
    
    if (in_progress) {
        
        angle_base =  last_angle_base + (increase_angle_base * (transition_time/transition_time_max));
        angle_larm =  last_angle_larm + (increase_angle_larm * (transition_time/transition_time_max));
        angle_uarm =  last_angle_uarm + (increase_angle_uarm * (transition_time/transition_time_max));
        
        document.getElementById("base").value = angle_base;
        document.getElementById("larm").value = angle_larm;
        document.getElementById("uarm").value = angle_uarm;

        transition_time++;
        if (transition_time >= transition_time_max) { in_progress = false; }
        

        
    }

    game_update_base();
    game_update_larm();
    game_update_uarm();

    game_update_info();
    console.log(angle_larm);
}