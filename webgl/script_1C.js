//Computación Gráfica
//Codigo basado en https://www.tutorialspoint.com/webgl/index.htm

var main=function() {

  //Get the Id of the canvas
  var canvas=document.getElementById("your_canvas");
  
  // GET WEBgl CONTEXT: to obtain the rendering context and its drawing functions
  var gl= canvas.getContext("experimental-webgl");
  /*canvas.getContext(contextType, contextAttributes);
		contextAttributes(optional):
			Alpha:If true alpha buffer is active .Default=true.
			depth:If true depth buffer active.Default=true.
			antialias:If true anti-aliasing is performed.Default=true.
	e.g.  var context = canvas.getContext('webgl', { antialias: false}); */
	
  /*========================= SHADERS ========================= */
  
//Source code de los shaders en glSL como un string   
    var shader_vertex_source="\n\
attribute vec3 position; //the position of the point\n\
attribute vec3 color;\n\
varying vec3 vcolor;\n\
uniform mat4 Tmatrix;\n\
void main(void) { //pre-built function\n\
gl_Position = Tmatrix*vec4(position, 1.); //0. is the z, and 1 is w\n\
vcolor=color;\n\
}";
//gl_Position is predefined variable

  var shader_fragment_source="\n\
precision mediump float;\n\
varying vec3 vcolor;\n\
void main(void) {\n\
gl_FragColor = vec4(vcolor, 1.); //black color\n\
}";
//the surface of the each triangle is known as a fragment

//Compilar los shaders, crear programa y usarlo-  ESTA PARTE ES STANDARD PARA CASI TODOS
  function shaders(shader_vertex_sourceR,shader_fragment_sourceR) {
    var shader_vert = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(shader_vert,shader_vertex_sourceR);
    gl.compileShader(shader_vert);
	
	var shader_frag = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader_frag,shader_fragment_sourceR);
    gl.compileShader(shader_frag);
	
	var shader_program=gl.createProgram();
    gl.attachShader(shader_program, shader_vert);
    gl.attachShader(shader_program, shader_frag);
    gl.linkProgram(shader_program);
	gl.useProgram(shader_program);
	return shader_program;
  }
  
  //sets the specified WebglProgram as part of the current rendering state.
  var myshader_program=shaders(shader_vertex_source,shader_fragment_source);

 
  /*==========THE TRIANGLE:Vertex&Faces Buffers ================ */

  //POINTS :
  var triangle_points = [-0.5,-0.5,0.0, 1,0,0,
  -0.25,0.5,0.0, 0,1,0,
  0.0,-0.5,0.0, 0,0,1,
  0.25,0.5,0.0, 0,0,0,
  0.5,-0.5,0.0,1,1,1];
	
  // Buffer objects (BO) reside in the GPU memory
  // Vertex buffer object (VBO): holds per-vertex data of the graphical model
  // Index buffer objects (IBO): holds the indices
  
  //STEPS:
  //Create the buffer in the GPU memory
    var triangle_vertices= gl.createBuffer ();
	
  //Bind an appropriate array object according to the use. Binding operation makes this buffer the currentbuffer in use
  	gl.bindBuffer(gl.ARRAY_BUFFER, triangle_vertices);
  //.ARRAY_BUFFER(or .ELEMENT_ARRAY_BUFFER) indicates buffer data is vertex(or index) data

  //pass data from triangle_points to the current binded buffer in the GPU memory
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangle_points),gl.STATIC_DRAW);
   /*bufferData (enum target, Object data, enum usage)\
		enum target: ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER
		Object data: new Float32Array(or Uint16Array)(vector_with_data).....for vertex data use Float32Array;for index data use Uint16Array
		enum usage: STATIC_DRAW -> Data specified once & used many times
					DYNAMIC_DRAW −> Data specified repeatedly & used many times */
 
	gl.bindBuffer(gl.ARRAY_BUFFER,null);//unbind (optional but recommended)
  
  //note: gl is our variable to current WebGL context
	
  //FACES:
  var triangle_faces =[0,1,2,2,3,4];//Indices
  
  var triangle_indices= gl.createBuffer ();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangle_indices);//make triangle_indices to be the current buffer
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangle_faces),gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);//unbind (optional)

  
  var c=Math.cos(90* Math.PI / 180);
  var s=Math.sin(90* Math.PI / 180);
  Tmat=[c,s,0,0,
	   -s,c,0,0,
	   0,0,1,0,
	   0,0,0,1];
  
  /*==========ASSOCIATING ATTRIBUTES & BUFFERS========= 
  
  After creating the vertex buffer objects, we have to associate
  them with the attributes of the vertex shader program. Each attribute
  in the vertex shader program points to a vertex buffer object.Then
  these attributes are passed to the shader program.
  STEPS:	Get the attribute location
			Point the attribute to a vertex buffer object
			Enable the attribute
  */
  
  gl.bindBuffer(gl.ARRAY_BUFFER, triangle_vertices);
  
	//Get the location of attribute position	
  var _position = gl.getAttribLocation(myshader_program, "position");
  var _color = gl.getAttribLocation(myshader_program, "color");
  var _Tmatrix = gl.getUniformLocation(myshader_program, "Tmatrix");
  
    // assign the buffer object that is binded right now(triangle_vertices) to the attribute variable position
  gl.vertexAttribPointer(_position, 3, gl.FLOAT, false,6*4,0) ;
	// _position is the location of the attribute, 2 is the # of components of the attribute (vector of 2 components here
	// gl.Float is the Type, false->normalized to [-1,1],0,0 are the stride(number of bytes between different vertex data elements)
	// & offset(offset (in bytes) in a buffer object )
  gl.vertexAttribPointer(_color, 3, gl.FLOAT, false,6*4,3*4);
  
  gl.uniformMatrix4fv(_Tmatrix, false, Tmat);
  
  gl.enableVertexAttribArray(_position);// activate attribute 
  gl.enableVertexAttribArray(_color);
	

  /*========================= DRAWING ========================= */
 
  //Set clear color and clear
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.viewport(0.0, 0.0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangle_indices);
  
  gl.drawElements(gl.TRIANGLES, triangle_faces.length, gl.UNSIGNED_SHORT, 0);
  /*drawElements(enum mode, long count, enum type, long offset)
	draw models using vertices and indices.	
		mode: Choose primitive type to draw->gl.POINTS, gl.LINE_STRIP, gl.LINE_LOOP, gl.LINES, gl.TRIANGLE_STRIP, gl.TRIANGLE_FAN, gl.TRIANGLES
		count: # of elements to render
		type: data type of the indices-> UNSIGNED_BYTE or UNSIGNED_SHORT
		offset: starting point for rendering, usually 0

		Note: drawArrays() is an alternative to draw models using just vertices.*/
   
  gl.flush();
};