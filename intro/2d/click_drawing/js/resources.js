var createShader = function(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader error info: ', gl.getShaderInfoLog(shader));
        return false;
    }
    return shader;
}

var createProgram = function(gl, vertexShader, fragmentShader){
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('Error validating program ', gl.getProgramInfoLog(program));
		return false;
	}
	return program;
}