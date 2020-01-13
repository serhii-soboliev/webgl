var StartWebGL = function (vertexShaderText, fragmentShaderText) {
	
	var canvas = document.getElementById('triangle-canvas');
	var gl = canvas.getContext('webgl');

	if (!gl) {
		alert('Your browser does not support WebGL');
		return;
	}


	canvas.height = gl.canvas.clientHeight;
	canvas.width = gl.canvas.clientWidth;


	gl.viewport(0, 0, gl.canvas.width ,gl.canvas.height);


	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		alert('Error compiling shader!');
		console.error('Shader error info: ', gl.getShaderInfoLog(vertexShader));
	}
	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		alert('Error compiling shader!');
		console.error('Shader error info: ', gl.getShaderInfoLog(fragmentShader));
	}

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	gl.linkProgram(program);
	gl.validateProgram(program);

	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('Error validating program ', gl.getProgramInfoLog(program));
		return;
	}
	
	return {
		gl: gl,
		program: program
	};

};

var DrawTriangle = function(gl, program) {	
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

	var vertexArray = [
		//   X,     Y,    Z,    R,    G,    B
			 0.0,  0.3,  0.0,  1.0,  0.0,  0.0,  
			 0.5, -0.8,  0.0,  1.0,  0.0,  0.0,   
			-0.5, -0.8,  0.0,  1.0,  0.0,  0.0,  

			0.0,  -0.3,  0.6,  0.0,  0.0,  1.0,  
			0.5,   0.8,  0.6,  0.0,  0.0,  1.0,   
			-0.5,  0.8,  0.6,  0.0,  0.0,  1.0   
	];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);

	var positionAttribLocation = gl.getAttribLocation(program, 'vertexPosition');

	gl.vertexAttribPointer(
		positionAttribLocation, //attribute reference
		3, // element numbers per iteration
		gl.FLOAT, // data type
		gl.FALSE, // do we need normalization
		6 * Float32Array.BYTES_PER_ELEMENT, // elements number per vertex
		0 * Float32Array.BYTES_PER_ELEMENT // shift for each vertex
	);

	gl.enableVertexAttribArray(positionAttribLocation);

	var colorAttribLocation = gl.getAttribLocation(program, 'vertexColor');

	gl.vertexAttribPointer(
		colorAttribLocation, //attribute reference
		3, // element numbers per iteration
		gl.FLOAT, // data type
		gl.FALSE, // do we need normalization
		6 * Float32Array.BYTES_PER_ELEMENT, // elements number per vertex
		3 * Float32Array.BYTES_PER_ELEMENT // shift for each vertex
	);

	gl.enableVertexAttribArray(colorAttribLocation);

	gl.clearColor(0.75, 0.9, 1.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST)
	gl.useProgram(program);
	gl.drawArrays(gl.TRIANGLES, 0, 6);
}


var InitWebGL = function() {
	return StartWebGL(VertexShader(), FragmentShader());
}

document.addEventListener('DOMContentLoaded', function() {
	const {gl, program} = InitWebGL();
	DrawTriangle(gl, program);
});