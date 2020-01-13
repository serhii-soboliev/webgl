var gl, program, vertexArray = [];

var StartWebGL = function(vertexShaderText, fragmentShaderText) {
    var canvas = document.getElementById('triangle-canvas');
    gl = canvas.getContext('webgl');
    if (!gl) {
        alert('Your browser does not support WebGL');
        return;
    }

    canvas.height = gl.canvas.clientHeight;
    canvas.width = gl.canvas.clientWidth;

    canvas.addEventListener('mousedown', function(event) {
        OnMouseDown(event, canvas);
    })


    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderText);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderText);
    program = createProgram(gl, vertexShader, fragmentShader);

    Draw();
};

var Draw = function() {
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);
    var positionAttribLocation = gl.getAttribLocation(program, 'vertexPosition');
    var vertices_number = vertexArray.length / 2;
    gl.vertexAttribPointer(
        positionAttribLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(positionAttribLocation);
	gl.clearColor(0.75, 0.9, 1.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.useProgram(program);
	gl.drawArrays(gl.TRIANGLES, 0, vertices_number);
	gl.drawArrays(gl.POINTS, 1, vertices_number);
	gl.drawArrays(gl.LINE_STRIP, 0, vertices_number);
}

function OnMouseDown(event, canvas) {
    var x = event.clientX;
    var y = event.clientY;
    var middle_X = gl.canvas.width / 2;
    var middle_Y = gl.canvas.height / 2;
    var rect = canvas.getBoundingClientRect();
    x = ((x - rect.left) - middle_X) / middle_X;
    y = (middle_Y - (y - rect.top)) / middle_Y;
    vertexArray.push(x);
    vertexArray.push(y);
    Draw();
}

var InitWebGL = function() {
    return StartWebGL(VertexShader(), FragmentShader());
}

document.addEventListener('DOMContentLoaded', function() {
    InitWebGL();
});