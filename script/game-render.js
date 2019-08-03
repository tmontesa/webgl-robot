//
// game-render.js
// =========
// Includes the necessary WebGL functions to render game-specific objects.
//

var transformation_stack = [];
var transform = mat4();



function game_render_traverse(node) {
    // Check if node is null.
    if (node == null) { return; }

    // If it exists, push the current transform matrix onto the stack.
    transformation_stack.push(transform);

    // Update the current transform matrix by multiplying it with this node's transform.
    transform = mult(transform, node.transform);

    // Render the model.
    UpdateModelTransform(node.model, transform);
    RenderModel(node.model, gl.TRIANGLES);
    RenderModel(node.model, gl.LINE_STRIP, [1.0, 1.0, 1.0]);

    // If it has a child, traverse it recursively.
    if (node.child != null) {
        game_render_traverse(node.child);
    }

    // Remove the pushed matrix by popping it from the stack.
    transform = transformation_stack.pop();

    // If it has siblings, traverse it recursively.
    // Should not have a sibling in this case, though.
    if (node.sibling != null) {
        game_render_traverse(node.sibling);
    }

    // It should be done now.
    return;
}

//
// Main Render Function
//

function game_render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    transformation_stack = [];
    transform = mat4();

    // Render sphere (not part of the recursive model).
    UpdateModelTransform(sphere, mPositionSphere);
    RenderModel(sphere, gl.TRIANGLES);
    RenderModel(sphere, gl.LINE_STRIP, [1.0, 1.0, 1.0]);
    
    game_render_traverse(tree_root);
}