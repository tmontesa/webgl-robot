//
// Model Object
//

function ModelData(vertices, indices, normals, texcoords) {
    this.vertices = vertices;
    this.indices = indices;
    this.normals = normals;
    this.texcoords = texcoords;
}

function ModelBuffers(VBO, IBO, NBO, TBO) {
    this.VBO = VBO;
    this.IBO = IBO;
    this.NBO = NBO;
    this.TBO = TBO;
}

function Model(model_data, model_buffers, instance_transform, normal_matrix, texture, material_reflection) {
    this.data = model_data;
    this.buffers = model_buffers;
    this.instance_transform = instance_transform;
    this.normal_matrix = normal_matrix;
    this.texture = texture;
    this.material_reflection = material_reflection;
}

//
// Model Constructor
//

function CreateModel(model_import, img, material_reflection_values, instance_transform) {
    var model_data = new ModelData(
        flatten(model_import.meshes[0].vertices),
        new Uint16Array(flatten(model_import.meshes[0].faces)),
        flatten(model_import.meshes[0].normals),
        flatten(model_import.meshes[0].texturecoords[0])
    );

    var VBO = GLCreateBuffer(program, gl.ARRAY_BUFFER, [
        GLCreateAttribute(program, "vPosition", 3, gl.FLOAT, false, 0, 0)
    ]);
    GLEnableBuffer(VBO, model_data.vertices);

    var IBO = GLCreateBuffer(program, gl.ELEMENT_ARRAY_BUFFER);
    GLEnableBuffer(IBO, model_data.indices);

    var NBO = GLCreateBuffer(program, gl.ARRAY_BUFFER, [
        GLCreateAttribute(program, "vNormal", 3, gl.FLOAT, false, 0, 0)
    ]);
    GLEnableBuffer(NBO, model_data.vertices);

    var TBO = GLCreateBuffer(program, gl.ARRAY_BUFFER, [
        GLCreateAttribute(program, "vTexcoord", 2, gl.FLOAT, false, 0, 0)
    ]);
    GLEnableBuffer(TBO, model_data.texcoords);

    var model_buffers = new ModelBuffers(
        VBO, IBO, NBO, TBO
    );

    var normal_matrix = flatten(transpose(inverse(instance_transform)));
    var texture = GLCreateTexture(img);

    var material_reflection = CreateMaterialReflection(
        material_reflection_values[0],
        material_reflection_values[1],
        material_reflection_values[2],
        material_reflection_values[3]
    );

    var model = new Model(model_data, model_buffers, flatten(instance_transform), normal_matrix, texture, material_reflection);
    GLUpdateUniform(u_mWorld, model.instance_transform);
    return model;
}

// Model Functions

function EnableModel(model) {
    GLEnableBuffer(model.buffers.VBO);
    GLEnableBuffer(model.buffers.IBO);
    GLEnableBuffer(model.buffers.NBO);
    GLEnableBuffer(model.buffers.TBO);
    GLUpdateUniform(u_mWorld, model.instance_transform);
    GLUpdateUniform(u_mNormal, model.normal_matrix);
    EnableMaterialReflection(model.material_reflection);
    GLEnableTexture(model.texture);
}