var base, larm, uarm;
const base_height = 0.5;
const larm_length = 2.0;
const uarm_length = 2.0;
var larm_height = 2.0;
var uarm_height = 2.0;

function init_models() {
    base = CreateModel(
        CreateMeshCylinder(base_height, 1.0, 10),
        [1.0, 0.0, 1.0],
        InstanceTransform(
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            1.0, 1.0, 1.0
        )
    );

    larm = CreateModel(
        CreateMeshBox(larm_length, 0.5, 0.5),
        [0.0, 1.0, 0.0],
        InstanceTransform(
            0.0, base_height, 0.0,
            0.0, 0.0, 0.0,
            1.0, 1.0, 1.0
        )
    );

    uarm = CreateModel(
        CreateMeshBox(uarm_length, 0.3, 0.3),
        [0.0, 0.0, 1.0],
        InstanceTransform(
            larm_height, base_height, 0.0,
            0.0, 0.0, 0.0,
            1.0, 1.0, 1.0
        )
    );

    sphere = CreateModel (
        CreateMeshSphere(),
        [1.0, 0.0, 0.0],
        InstanceTransform(
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            1.0, 1.0, 1.0
        )
    );
    
}