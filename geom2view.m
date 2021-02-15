function [G2V]=geom2view(ojo, at)
  na=(ojo-at)/norm(ojo-at);
  Qup=[0;0;1];
  up=(eye(3)-na*(na'))*Qup;
  up=up/norm(up);
  G2V=[cross(up,na), up, na, zeros(3,1);
      0 0 0 1];
end