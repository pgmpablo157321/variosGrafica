clc 
clear
close all


[Geom, faces]=readstlascii("Silla.stl");
%rotar 45 grado sobre eje z



%haciendo una sombra perpendicular en el plano xy
na=[0;0;1];
va=[0;0;0];
proy1=[eye(3)-na*na' (na*na')*va
        0 0 0 1];
Sombra=proy1*[Geom;ones(1,size(Geom)(2))];
Sombra=Sombra(1:3,:);


%haciendo una sombra con direccion [-1;1;0] sobre el eje xz
na=[0;1;0];
va=[0;0;0];
d=[-1;1;0];
proy2=[eye(3)-(d*na'/(na'*d)) ((na'*va)/(na'*d))*d
        0 0 0 1];
Sombra2=proy2*[Geom;ones(1,size(Geom)(2))];
Sombra2=Sombra2(1:3,:);

%haciendo una proyeccion en perspectiva sobre el eje yz con foco en [300; 0; 100]

na=[1;0;0];
va=[0;0;0];
foco=[300;0;100];

for i=1:size(Geom)(2)
  p=Geom(1:3,i);
  Sombra3(1:3, i)=p+(na'*(va-p)/(na'*(foco-p)))*(foco-p);
  
end


%poniendole luz a la silla con el foco [300; 0; 100]

%Luz ambiente
ka=0.2;
Oc=[0.6;0.8;1];
La=[1;1;1];

Am=ka*(Oc.*La);

%Calcular normales
for i=1:size(faces)(1)
  v1=Geom(1:3,faces(i,1));
  v2=Geom(1:3,faces(i,2));
  v3=Geom(1:3,faces(i,3));
  N(1:3, i)=cross(v2-v1,v3-v2);
  N(1:3, i)=N(1:3, i)/norm(N(1:3, i));
end

%Luz difusa
kd=0.4;
Oc=[0.6;0.8;1];
Lf=[1;1;1];


for i=1:size(faces)(1)
  if N(1:3,i)'*(foco-Geom(1:3,faces(i,1))) > 0
    d=foco-Geom(1:3,faces(i,1));
    Cd(i,1:3)=kd*(Oc.*Lf)*(N(:,i)'*(d/norm(d)));
    Cd(i,1:3)=Cd(i,1:3)+Am';
  else
    Cd(i,1:3)=Am';
    
  endif
end


%luz especular


ke=0.4;
Oc=[0.6 0.8 1];
Lf=[1 1 1];


for i=1:size(faces)(1)
  if N(1:3,i)'*(foco-Geom(1:3,faces(i,1))) > 0

  else

    
  endif
end


axis equal;
hold on;
line([0 150], [0 0],[0 0],"color","r");
line([0 0], [0 150],[0 0],"color","g");
line([0 0], [0 0],[0 150],"color","b");
fig=patch('Vertices', Geom', 'Faces', faces, 'FaceVertexCData', Cd,'FaceColor','flat', 'EdgeColor', 'none');
fig2=patch('Vertices', Sombra', 'Faces', faces);
fig3=patch('Vertices', Sombra2', 'Faces', faces);
fig4=patch('Vertices', Sombra3', 'Faces', faces);


