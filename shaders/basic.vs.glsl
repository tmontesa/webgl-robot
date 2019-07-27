attribute vec3 vPosition;
attribute vec3 vNormal;

uniform mat4 u_mWorld;
uniform mat4 u_mView;
uniform mat4 u_mProj;

varying vec4 fNormal;

void main()
{
    fNormal = vec4(vNormal, 1.0);
    gl_Position =  u_mProj * u_mView * u_mWorld * vec4(vPosition, 1.0);
}