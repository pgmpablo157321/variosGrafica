clear all
close all
clc

%Sistema de referencia
s=25;
x=[0 0 0;1 0 0];
y=[0 0 0;0 1 0];
z=[0 0 0;0 0 1];
plot3 (s*x,s*y,s*z,"linewidth",8);

%Rotacion silla
thx=deg2rad(90);
rotx=[1 0 0
0 cos(thx) -sin(thx)
0 sin(thx) cos(thx)];

%Cubo
%vert = [0 0 0;1 0 0;1 1 0;0 1 0;0 0 1;1 0 1;1 1 1;0 1 1]';
%fac = [1 2 6 5;2 3 7 6;3 4 8 7;4 1 5 8;1 2 3 4;5 6 7 8];

%Figura stl
[vert,fac]=readstlascii("silla.stl");
vert=rotx*vert;

vert(4,:)=1;

%calcular normales

%... CODIGO


%Sombra
d=[1 2 2]';
d=d/norm(d);
na=[0 0 1]';
va=[0 0 0]';
Pr=[eye(3)-(d*(na')/((na')*d)) ((na')*va/((na')*d))*d;zeros(1,3) 1];
sombra=Pr*vert;
p=patch('Vertices',sombra(1:3,:)','Faces',fac,...
      'FaceVertexCData',[0.3 0.3 0.3],'FaceColor','flat','EdgeColor','none');
      

%Luz Ambiente


%... CODIGO


%Luz difusa


%... CODIGO


%Luz especular


%... CODIGO

      
