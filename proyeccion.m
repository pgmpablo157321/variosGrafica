
%proyeccion ortogonal paralela
%vector normal al plano
n=[1/sqrt(2);1/sqrt(2);0]
%vector por el que pasa el plano
va=[2;-1;5]
%matriz de proyeccion ortogonal
Pr=[eye(3)-n*n',(n*n')*va;
    zeros(1,3), 1]
    
a=[2;3;1;1];
Pr*a

%proyeccion paralela no ortogonal
%vector normal al plano
n=[-1/sqrt(2);-1/sqrt(2);0]
%vector por el que pasa el plano
va=[2;-1;5]
%vector de direccion la que vamos a proyectar
d=[sqrt(3)/2;-1/2;0]
%matriz de proyeccion ortogonal
Pr=[eye(3)-(d*n')/(d'*n),(d*n'*va)/(d'*n);
    zeros(1,3), 1]  
a=[2;3;1;1];
Pr*a


%proyeccion en perspectiva
%vector normal al plano
n=[-1/sqrt(2);-1/sqrt(2);0]
%vector por el que pasa el plano
va=[0;0;0]
%foco
f=[-1;0;0]
%puntos a proyectar
P1=[2;0;1;1];
P2=[2;2;-1;1];
%vector de direccion la que vamos a proyectar
d=[f(1)-P1(1);f(2)-P1(2);f(3)-P1(3)]
%matriz de proyeccion ortogonal
Pr=[eye(3)-(d*n')/(d'*n),(d*n'*va)/(d'*n);
    zeros(1,3), 1]  

Pr*P1

