## Copyright (C) 2019 pgmpa
## 
## This program is free software: you can redistribute it and/or modify it
## under the terms of the GNU General Public License as published by
## the Free Software Foundation, either version 3 of the License, or
## (at your option) any later version.
## 
## This program is distributed in the hope that it will be useful, but
## WITHOUT ANY WARRANTY; without even the implied warranty of
## MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
## GNU General Public License for more details.
## 
## You should have received a copy of the GNU General Public License
## along with this program.  If not, see
## <https://www.gnu.org/licenses/>.

## -*- texinfo -*- 
## @deftypefn {} {@var{retval} =} sBezier (@var{input1}, @var{input2})
##
## @seealso{}
## @end deftypefn

## Author: pgmpa <pgmpa@DESKTOP-KHKLK0U>
## Created: 2019-05-16

function val= sBezier (u, v, puntos, pesos)
  val=puntos(:,1)*pesos(1)*(1-u)^2*(1-v)+puntos(:,2)*pesos(2)*2*(u)*(1-u)*(1-v)+puntos(:,3)*pesos(3)*(u)^2*(1-v)+puntos(:,4)*pesos(4)*(1-u)^2*(v)+puntos(:,5)*pesos(5)*2*(u)*(1-u)*(v)+puntos(:,6)*pesos(6)*(u)^2*(v);
  w=pesos(1)*(1-u)^2*(1-v)+pesos(2)*2*(u)*(1-u)*(1-v)+pesos(3)*(u)^2*(1-v)+pesos(4)*(1-u)^2*(v)+pesos(5)*2*(u)*(1-u)*(v)+pesos(6)*(u)^2*(v);
  val=val/w;
  val=val';
endfunction
