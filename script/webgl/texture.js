//
// GLTexture Object
//

function GLTexture(gl_texture) {
    this.texture = gl_texture;
}

//
// GLTexture Constructor
//

function GLCreateTexture(img) {
    
    //TODO: Check if image is valid.

    var texture = new GLTexture(
        gl.createTexture()
    );

    gl.bindTexture(gl.TEXTURE_2D, texture.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

    return texture;
}

//
// GLTexture Functions
//

function GLEnableTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture.texture);
	gl.activeTexture(gl.TEXTURE0);
}