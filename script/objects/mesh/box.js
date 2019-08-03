//
// objects/mesh/box.js
// =========
// Creates a type Mesh containing vertices and faces of a box.
//

function CreateMeshBox(length, width, depth) {
    var vertices = VerticesMeshBox(length, width, depth);
    var indices = IndicesMeshBox();
    return new Mesh(vertices, indices);
}

function VerticesMeshBox(length, width, depth) {
    //    y=w |__x=l
    //   z=d /    
    //      0   1      4   5
    //      /---/------/---/
    //     /   /------/---/
    //    /---/------/---/
    //    2   3      6   7

    var l = length;
    var w = width/2;
    var d = depth/2;

    var vertices = [
        vec3(0.0, w, d),
        vec3(0.0, w, -d),
        vec3(0.0, -w, d),
        vec3(0.0, -w, -d),
        vec3(l, w, d),
        vec3(l, w, -d),
        vec3(l, -w, d),
        vec3(l, -w, -d)  
    ];

    return vertices;
}

function IndicesMeshBox() {
    var indices = [
        // Left Face
        0, 1, 2,
        1, 3, 2,

        // Right Face
        5, 6, 7,
        5, 4, 6,

        // Top Face
        0, 5, 1,
        0, 4, 5,

        // Bottom Face
        2, 3, 7,
        2, 7, 6,

        // Near Face
        0, 2, 4,
        2, 6, 4,

        // Far Face
        1,  5, 3,
        3, 5, 7, 
    ];

    return indices;
}