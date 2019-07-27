//
// GLUniform Object
//

var GLUniformType = {
    "VECTOR":   0,
    "MATRIX":   1
}

function GLUniform(type, location) {
    this.type = type;
    this.location = location;
}

//
// GLUniform Constructor
//

function GLCreateUniform(type, shader_program, shader_location, data) {
    var uniform = new GLUniform(type,
        gl.getUniformLocation(shader_program, shader_location));
    
    if (data != null) {
        GLUpdateUniform(uniform, data);
    }
    
    return uniform;
}

//
// GLUniform Functions
//

function GLUpdateUniform(uniform, data) {
    if (!(uniform instanceof GLUniform)) {
        console.error(`Uniform given is invalid.`);
        return;
    }

    if (uniform.type == GLUniformType.VECTOR) {     
        if (data.length < 1 || data.length > 4) {
            console.error(`Uniform (vector) data has invalid length of ${data.length}.`);
        } else if (data.length == 1) {
            gl.uniform1fv(uniform.location, data);
        } else if (data.length == 2) {
            gl.uniform2fv(uniform.location, data);
        } else if (data.length == 3) {
            gl.uniform3fv(uniform.location, data);
        } else if (data.length == 4) {
            gl.uniform4fv(uniform.location, data);
        } else {
            console.error(`Uniform (vector) data is invalid.`);
        }
    
    } else if (uniform.type == GLUniformType.MATRIX) {
        if (data.length < 2 * 2 || data.length > 4 * 4) {
            console.error(`Uniform (matrix) data has invalid length of ${data.length}.`);
        } else if (data.length == 2 * 2) {
            gl.uniformMatrix2fv(uniform.location, false, data);
        } else if (data.length == 3 * 3) {
            gl.uniformMatrix3fv(uniform.location, false, data);
        } else if (data.length == 4 * 4) {
            gl.uniformMatrix4fv(uniform.location, false, data);
        } else {
            console.error(`Uniform (matrix) data is invalid.`);
        }

    } else {
        console.error(`Uniform type is invalid.`);
    }
}

function GLUpdateUniforms(uniforms, datas) {
    if (uniforms.length <= 0) {
        console.error(`No attributes are given.`);
        return;
    } else if (datas.length <= 0) {
        console.error(`No datas are given.`);
        return;
    } else if (uniforms.length != datas.length) {
        console.error(`Uniforms length and datas length not equal.`);
        return;
    }

    for (var i = 0; i < uniforms.length; i++) {
        GLUpdateUniform(uniforms[i], datas[i]);
    }
}