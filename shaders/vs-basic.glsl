//
// VERTEX
// SHADER
//

precision mediump float;

attribute vec3 vPosition;
attribute vec3 vNormal;

void main() {
    gl_Position = vec4(vPosition, 1.0);
}