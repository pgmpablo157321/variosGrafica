clc
clear
close all

axis equal;

geom=[0 0 0; 0 0 1; 0 1 0; 0 1 1; 1 0 0; 1 0 1; 1 1 0; 1 1 1];
faces=[1 2 4 3; 5 6 8 7; 1 2 6 5; 2 4 8 6; 3 4 8 7; 1 3 7 5];

fig = patch('Faces',faces,'Vertices',geom,'FaceColor','white');
set(fig,'Vertices',geom);

%proyeccion en perspectiva
%vector normal al plano
n=[0;0;1]
%vector por el que pasa el plano
va=[0;0;0]
%foco
f=[10;10;10]
%puntos a proyectar
for i=1:length(geom)
P1=[geom(i,:),0]'
%vector de direccion la que vamos a proyectar
d=[f(1)-P1(1);f(2)-P1(2);f(3)-P1(3)];
%matriz de proyeccion ortogonal
Pr=[eye(3)-(d*n')/(d'*n),(d*n'*va)/(d'*n);
    zeros(1,3), 1];

geom(i,:)=(Pr*P1)'(1:3);
endfor
geom
fig2=patch('Faces',faces,'Vertices',geom,'FaceColor','black');