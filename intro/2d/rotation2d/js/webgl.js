const StartWebGL = function () {

    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        alert('Your browser does not support WebGL');
        return;
    }

    const program = webglUtils.createProgramFromScripts(gl, ["2d-vertex-shader", "2d-fragment-shader"]);
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const colorLocation = gl.getUniformLocation(program, "u_color");
    const translationLocation = gl.getUniformLocation(program, "u_translation");
    const rotationLocation = gl.getUniformLocation(program, "u_rotation");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl);
    const translation = [0, 0];
    const rotation = [0, 1];
    const color = [Math.random(), Math.random(), Math.random(), 1];

    drawScene();

    webglLessonsUI.setupSlider("#x", {slide: updatePosition(0), max: gl.canvas.width });
    webglLessonsUI.setupSlider("#y", {slide: updatePosition(1), max: gl.canvas.height});
    webglLessonsUI.setupSlider("#angle", {slide: updateAngle, max: 360});

    function updateAngle(event, ui) {
        const angleInDegrees = 360 - ui.value;
        const angleInRadians = angleInDegrees * Math.PI / 180;
        rotation[0] = Math.sin(angleInRadians);
        rotation[1] = Math.cos(angleInRadians);
        drawScene();
    }

    $("#rotation").gmanUnitCircle({
        width: 200,
        height: 200,
        value: 0,
        slide: function(e,u) {
            rotation[0] = u.x;
            rotation[1] = u.y;
            drawScene();
        }
    });

    function updatePosition(index) {
        return function(event, ui) {
            translation[index] = ui.value;
            drawScene();
        };
    }

    function drawScene() {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const size = 2;          // 2 components per iteration
        const type = gl.FLOAT;   // the data is 32bit floats
        const normalize = false; // don't normalize the data
        const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
        gl.uniform4fv(colorLocation, color);
        gl.uniform2fv(translationLocation, translation);
        gl.uniform2fv(rotationLocation, rotation);
        const primitiveType = gl.TRIANGLES;
        const array_offset = 0;
        const count = 18;  
        gl.drawArrays(primitiveType, array_offset, count);
    }
};

function setGeometry(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            0, 0,
            30, 0,
            0, 150,
            0, 150,
            30, 0,
            30, 150,

            30, 0,
            100, 0,
            30, 30,
            30, 30,
            100, 0,
            100, 30,

            30, 60,
            67, 60,
            30, 90,
            30, 90,
            67, 60,
            67, 90,
        ]),
        gl.STATIC_DRAW);
}

document.addEventListener('DOMContentLoaded', function() {
    StartWebGL();
});