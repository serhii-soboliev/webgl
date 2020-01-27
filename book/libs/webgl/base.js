const base = {};

base.init = function (canvas) {
    let gl = null;
    let msg = "Your browser does not support WebGL, or it is not enabled by default.";
    try {
        gl = canvas.getContext("webgl");
    } catch (e) {
        msg = "Error creating WebGL Context!: " + e.toString();
    }

    if (!gl) {
        alert(msg);
        throw new Error(msg);
    }

    return gl;
};

base.initViewPort = function (gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
};

base.initMatrices2D = function (canvas) {
    let projectionMatrix, modelViewMatrix;
    modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -3]);

    projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 1, 10000);
    return [projectionMatrix, modelViewMatrix]
};

base.initMatrices3D = function (canvas) {
    let modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -8]);

    let projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 1, 10000);

    let rotationAxis = vec3.create();
    vec3.normalize(rotationAxis, [1, 1, 1]);
    return [modelViewMatrix, projectionMatrix, rotationAxis]
};

base.createShader = function (gl, str, type) {
    let shader;
    if (type === "fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (type === "vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
};

base.initShaders = function (gl, fragmentSrc, vertexSrc) {

    let fragmentShader = base.createShader(gl, fragmentSrc, "fragment");
    let vertexShader = base.createShader(gl, vertexSrc, "vertex");

    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
        return null;
    }

    return shaderProgram;
};

base.animate = function(drawingContext) {
    let now = Date.now();
    let deltat = now - drawingContext.curTime;
    drawingContext.curTime = now;
    let fract = deltat / drawingContext.duration;
    let angle = Math.PI * 2 * fract;
    mat4.rotate(drawingContext.modelViewMatrix, drawingContext.modelViewMatrix, angle, drawingContext.rotationAxis);
};

base.run = function(gl, cube, drawingContext, animationContext) {
    requestAnimationFrame(function() { base.run(gl, cube, drawingContext); });
    draw(gl, cube, drawingContext);
    base.animate(drawingContext, animationContext);
};

base.vertexShaderSource2d =
    "    attribute vec3 vertexPos;\n" +
    "    uniform mat4 modelViewMatrix;\n" +
    "    uniform mat4 projectionMatrix;\n" +
    "    void main(void) {\n" +
    "        gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPos, 1.0);\n" +
    "    }\n";

base.fragmentShaderSource2d =
    "    void main(void) {\n" +
    "       gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n" +
    "}\n";

base.vertexShaderSource =
    "    attribute vec3 vertexPos;\n" +
    "    attribute vec4 vertexColor;\n" +
    "    uniform mat4 modelViewMatrix;\n" +
    "    uniform mat4 projectionMatrix;\n" +
    "    varying vec4 vColor;\n" +
    "    void main(void) {\n" +
    "        gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPos, 1.0);\n" +
    "        vColor = vertexColor;\n" +
    "    }\n";

base.fragmentShaderSource =
    "    precision mediump float;\n" +
    "    varying vec4 vColor;\n" +
    "    void main(void) {\n" +
    "       gl_FragColor = vColor;\n" +
         "}\n";