function RenderModel(model) {
    if (!(model instanceof Model)) {
        console.error(`Model given is invalid.`);
        return;
    }

    EnableModel(model);
    gl.drawElements(gl.TRIANGLES, model.data.indices.length, gl.UNSIGNED_SHORT, 0);
}

function RenderModels(models) {
    if (models.length <= 0) {
        console.error(`No models are given.`);
        return;
    }

    for (var i = 0; i < models.length; i++) {
        RenderModel(models[i]);
    }
}