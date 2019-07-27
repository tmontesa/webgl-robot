/*█████╗██████╗  █████╗  ██████╗ ███╗   ███╗███████╗███╗   ██╗████████╗    ███████╗██╗  ██╗ █████╗ ██████╗ ███████╗██████╗ 
██╔════╝██╔══██╗██╔══██╗██╔════╝ ████╗ ████║██╔════╝████╗  ██║╚══██╔══╝    ██╔════╝██║  ██║██╔══██╗██╔══██╗██╔════╝██╔══██╗
█████╗  ██████╔╝███████║██║  ███╗██╔████╔██║█████╗  ██╔██╗ ██║   ██║       ███████╗███████║███████║██║  ██║█████╗  ██████╔╝
██╔══╝  ██╔══██╗██╔══██║██║   ██║██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║       ╚════██║██╔══██║██╔══██║██║  ██║██╔══╝  ██╔══██╗
██║     ██║  ██║██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗██║ ╚████║   ██║       ███████║██║  ██║██║  ██║██████╔╝███████╗██║  ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚*/
precision mediump float;

//
// Fragment Vectors Calculation
//

vec3 CalculateLightPosition(mat4 mView, mat4 mWorld, vec3 default_light_pos) {
    return (mView * mWorld * vec4(default_light_pos, 1.0)).xyz;
}

vec3 CalculateNormalVector(vec3 normal) {
    return normalize(normal);
}

vec3 CalculateViewVector(vec3 at, vec3 pos) {
    return normalize(at - pos);
}

vec3 CalculateLightVector(vec3 light_pos, vec3 pos) {
    return normalize(light_pos - pos);
}

vec3 CalculateRelfectionVector(vec3 light_vector, vec3 normal_vector) {
    return normalize(reflect(-light_vector, normal_vector));
}

//
// Spotlight-Specific Calculation

vec3 CaclulateLightDirectionVector(mat4 mView, mat4 mWorld, vec4 at, vec3 light_pos) {
    return normalize(mView * mWorld * vec4(at.xyz - light_pos, 1.0)).xyz;
}

float CalculateAngle(vec3 light_vector, vec3 light_direction_vector) {
    return acos(dot(-light_vector, light_direction_vector));
}

//
// Lighting Functions
//

struct LightIntensity {
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

struct PointLight {
    vec3 position;
    LightIntensity intensity;
};

struct SpotLight {
    vec3 position;
    vec3 at;
    float in_angle;
    float out_angle;
    LightIntensity intensity;
};

struct MaterialReflection {
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

vec3 ambient(vec3 ref_a, vec3 i_a) {
    return ref_a * i_a;
}

vec3 diffuse(vec3 ref_d, vec3 i_d, vec3 n, vec3 l) {
    return ref_d * i_d * clamp(dot(n, l), 0.0, 1.0) ;
}

vec3 specular(vec3 ref_s, vec3 i_s, vec3 r, vec3 v, float shine) {
    return ref_s * i_s * pow(clamp(dot(r, v), 0.0 , 1.0), shine);
}


vec3 phong(MaterialReflection ref, LightIntensity i, vec3 n, vec3 v, vec3 l, vec3 r, float shine) {
    vec3 a = ambient(ref.ambient, i.ambient);
    vec3 d = diffuse(ref.diffuse, i.diffuse, n, l);
    vec3 s = specular(ref.specular, i.specular, r, v, shine);
    return a + d + s;
}

//
// Variables
//

// Varying
varying vec4 fNormal;
varying vec2 fTexcoord;
varying vec4 position;

// Uniform
uniform mat4 u_mWorld;
uniform mat4 u_mView;
uniform mat4 u_mProj;
uniform sampler2D u_sampler;

uniform PointLight point_light;
uniform MaterialReflection u_material_reflection;

//
// Main
//

void main() {
    
    // TEST TEST TEST
    vec3 color = vec3(0.5, 0.5, 0.5);

    // Calculate independent fragment vectors.
    vec3 N = CalculateNormalVector(fNormal.xyz);
    vec3 V = CalculateViewVector(vec3(0.0, 0.0, 0.0), position.xyz);

    // Calculate light-dependent fragment vectors.
    vec3 Pp = CalculateLightPosition(u_mView, u_mWorld, point_light.position);
    vec3 Lp = CalculateLightVector(Pp, position.xyz);
    vec3 Rp = CalculateRelfectionVector(Lp, N);

    // Calculate intensities.
    vec3 Ip = phong(u_material_reflection, point_light.intensity, N, V, Lp, Rp, 10.0);
    vec3 intensity = clamp(Ip, 0.0, 1.0);

    vec4 texel = texture2D(u_sampler, fTexcoord);
    gl_FragColor = vec4(texel.rgb * intensity, texel.a);
}