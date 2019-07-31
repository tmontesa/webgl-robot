//
// Model Object
//

function ModelData(vertices, indices) {
    this.vertices = vertices;
    this.indices = indices;
}

function ModelBuffers(VBO, IBO) {
    this.VBO = VBO;
    this.IBO = IBO;
}

function Model(model_data, model_buffers, original_instance_transform, color) {
    this.data = model_data;
    this.buffers = model_buffers;
    this.original_instance_transform = original_instance_transform;
    this.instance_transform = flatten(original_instance_transform);
    this.original_inverse_transform = inverse(original_instance_transform);
    this.inverse_transform = flatten(this.original_inverse_transform);
    this.color = color;
}

//
// Model Constructor
//

function CreateModel(model_import, color, instance_transform) {
    var model_data = new ModelData(
        flatten(model_import.vertices),
        new Uint16Array(flatten(model_import.indices))
    );

    var VBO = GLCreateBuffer(program, gl.ARRAY_BUFFER, [
        GLCreateAttribute(program, "vPosition", 3, gl.FLOAT, false, 0, 0)
    ]);
    GLEnableBuffer(VBO, model_data.vertices);

    var IBO = GLCreateBuffer(program, gl.ELEMENT_ARRAY_BUFFER);
    GLEnableBuffer(IBO, model_data.indices);

    var model_buffers = new ModelBuffers(
        VBO, IBO
    );

    var model = new Model(model_data, model_buffers, instance_transform, color);
    GLUpdateUniform(u_mWorld, model.instance_transform);
    return model;
}

function UpdateModelTransform(model, instance_transform) {
    model.original_instance_transform = instance_transform;
    model.instance_transform = flatten(instance_transform);
    model.original_inverse_transform = inverse(instance_transform);
    model.inverse_transform = flatten(model.original_inverse_transform);
}

// Model Functions

function EnableModel(model) {
    GLEnableBuffer(model.buffers.VBO);
    GLEnableBuffer(model.buffers.IBO);
    GLUpdateUniform(u_mWorld, model.instance_transform);
    GLUpdateUniform(u_color, model.color);
}