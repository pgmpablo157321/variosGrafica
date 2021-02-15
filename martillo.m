clc
clear
close all

t=0;
w=1;
geomXY=[0 0 1; 5 0 1; NaN NaN NaN];
faces=[1 2 3];
axis equal;
axis([-10 20 -10 20]);

[theta1, theta2]=angulos(t, w);
T=[cos(theta1) -sin(theta1) 15*cos(theta2);
     sin(theta1)  cos(theta1) 15*sin(theta2);
     0 0 1];
geomGlobal=T*(geomXY')
fig = patch('Faces',faces,'Vertices',geomGlobal,'FaceColor','black');
while t<500
  [theta1, theta2]=angulos(t, w);
  T=[cos(theta2) -sin(theta2) 15*cos(theta1);
     sin(theta2)  cos(theta2) 15*sin(theta1);
     0 0 1];
  geomGlobal=T*(geomXY');
  set(fig,'Vertices',geomGlobal');
  t+=0.02;
  pause(0.001);
endwhile

