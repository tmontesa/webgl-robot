//
// Material Reflection
//

function MaterialReflection(ambient, diffuse, specular, shine) {
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.shine = shine;
}

function CreateMaterialReflection(a, d, s, shine) {
    return new MaterialReflection(
        flatten(vec3(a, a, a)),
        flatten(vec3(d, d, d)),
        flatten(vec3(s, s, s)),
        shine
    )
}

function EnableMaterialReflection(material_reflection) {
    GLUpdateUniform(u_material_reflection_ambient, material_reflection.ambient);
    GLUpdateUniform(u_material_reflection_diffuse, material_reflection.diffuse);
    GLUpdateUniform(u_material_reflection_specular, material_reflection.specular);
}

//
// Point Light
//

function PointLight(position, ambient, diffuse, specular, location) {
    this.position = position;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.location = location;
}

function PointLightLocation(position_location, ambient_location, diffuse_location, specular_location) {
    this.position_location = position_location;
    this.ambient_location = ambient_location;
    this.diffuse_location = diffuse_location;
    this.specular_location = specular_location; 
}

function CreatePointLight(shader_program,
    position_shader_location,   position, 
    ambient_shader_location,    ambient, 
    diffuse_shader_location,    diffuse, 
    specular_shader_location,   specular) {
    
    return new PointLight(position, ambient, diffuse, specular,
        new PointLightLocation (
            GLCreateUniform(GLUniformType.VECTOR, shader_program, position_shader_location, flatten(position)),
            GLCreateUniform(GLUniformType.VECTOR, shader_program, ambient_shader_location,  flatten(ambient)),
            GLCreateUniform(GLUniformType.VECTOR, shader_program, diffuse_shader_location,  flatten(diffuse)),
            GLCreateUniform(GLUniformType.VECTOR, shader_program, specular_shader_location, flatten(specular))
        )
    );
}

//
// Spot Light
//

function SpotLight(position, at, in_angle, out_angle, ambient, diffuse, specular, location) {
    this.position = position;
    this.at = at;
    this.in_angle = in_angle;
    this.out_angle = out_angle;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.location = location;
}

function SpotLightLocation(position_location, at_location, in_angle_location, out_angle_location, ambient_location, diffuse_location, specular_location) {
    this.position_location = position_location;
    this.at_location = at_location;
    this.in_angle_location = in_angle_location;
    this.out_angle_location = out_angle_location;
    this.ambient_location = ambient_location;
    this.diffuse_location = diffuse_location;
    this.specular_location = specular_location; 
}

function CreateSpotLight(shader_program,
    position_shader_location,   position,
    at_shader_location,         at, 
    in_angle_shader_location,   in_angle, 
    out_angle_shader_location,  out_angle,  
    ambient_shader_location,    ambient, 
    diffuse_shader_location,    diffuse, 
    specular_shader_location,   specular) {
    
    return new SpotLight(position, at, in_angle, out_angle, ambient, diffuse, specular,
        new SpotLightLocation (
            GLCreateUniform(GLUniformType.VECTOR, shader_program, position_shader_location,     flatten(position)),
            GLCreateUniform(GLUniformType.VECTOR, shader_program, at_shader_location,           flatten(at)),
            GLCreateUniform(GLUniformType.VECTOR, shader_program, in_angle_shader_location,     flatten(in_angle)),
            GLCreateUniform(GLUniformType.VECTOR, shader_program, out_angle_shader_location,    flatten(out_angle)),
            GLCreateUniform(GLUniformType.VECTOR, shader_program, ambient_shader_location,      flatten(ambient)),
            GLCreateUniform(GLUniformType.VECTOR, shader_program, diffuse_shader_location,      flatten(diffuse)),
            GLCreateUniform(GLUniformType.VECTOR, shader_program, specular_shader_location,     flatten(specular))
        )
    );
}