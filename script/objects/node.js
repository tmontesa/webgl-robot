//
// objects/node.js
// =========
// A node struct for the recursive rendering tree.
//

function Node(model, transform, sibling, child) {
    this.model = model;
    this.transform = transform;
    this.sibling = sibling;
    this.child = child;
}

function CreateNode(model, transform, sibling, child) {
    return new Node(model, transform, sibling, child);
}