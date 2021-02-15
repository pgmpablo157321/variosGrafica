clc
clear
close all

axis equal;

geom=[0 0 0; 0 0 1; 0 1 0; 0 1 1; 1 0 0; 1 0 1; 1 1 0; 1 1 1];
faces=[1 2 4 3; 5 6 8 7; 1 2 6 5; 2 4 8 6; 3 4 8 7; 1 3 7 5];

fig = patch('Faces',faces,'Vertices',geom,'FaceColor','none');
set(fig,'Vertices',geom);

%proyeccion en perspectiva
%vector normal al plano
na=[1/sqrt(2);1/sqrt(2);0]
%vector por el que pasa el plano
up=[0;0;1]
%foco
aux=cross(up,na);
geom2view=[aux up na]';
geom=(geom2view*geom')'

set(fig,'Vertices',geom);






