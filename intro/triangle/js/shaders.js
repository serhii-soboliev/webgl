var VertexShader = function() {
	//TODO: load shader program resource
	return `
				attribute vec2 vertexPosition;
				void main(){
					gl_Position = vec4(vertexPosition, 0, 1);
				}
	`	
}  

var FragmentShader = function() {
	//TODO: load shader program resource
	return `
		precision mediump float;
		void main(){
			gl_FragColor = vec4(0.8, 0.7, 0.7, 1.0);
		}
	`	
} 
