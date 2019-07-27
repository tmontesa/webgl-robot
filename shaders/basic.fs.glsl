precision mediump float;

varying vec4 fNormal;

void main()
{
    gl_FragColor = vec4(fNormal.xyz, 1.0);
}