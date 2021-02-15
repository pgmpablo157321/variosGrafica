clc
clear
close all


 colormap ("default");
 
 x=meshgrid(-5:0.02:5);
 y=meshgrid(-5:0.02:5);
 z=0.6*(x.*(3-x)-y.^2+6).^2./((x.^2+y.^2+9).*((3-x).^2+y.^2+4))
 
 contourf (x, y, z, -7:9);
 title ({"contourf() plot (filled contour lines)"; "Z = peaks()"});