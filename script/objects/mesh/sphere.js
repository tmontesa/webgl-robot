//
// objects/mesh/sphere.js
// =========
// Creates a type Mesh containing vertices and faces of a sphere.
//

// Note: Sphere model was created by myself in Blender.
// It was then exported to OBJ and converted into JSON to be parsed.
// It is located in the file: 
// /sphere-cause-i-cant-figure-it-out-manually-lol.json

function CreateMeshSphere() {
    var model_import = loadFileAJAXasJSON("assets/models/sphere-cause-i-cant-figure-it-out-manually-lol.json");
    var vertices = flatten(model_import.meshes[0].vertices);
    var indices = new Uint16Array(flatten(model_import.meshes[0].faces));
    return new Mesh(vertices, indices);
}