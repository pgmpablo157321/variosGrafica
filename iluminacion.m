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
[vert,fac]=readstlascii("Silla.stl");
vert=rotx*vert;

vert(4,:)=1;

%calcular normales
for i=1:length(fac(:,1))
  a1=vert(1:3, fac(i,1));
  a2=vert(1:3, fac(i,2));
  a3=vert(1:3, fac(i,3));
  n(1:3,i)=cross(a2-a1,a3-a2);
  n(1:3,i)=n(1:3,i)/norm(n(1:3,i));
end
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

ka=0.3;
c=[1 1 1];
Oc=[0.8 0.6 1];

%Luz Ambiente
Ca=ka*(c.*Oc);

axis equal
view(3);

%... CODIGO


%Luz difusa
kd=0.6;
for i=1:length(fac(:,1))
  Cd(i,:)=kd*(c.*Oc)*(n(:,i)'*d);
  if(Cd(i,1)<0)
    Cd(i,1)=0;
  end
  if(Cd(i,2)<0)
    Cd(i,2)=0;
  end
  if(Cd(i,3)<0)
    Cd(i,3)=0;
  end
  Cd(i,:)=Cd(i,:)+Ca;
end

p2=patch('Vertices',vert(1:3,:)','Faces',fac,...
     'FaceVertexCData',Cd,'FaceColor','flat','EdgeColor','none');

axis equal
view(3);

%... CODIGO


%Luz especular

ke=0.0;
for i=1:length(fac(:,1))
  r=2*(n(:,i)'*d)*n(:,i)-d;
  Ce(i,:)=ke*(c.*Oc)*(n(:,i)'*r)^3;
  if(Ce(i,1)<0)
    Ce(i,1)=0;
  end
  if(Ce(i,2)<0)
    Ce(i,2)=0;
  end
  if(Ce(i,3)<0)
    Ce(i,3)=0;
  end
  Ce(i,:)=Ce(i,:)+Cd(i,:);
end
figure(2);
p3=patch('Vertices',vert(1:3,:)','Faces',fac,...
      'FaceVertexCData',Ce,'FaceColor','interp','EdgeColor','none');

axis equal
view(3);


%... CODIGO

      
