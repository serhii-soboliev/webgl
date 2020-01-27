const figures =  {};

figures.square = function (gl) {
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    const vertices = [
        .5,  .5,  0.0,
        -.5,  .5,  0.0,
        .5, -.5,  0.0,
        -.5, -.5,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    return {
        buffer: vertexBuffer,
        vertSize: 3,
        nVerts: 4,
        primtype: gl.TRIANGLE_STRIP
    };
};