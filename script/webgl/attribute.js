//
// GLAttribute Object
//

function GLAttribute(location, num_elements, data_type, is_normalized, size, offset) {
    this.location = location;
    this.num_elements = num_elements;
    this.data_type = data_type;
    this.is_normalized = is_normalized
    this.size = size;
    this.offset = offset;
}

//
// GLAttribute Constructor
//

function GLCreateAttribute(shader_program, shader_location, num_elements, data_type, is_normalized, size, offset) {
    var attribute = new GLAttribute(gl.getAttribLocation(shader_program, shader_location),
        num_elements, data_type, is_normalized, size, offset);
    return attribute;
}

//
// GLAttribute Functions
//

function GLEnableAttribute(attribute) {
    if (!(attribute instanceof GLAttribute)) {
        console.error(`Attribute given is invalid.`);
        return;
    }

    gl.vertexAttribPointer(
        attribute.location,       
        attribute.num_elements,                          
        attribute.data_type,                   
        attribute.is_normalized,                
        attribute.size,                        
        attribute.offset           
    );

    gl.enableVertexAttribArray(attribute.location);
}

function GLEnableAttributes(attributes) {
    if (attributes.length <= 0) {
        console.error(`No attributes are given.`);
        return;
    }

    for (var i = 0; i < attributes.length; i++) {
        GLEnableAttribute(attributes[i]);
    }
}