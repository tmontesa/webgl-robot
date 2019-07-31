function RenderModel(model, draw_type, color) {
    if (!(model instanceof Model)) {
        console.error(`Model given is invalid.`);
        return;
    }

    EnableModel(model);

    if (color != null) {
        GLUpdateUniform(u_color, color);
    }
    
    gl.drawElements(draw_type, model.data.indices.length, gl.UNSIGNED_SHORT, 0);
}

function RenderModels(models, draw_type, color) {
    if (models.length <= 0) {
        console.error(`No models are given.`);
        return;
    }

    for (var i = 0; i < models.length; i++) {
        RenderModel(models[i], draw_type, color);
    }
}