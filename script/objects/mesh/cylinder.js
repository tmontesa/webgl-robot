

function CreateMeshCylinder(height, radius, step) {  
   var vertices = VerticesMeshCylinder(height, radius, step);
   var indices = IndicesMeshCylinder(vertices);
   return new Mesh(vertices, indices);
}

function VerticesMeshCylinder(height, radius, step) {
    var circle_vertices = [];
    var cylinder_vertices = [];

    // Calculate the circle base for the top/bottom of the cylinder,
    // as (x,z) pairs.

    for (var i = 0; i < step; i++) {
        circle_vertices.push([
            radius * Math.cos(radians(360 *((i % step)/step))),
            radius * Math.sin(radians(360 *((i % step)/step)))
        ]);
    }

    // Calculate the vertices for the top & bottom circle.

    for (var j = 0; j < step; j++) {

        // Bottom

        cylinder_vertices.push(vec3(
            circle_vertices[j][0],
            0,
            circle_vertices[j][1]
        ));

        cylinder_vertices.push(vec3(
            circle_vertices[(j+1) % step][0],
            0,
            circle_vertices[(j+1) % step][1]
        ));

        cylinder_vertices.push(vec3(
            0,
            0,
            0
        ));
        

        // Top
        cylinder_vertices.push(vec3(
            circle_vertices[j][0],
            height,
            circle_vertices[j][1]
        ));

        cylinder_vertices.push(vec3(
            0,
            height,
            0
        ));
        
        cylinder_vertices.push(vec3(
            circle_vertices[(j+1) % step][0],
            height,
            circle_vertices[(j+1) % step][1]
        ));

        
        
        

        
        
        

        

        

        
    }


    // Calculate the cylinder "tube'.

    // |\
    // | \
    // |__\

    for (var k = 0; k < step; k++) {
        
        cylinder_vertices.push(vec3(
            circle_vertices[k][0],
            0,
            circle_vertices[k][1]
        ));

        cylinder_vertices.push(vec3(
            circle_vertices[k][0],
            height,
            circle_vertices[k][1]
        ));

        cylinder_vertices.push(vec3(
            circle_vertices[(k+1) % step][0],
            0,
            circle_vertices[(k+1) % step][1]
        ));

    }

    // \--|
    //  \ |
    //   \|

    for (var l = 0; l < step; l++) {
        
        cylinder_vertices.push(vec3(
            circle_vertices[l][0],
            height,
            circle_vertices[l][1]
        ));

        cylinder_vertices.push(vec3(
            circle_vertices[(l+1) % step][0],
            height,
            circle_vertices[(l+1) % step][1]
        ));

        cylinder_vertices.push(vec3(
            circle_vertices[(l+1) % step][0],
            0,
            circle_vertices[(l+1) % step][1]
        ));

        

    }

    return cylinder_vertices;
}

function IndicesMeshCylinder(vertices) {
    if (vertices.length <= 0) {
        console.error(`Vertices given for index calculation has <0 length.`);
    }

    if (vertices.length % 3 != 0) {
        console.error(`Vertices given for index calculation is not divisible by 3.`);
    }

    var indices = [];

    for (var i = 0; i < vertices.length; i += 3) {
        indices.push(vec3(
            i, i+1, i+2
        ));
    }

    return indices;
}