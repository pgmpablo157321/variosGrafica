clc
clear
close all

axis equal;

geom=[0 0 0; 0 0 1; 0 1 0; 0 1 1; 1 0 0; 1 0 1; 1 1 0; 1 1 1];
faces=[1 2 4 3; 5 6 8 7; 1 2 6 5; 2 4 8 6; 3 4 8 7; 1 3 7 5];
fig=patch('Faces',faces,'Vertices',geom,'FaceColor','white');


%proyeccion en perspectiva
%vector normal al plano
ojo=[1;1;3];
at=[0;0;0];
G2V=geom2view(ojo, at)'
%vector por el que pasa el plano
V2W=view2window();

geom=V2W*G2V*([geom';ones(1,8)])
geom=[geom(1,:);geom(2,:);geom(3,:)]'
axis equal;
set(fig,'Vertices',geom);
