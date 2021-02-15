function [Geom,faces]=readstlascii(stlfile)
  
fid = fopen (stlfile);

Geom=[];
faces=[];
j=1;
fskipl (fid, 3);
str = fgetl (fid);

while (!isnumeric(str))

  for (i=1:3)  
    [cstr] = strsplit (str);
    x=str2double(cstr{1,3});
    y=str2double(cstr{1,4});
    z=str2double(cstr{1,5});
    Geom=[Geom [x;y;z]];
    if (i==3) 
        fskipl (fid, 4);
    endif
    str = fgetl (fid);
  end

  faces =[faces;j j+1 j+2;];
  j=j+3;

end

fclose (fid);

endfunction