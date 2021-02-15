function [T,time, velocidad] = transformacion(t, geom, dt, a, vi)
  T=geom';
  time=t;
  velocidad=vi;
  if t <-2*vi/a
      mat=[1 0 0;
           0 1 (a*t+vi)*dt;
           0 0 1];
        T=mat*T;
  elseif t<-2*vi/a+(0.1)
      for i=1:4
        T(1,i)=T(1,i)+(1/2)*dt*T(1,i);  
        T(2,i)=T(2,i)-dt*T(2,i)*(1/(t+2*vi/a+1)^2); 
      endfor
  elseif t<-2*vi/a+(0.2)
       for i=1:4
        T(1,i)=T(1,i)-(1/2)*dt*T(1,i);  
        T(2,i)=T(2,i)+dt*T(2,i)*(1/(t+2*vi/a+1-(0.1))^2); 
      endfor
   else
      time=0;
      velocidad=vi*0.7;
  endif
     
  
  
  
  
  
endfunction