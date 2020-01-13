var VertexShader = function() {
    //TODO: load shader program resource
    return `
		attribute vec2 vertexPosition;
		attribute vec3 vertexColor;
		varying vec3 fragColor;

		void main(){
			fragColor = vertexColor;
			gl_Position = vec4(vertexPosition, 0, 1);
		}
	`
}

var FragmentShader = function() {
    //TODO: load shader program resource
    return `
		precision mediump float;

		varying vec3 fragColor;

		void main(){
			gl_FragColor = vec4(fragColor, 1.0);
		}
	`
}