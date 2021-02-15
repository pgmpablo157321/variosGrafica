var LIBS={
	
	shaders: function(FragCode,VertCode,GL){
		//Compilar los shaders, crear programa y usarlo
		 var vertShader = GL.createShader(GL.VERTEX_SHADER);
         GL.shaderSource(vertShader, VertCode);
         GL.compileShader(vertShader);

	     var fragShader = GL.createShader(GL.FRAGMENT_SHADER);
         GL.shaderSource(fragShader, FragCode);
         GL.compileShader(fragShader);

         //Create and use combined shader program
         var SHADER_PROGRAM = GL.createProgram();
         GL.attachShader(SHADER_PROGRAM, vertShader);
         GL.attachShader(SHADER_PROGRAM, fragShader);
         GL.linkProgram(SHADER_PROGRAM);
		 GL.useProgram(SHADER_PROGRAM);
		 return SHADER_PROGRAM;
	},
	
  rotateX: function(angle) {
    var c=Math.cos(angle*Math.PI/180);
    var s=Math.sin(angle*Math.PI/180);	
	return [1,0,0,0,
	        0,c,s,0,
	        0,-s,c,0,
	        0,0,0,1];
  },
  
  rotateY: function(angle) {
    var c=Math.cos(angle*Math.PI/180);
    var s=Math.sin(angle*Math.PI/180);	
	return [c,0,-s,0,
	        0,1,0,0,
          s,0,c,0,
	        0,0,0,1];
  },
  
  rotateZ: function(angle) {
    var c=Math.cos(angle*Math.PI/180);
    var s=Math.sin(angle*Math.PI/180);	
  return [c,s,0,0,
          -s,c,0,0,
          0,0,1,0,
          0,0,0,1];
  
  
  },

  translate:function(dx, dy, dz){
    return [1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            dx,dy,dz,1];
  },

  scale: function(Sx,Sy,Sz){
    return [Sx,0,0,0,
            0,Sy,0,0,
            0,0,Sz,0,
            0,0,0,1];
  
  
  
  },
  
  geom2viewT: function(eye,at,qup){
    norm=Math.sqrt(Math.pow(eye[0]-at[0],2)+Math.pow(eye[1]-at[1],2)+Math.pow(eye[2]-at[2],2));
    Na=[(eye[0]-at[0])/norm,(eye[1]-at[1])/norm,(eye[2]-at[2])/norm];
    I=math.identity(3,3);
    Up=math.subtract(qup,math.multiply(math.matrix(Na),math.dot(Na,qup)));
    Up=math.divide(Up,math.norm(Up));
    otro=math.cross(Up,Na);
    return [[otro._data[0],Up._data[0],Na[0],0,
    otro._data[1],Up._data[1],Na[1],0,
    otro._data[2],Up._data[2],Na[2],0,
    0,0,0,1],Up._data,otro._data];
  },
  

  view2window: function(Xmin,Xmax){
    return [2/(Xmax[0]-Xmin[0]),0,0,0,
    0,2/(Xmax[1]-Xmin[1]),0,0,
    0,0,-2/(Xmax[2]-Xmin[2]),0,
    -1-2*Xmin[0]/(Xmax[0]-Xmin[0]),-1-2*Xmin[1]/(Xmax[1]-Xmin[1]),1+2*Xmin[2]/(Xmax[2]-Xmin[2]),1]
  
  }

  
  
  
};
