precision mediump float;

uniform vec3 u_color;

varying vec4 fNormal;

void main()
{
    gl_FragColor = vec4(u_color, 1.0);
}