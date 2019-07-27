function InstanceTransform(translate_x, translate_y, translate_z, rotate_x, rotate_y, rotate_z, scale_x, scale_y, scale_z) {
    var translateXYZ = translate(translate_x, translate_y, translate_z);

    var rotateX = rotate(rotate_x, vec3(1.0, 0.0, 0.0));
    var rotateY = rotate(rotate_y, vec3(0.0, 1.0, 0.0));
    var rotateZ = rotate(rotate_z, vec3(0.0, 0.0, 1.0));
    var rotateXYZ = mult(rotateX, mult(rotateY, rotateZ));

    var scaleXYZ = scalem(scale_x, scale_y, scale_z);

    return mult(translateXYZ, mult(rotateXYZ, scaleXYZ));
}