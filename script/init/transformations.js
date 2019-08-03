//
// init/transformations.js
// =========
// Contains global varaibles, and initialization for projection and model-view matrices.
//

var u_mWorld, u_mView, u_mProj, u_mNormal;

const bounds = {
    h_min: -4.0,
    h_max: 4.0,
    v_min: -3.5,
    v_max: 4.5,
}

const bounds_size = {
    w: bounds.h_max - bounds.h_min,
    h: bounds.v_max - bounds.v_min
}

function init_transformations() {
    u_mWorld = GLCreateUniform(GLUniformType.MATRIX, program, "u_mWorld", flatten(mat4()));

    u_mView = GLCreateUniform(GLUniformType.MATRIX, program, "u_mView", flatten(
        lookAt(
            vec3(0.0, 0.0, 4.0),   
            vec3(0.0, 0.0, 0.0),
            vec3(0.0, 1.0, 0.0)
        )
    ));

    u_mProj = GLCreateUniform(GLUniformType.MATRIX, program, "u_mProj", flatten(
        ortho( //left, right, bottom, top, near, far
            bounds.h_min, bounds.h_max,
            bounds.v_min, bounds.v_max,
            0.1, 100.0
        )
    ));

    u_mNormal = GLCreateUniform(GLUniformType.MATRIX, program, "u_mNormal", flatten(mat4()));
}