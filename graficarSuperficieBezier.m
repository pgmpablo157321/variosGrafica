
function [geom, topo, colors] = graficarSuperficieBezier (puntos, pesos, Nu, Nv)
  
  %transformaciones
  %angle=pi/5;
  %rotX=[1,0,0;
  %      0,cos(angle),-sin(angle);
  %      0,sin(angle), cos(angle)]
  %puntos=rotX*puntos;
  corte=[1,.4,0;
         0,1,0;
         0,0,1]
  
  puntos=corte*puntos;
  
  
  topo=[];
  geom=[];
  normales=[];
  colors=[];
  for j=1:(Nv-1)
    v=(j-1)/(Nv-1);
    for i=1:(Nu-1)
      u=(i-1)/(Nu-1);
      topo=[topo;(j-1)*Nu+i i+Nu*j i+Nu*j+1;(j-1)*Nu+i i+Nu*(j-1)+1 i+Nu*j+1];
      geom=[geom;sBezier(u, v, puntos, pesos)];
      normales=[normales,[(-2+2*u)/sqrt(8*u^2-8*u+4);2*u/sqrt(8*u^2-8*u+4);0]];
      normales=[normales,[(-2+2*u)/sqrt(8*u^2-8*u+4);2*u/sqrt(8*u^2-8*u+4);0]];
    endfor 
   geom=[geom;sBezier(1, v, puntos, pesos)];
  endfor
  
  for i=1:Nu
    u=(i-1)/(Nu-1);
    geom=[geom;sBezier(u, 1, puntos, pesos)];
  endfor
  
  
  %%colores
  ka=0.6;
  kd=0.7;
  ke=1;
  Ca=[1,1,0];
  Cfl=[1,0.2,0];
  Oc=[0.9,0,0];
  v=[10;10;10]
  for i=1:size(topo)(1)
    Amb=ka*(Ca.*Oc);
    
    dif=kd*(Cfl.*Oc)*([0;1;0]'*normales(1:3,i));
    
    r=2*([0;1;0]'*normales(1:3,i))*normales(1:3,i)-[0;1;0];
    vp=(v-geom(topo(i,1),1:3)')/norm(v-geom(topo(i,1),1:3)');
    if (r'*vp)>0
      esp=ke*(Cfl.*Oc)*((r'*vp)^2);
    else
      esp=[0,0,0];
    endif
    colors=[colors;Amb+dif+esp];
    
  endfor
    
  normales;
  axis equal;
  patch('Vertices',geom(:,1:3),'Faces', topo,"FaceColor","flat","EdgeColor","none","FaceVertexCData",colors);
endfunction
