clc
clear
close all
hold on
figure(1)
#EJES
plot([-12 12],[0 0],'b');
plot([0 0],[12 -12],'b');
axis([-6 6 0 12]);
#FIGURA BASICA
geom = [-0.5 10 1;0.5 10 1;0.5 11 1;-0.5 11 1];
faces = [1 2 3 4];
hold on;
fig = patch('Faces',faces,'Vertices',geom,'FaceColor','black');
#Animacion
t = 14/9.8;
a = -9.8;
vi= 14;
while (vi>0.1)
  [geom,t,vi] = transformacion(t, geom, 0.02, a, vi);
  geom=geom';
  set(fig,'Vertices',geom);
  t+=0.02;
  sleep(0.001);
endwhile