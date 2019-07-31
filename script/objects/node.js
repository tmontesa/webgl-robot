function Node(data, sibling, child) {
    this.data = data;
    this.sibling = sibling;
    this.child = child;
}

function CreateNode(data, sibling, child) {
    return new Node(data, sibling, child);
}