var u_material_reflection_ambient, 
    u_material_reflection_diffuse, 
    u_material_reflection_specular;

var point_light;

function init_lighting() {
    u_material_reflection_ambient = 
        GLCreateUniform(GLUniformType.VECTOR, program, "u_material_reflection.ambient", flatten(vec3(1.0, 1.0, 1.0)));
    u_material_reflection_diffuse = 
        GLCreateUniform(GLUniformType.VECTOR, program, "u_material_reflection.diffuse", flatten(vec3(1.0, 1.0, 1.0)));
    u_material_reflection_specular = 
        GLCreateUniform(GLUniformType.VECTOR, program, "u_material_reflection.specular", flatten(vec3(1.0, 1.0, 1.0)));

    point_light = CreatePointLight(program,
        "point_light.position", vec3(-11.0, 9.0, -29.0),
        "point_light.intensity.ambient", vec3(0.0, 0.0, 0.0),
        "point_light.intensity.diffuse", vec3(0.9, 0.9, 0.9),
        "point_light.intensity.specular", vec3(0.0, 0.0, 0.0)
    );
}