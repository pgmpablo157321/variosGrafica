var main=function() {
    /* 
        Encontrar donde se va a visualizar en el html
    */
    var canvas=document.getElementById("your_canvas");
    var gl= canvas.getContext("experimental-webgl");


    /*
    Shaders (programas de la tarjeta grafica glSl)
    */
   

    //lo que se va a hacer con los vertices
   var shader_vertex_source="\n\
   attribute vec3 position; //the position of the point\n\
   uniform mat4 rotX;\n\
   uniform mat4 rotZ;\n\
   uniform mat4 rotY;\n\
   attribute vec3 color;\n\
   varying vec3 vColor;\n\
   void main(void) { //pre-built function\n\
   gl_Position = rotX*rotZ*rotY*vec4(position, 1.); //0. is the z, and 1 is w\n\
   vColor=color;\n\
   }";
   

   //lo que se va a hacer con el color
     var shader_fragment_source="\n\
     precision mediump float;\n\
     varying vec3 vColor;\n\
     void main(void) {\n\
     gl_FragColor = vec4(vColor, 1); //black color\n\
     }";
 
   
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



     //la geometria y la topologia en js


    var thorus_vert=function(r, R, p1, p2){
      var ver=new Array();
      for(var i=0; i<p1; i++){
        for(var j=0; j<p2; j++){
          ver.push(R*Math.cos(2*Math.PI*i/p1)+r*Math.cos(2*Math.PI*i/p1)*Math.cos(2*Math.PI*j/p2));
          ver.push(r*Math.sin(2*Math.PI*j/p2));
          ver.push(R*Math.sin(2*Math.PI*i/p1)+r*Math.sin(2*Math.PI*i/p1)*Math.cos(2*Math.PI*j/p2));
        }
      }
      return ver;
    }

    var thorus_fac=function(p1, p2){
      var fac=new Array();
      for(var i=0; i<p1; i++){
        for(var j=0; j<p2; j++){
          fac.push(i*p2+j);
          fac.push(i*p2+(j+1)%p2);
          fac.push(((i+1)%p1)*p2+j);
          
          fac.push(((i+1)%p1)*p2+j);
          fac.push(i*p2+(j+1)%p2);
          fac.push(((i+1)%p1)*p2+(j+1)%p2);
      
        }
      }
      
      return fac;
    }

    var thorus_col=function(p1, p2){
      var ver=new Array();
      for(var i=0; i<p1; i++){
        for(var j=0; j<p2; j++){
          ver.push(i/p1);
          ver.push(j/p2);
          ver.push((i+j)/(p1+p2));
        }
      }
      return ver;
    }
    
    var geom=thorus_vert(0.2,0.5,500,100);
    var topo=thorus_fac(500,100);
    var colors=thorus_col(500, 100);
    console.log(colors);
    
    
    


    //creando direcciones en memoria donde van a estar los vertices y la topologia
    var triangle_vertices=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangle_vertices);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(geom),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var triangle_indices=gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,triangle_indices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(topo), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);

    var color_buffer = gl.createBuffer ();
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
    

    
    gl.bindBuffer(gl.ARRAY_BUFFER,triangle_vertices);
    var _position = gl.getAttribLocation(myshader_program, "position");
    gl.vertexAttribPointer(_position, 3, gl.FLOAT, false,3*4,0) ;

    gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);
    var _colores = gl.getAttribLocation(myshader_program, "color");
    gl.vertexAttribPointer(_colores, 3, gl.FLOAT, false,3*4,0) ;

    gl.enableVertexAttribArray(_position);
    gl.enableVertexAttribArray(_colores);

    var _rotY = gl.getUniformLocation(myshader_program, "rotY");
    var _rotZ = gl.getUniformLocation(myshader_program, "rotZ");
    var _rotX = gl.getUniformLocation(myshader_program, "rotX");
    
    var t=0;
    var act=0;
    
    var animate = function(time) {
        var dt=time-t;
        var angulo=act+dt*0.001;
        var c=Math.cos(angulo);
        var s=Math.sin(angulo);
        var rX=[1,0,0,0,
                0,c,s,0,
                0,-s,c,0,
                0,0,0,1];
        var rZ=[c,s,0,0,
                -s,c,0,0,
                0,0,1,0,
                0,0,0,1];
        var rY=[c,0,-s,0,
                0,1,0,0,
                s,0,c,0,
                0,0,0,1];        
        act=angulo;
        t=time;
        gl.uniformMatrix4fv(_rotY, false, rZ);
        gl.uniformMatrix4fv(_rotZ, false, rY);
        gl.uniformMatrix4fv(_rotX, false, rX);

        

        //Dibujando
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clearDepth(1.0);
        gl.clearColor(0, 0, 0, 0);
        gl.viewport(0.0, 0.0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangle_indices);
        gl.drawElements(gl.TRIANGLES, topo.length, gl.UNSIGNED_SHORT, 0);
        gl.flush();
        window.requestAnimationFrame(animate);
        
    }
    animate(0);

    
    




}