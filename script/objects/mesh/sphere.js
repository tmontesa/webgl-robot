// /sphere-cause-i-cant-figure-it-out-manually-lol.json

function CreateMeshSphere() {
    var model_import = loadFileAJAXasJSON("assets/models/sphere-cause-i-cant-figure-it-out-manually-lol.json");
    var vertices = flatten(model_import.meshes[0].vertices);
    var indices = new Uint16Array(flatten(model_import.meshes[0].faces));
    return new Mesh(vertices, indices);
}