function [V2W]=view2window()
  umin=-1;
  vmin=-1;
  wmin=-1;
  umax=1;
  vmax=1;
  wmax=1;
  
  xmin=-2;
  ymin=-2;
  zmin=-2;
  xmax=1;
  ymax=1;
  zmax=1;
  
  kx=(umax-umin)/(xmax-xmin);
  ky=(vmax-vmin)/(ymax-ymin);
  kz=(wmax-wmin)/(zmax-zmin);
  
  V2W=[kx 0 0 umin-xmin*kx;
       0 ky 0 vmin-ymin*ky;
       0 0 kz wmin-zmin*kz;
       0 0 0 1]
  
 
end