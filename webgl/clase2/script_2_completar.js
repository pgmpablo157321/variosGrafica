var main=function() {
  
  /*========================= GET WEBgl CONTEXT ========================= */

  var CANVAS=document.getElementById("your_canvas");
  CANVAS.width=window.innerWidth;
  CANVAS.height=window.innerHeight;

  var gl = CANVAS.getContext("experimental-webgl");

  /*========================= SHADERS ========================= */

  var shader_vertex_source="\n\
attribute vec3 position;\n\
uniform mat4 Tmatrix;\n\
uniform mat4 g2vT;\n\
uniform mat4 v2w;\n\
attribute vec3 color; //the color of the point\n\
varying vec3 vColor;\n\
void main(void) { //pre-built function\n\
  gl_Position=v2w*g2vT*Tmatrix*vec4(position,1);  \n\
  vColor=color;\n\
}";

  var shader_fragment_source="\n\
precision mediump float;\n\
varying vec3 vColor;\n\
void main(void) {\n\
gl_FragColor = vec4(vColor, 1.);\n\
}";

var SHADER_PROGRAM=LIBS.shaders(shader_fragment_source,shader_vertex_source,gl);


  /*========================= THE CUBE ========================= */
  //POINTS & COLORS:
  var cube_vertex=[
    -1,-1,-1,     1,1,0,
    1,-1,-1,     1,1,0,
    1, 1,-1,     1,1,0,
    -1, 1,-1,     1,1,0,

    -1,-1, 1,     0,0,1,
    1,-1, 1,     0,0,1,
    1, 1, 1,     0,0,1,
    -1, 1, 1,     0,0,1,

    -1,-1,-1,     0,1,1,
    -1, 1,-1,     0,1,1,
    -1, 1, 1,     0,1,1,
    -1,-1, 1,     0,1,1,

    1,-1,-1,     1,0,0,
    1, 1,-1,     1,0,0,
    1, 1, 1,     1,0,0,
    1,-1, 1,     1,0,0,

    -1,-1,-1,     1,0,1,
    -1,-1, 1,     1,0,1,
    1,-1, 1,     1,0,1,
    1,-1,-1,     1,0,1,

    -1, 1,-1,     0,1,0,
    -1, 1, 1,     0,1,0,
    1, 1, 1,     0,1,0,
    1, 1,-1,     0,1,0

  ];

  // Put Vertices in the buffer
  var triangle_vertices=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangle_vertices);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(cube_vertex),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

  

  //FACES :
  var cube_faces = [
    0,1,2,
    0,2,3,

    4,5,6,
    4,6,7,

    8,9,10,
    8,10,11,

    12,13,14,
    12,14,15,

    16,17,18,
    16,18,19,

    20,21,22,
    20,22,23];

  // Put faces in the buffer

  var triangle_indices=gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,triangle_indices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(cube_faces), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);

  
  /*==========			VIEWING	MATRICES	========= */

  var at=[0,0,0];
  var eye=[0.1,0.1,.1];
  var qup=[0,0,1];
  var g2vT=LIBS.geom2viewT(eye,at,qup);
  var v2w=LIBS.view2window([-3,-3,-3],[3,3,3]);
	
/*==========GET ATTRIBUTES AND UNIFORMS LOCATION AND ASSIGN THEM========= */
gl.bindBuffer(gl.ARRAY_BUFFER,triangle_vertices);
var _position = gl.getAttribLocation(SHADER_PROGRAM, "position");
gl.vertexAttribPointer(_position, 3, gl.FLOAT, false,6*4,0) ;

var _colores = gl.getAttribLocation(SHADER_PROGRAM, "color");
gl.vertexAttribPointer(_colores, 3, gl.FLOAT, false,6*4,3*4) ;


gl.enableVertexAttribArray(_position);
gl.enableVertexAttribArray(_colores);


var _tMatrix = gl.getUniformLocation(SHADER_PROGRAM, "Tmatrix");
var _g2vT= gl.getUniformLocation(SHADER_PROGRAM, "g2vT"); 
var _v2w = gl.getUniformLocation(SHADER_PROGRAM, "v2w");
gl.uniformMatrix4fv(_g2vT, false, g2vT);
gl.uniformMatrix4fv(_v2w, false, v2w);

  
  /*========================= DRAWING ========================= */
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clearDepth(1.0);
  gl.clearColor(0.8, 0.8, 0.8, 1.0);
  gl.viewport(0.0, 0.0, CANVAS.height, CANVAS.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangle_indices);

  var drag=false;
  var dx=0;

  var mouseup = function(e){
    drag=false;


  }

  var mousedown = function(e){
    drag=true;
  }
  
  var mousemove=function(e){
    if(drag){
      dx=e.movementX;

    }
  }

  document.getElementById("your_canvas").addEventListener("mousemove",mousemove);
  document.getElementById("your_canvas").addEventListener("mousedown",mousedown);
  document.getElementById("your_canvas").addEventListener("mouseup",mouseup);
  var t=0;
  var act=0;
  var animate=function(time) {
    var dt=time-t;
    t=time;
    if(!drag){
      dx*=.9;
      var angulo=act+dt*0.01+dx;
      TMATRIX=LIBS.rotateZ(angulo);
      gl.uniformMatrix4fv(_tMatrix, false, TMATRIX);
      gl.drawElements(gl.TRIANGLES, cube_faces.length, gl.UNSIGNED_SHORT, 0);
      gl.flush();
      act=angulo;
      
      
    }else{
      var angulo=act+dx;
      TMATRIX=LIBS.rotateZ(angulo);
      gl.uniformMatrix4fv(_tMatrix, false, TMATRIX);
      gl.drawElements(gl.TRIANGLES, cube_faces.length, gl.UNSIGNED_SHORT, 0);
      gl.flush();
      act=angulo;
    };
      
      window.requestAnimationFrame(animate);
    }

	
  animate(0);
};