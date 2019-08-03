//
// init/nodes.js
// =========
// Contains global varaibles, and initialization for recursive rendering tree nodes.
//

var tree_root;
var base_node, larm_node, uarm_node;

function init_nodes() {
    uarm_node = CreateNode(uarm, mat4(), null, null);
    larm_node = CreateNode(larm, mat4(), null, uarm_node);
    base_node = CreateNode(base, mat4(), null, larm_node);
    tree_root = base_node;
}