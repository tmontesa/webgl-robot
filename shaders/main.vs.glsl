/*╗   ██╗███████╗██████╗ ████████╗███████╗██╗  ██╗    ███████╗██╗  ██╗ █████╗ ██████╗ ███████╗██████╗ 
██║   ██║██╔════╝██╔══██╗╚══██╔══╝██╔════╝╚██╗██╔╝    ██╔════╝██║  ██║██╔══██╗██╔══██╗██╔════╝██╔══██╗
██║   ██║█████╗  ██████╔╝   ██║   █████╗   ╚███╔╝     ███████╗███████║███████║██║  ██║█████╗  ██████╔╝
╚██╗ ██╔╝██╔══╝  ██╔══██╗   ██║   ██╔══╝   ██╔██╗     ╚════██║██╔══██║██╔══██║██║  ██║██╔══╝  ██╔══██╗
 ╚████╔╝ ███████╗██║  ██║   ██║   ███████╗██╔╝ ██╗    ███████║██║  ██║██║  ██║██████╔╝███████╗██║  ██║
  ╚═══╝  ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚*/
precision mediump float;

attribute vec3 vPosition;
attribute vec3 vNormal;
attribute vec2 vTexcoord;

uniform mat4 u_mWorld;
uniform mat4 u_mView;
uniform mat4 u_mProj;
uniform mat4 u_mNormal;

varying vec4 fNormal;
varying vec2 fTexcoord;
varying vec4 position;

//
// Main
//

void main() {
  fTexcoord = vTexcoord;

  fNormal = u_mWorld * normalize(u_mNormal * vec4(vNormal, 1.0));
  position =  u_mView * u_mWorld * vec4(vPosition, 1.0);

  gl_Position =  u_mProj * position;
}