//
// webgl/buffer.js
// =========
// A more abstract version of WebGL's buffers, with helper functions.
//


//
// GLBuffer Object
//

function GLBuffer(shader_program, buffer, buffer_type, attributes) {
    this.shader_program = shader_program;
    this.buffer = buffer;
    this.buffer_type = buffer_type;
    this.attributes = attributes;
}

//
// GLBuffer Constructor
//

function GLCreateBuffer(shader_program, buffer_type, attributes = []) {
    var buffer = new GLBuffer(shader_program, 
        gl.createBuffer(), buffer_type, attributes);
    return buffer;
}

// 
// GLBuffer Functions
//

function GLEnableBuffer(buffer, data) {
    gl.useProgram(buffer.shader_program);
    gl.bindBuffer(buffer.buffer_type, buffer.buffer);

    if (data != null) {
        gl.bufferData(buffer.buffer_type, data, gl.STATIC_DRAW);
    } 

    if (buffer.attributes.length > 0) {
        GLEnableAttributes(buffer.attributes);
    }

    
}