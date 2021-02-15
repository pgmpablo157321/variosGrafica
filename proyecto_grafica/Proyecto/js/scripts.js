var scene = new THREE.Scene();
var dh = document.getElementById("DrawHere");
var renderer = new THREE.WebGLRenderer({ canvas: dh });
var camera = new THREE.PerspectiveCamera(60, 1820 / 900, .1, 1000);
var controls = new THREE.OrbitControls(camera, dh);
camera.position.set(0, 0, 5);//Eye
camera.lookAt(0, 0, 0);//At
renderer.setSize(1820, 900);
document.body.appendChild(renderer.domElement);

var seleccionado = false;

material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var FizzyText = function () {
    this.Punto = 1;
    this.X = objetos[this.Punto - 1].position.x;
    this.Y = objetos[this.Punto - 1].position.y;
    this.Z = objetos[this.Punto - 1].position.z;
    this.Colores = true;
    // Define render logic ...
};

window.onload = function () {
    var text = new FizzyText();
    var gui = new dat.GUI();
    var c1 = gui.add(text, 'Punto', [1, '1', 2, '2', 3, '3', 4, '4', 5, '5', 6, '6', 7, '7', 8, '8', 9, '9', 10, '10', 11, '11',
        12, '12', 13, '13', 14, '14', 15, '15', 16, '16', 17, '17', 18, '18', 19, '19', 20, '20', 21, '21', 22, '22', 23, '23', 24,
        '24', 25, '25', 26, '26', 27, '27']);
    var c2 = gui.add(text, 'X');
    var c3 = gui.add(text, 'Y');
    var c4 = gui.add(text, 'Z');
    var c5 = gui.add(text, 'Colores');

    var obj = { add: function () { updateColors() } };

    gui.add(obj, 'add').name('Actualizar Colores');
    c1.onChange(function (value) {
        for (let index = 0; index < objetos.length; index++) {
            objetos[index].material = material;
        }
        objetos[value - 1].material = material2;

        text.X = objetos[value - 1].position.x;
        c2.updateDisplay();
        text.Y = objetos[value - 1].position.y;
        c3.updateDisplay();
        text.Z = objetos[value - 1].position.z;
        c4.updateDisplay();
    });
    c2.onChange(function (value) {
        mover(text.Punto - 1, value, text.Y, text.Z);
    });
    c3.onChange(function (value) {
        mover(text.Punto - 1, text.X, value, text.Z);
    });
    c4.onChange(function (value) {
        mover(text.Punto - 1, text.X, text.Y, value);
    });
    c5.onChange(function (value) {
        console.log(value);
    });
};


//aqui va la geometria del objeto a deformar

var geom;
var materialN;
var figure;
var bBox;
var tBoxDimentions
var h=2;
var w=2;
var d=2;
var original;
//var loader = new THREE.OBJLoader();




// loader.load('skull.obj', function (object) { 
//     geom = new THREE.Geometry().fromBufferGeometry(object.children[0].geometry);
//     materialN = new THREE.MeshBasicMaterial();
//     figure = new THREE.Mesh(geom, materialN);
//     scene.add(figure);
//     bBox=getBoundingBox(geom)
//     tBoxDimentions=getTargetBoxDimentions(bBox)
//     h = tBoxDimentions[0] + 0.5;
//     w = tBoxDimentions[1] + 0.5;
//     d = tBoxDimentions[2] + 0.5;
//     contain(bBox, tBoxDimentions);
//     setTimeout(function(){
//         original = figure.geometry.clone();
//         animate();
//     }, 500)
//     figure.geometry.verticesNeedUpdate = true;
//     figure.geometry.dynamic = true;
//     figure.material.vertexColors = THREE.FaceColors
    
    
    
// })


//obteniendo la caja actual donde se encierra
var getBoundingBox = function (geom) {
    var Xmin = geom.vertices[0].x, Ymin = geom.vertices[0].y, Zmin = geom.vertices[0].z;
    var Xmax = geom.vertices[0].x, Ymax = geom.vertices[0].y, Zmax = geom.vertices[0].z;
    for (var i = 0; i < geom.vertices.length; i++) {
        if (geom.vertices[i].x < Xmin) {
            Xmin = geom.vertices[i].x;
        }
        if (geom.vertices[i].y < Ymin) {
            Ymin = geom.vertices[i].y;
        }
        if (geom.vertices[i].z < Zmin) {
            Zmin = geom.vertices[i].z;
        }
        if (geom.vertices[i].x > Xmax) {
            Xmax = geom.vertices[i].x;
        }
        if (geom.vertices[i].y > Ymax) {
            Ymax = geom.vertices[i].y;
        }
        if (geom.vertices[i].z > Zmax) {
            Zmax = geom.vertices[i].z;
        }

    }

    return [Xmin, Xmax, Ymin, Ymax, Zmin, Zmax];
}



//calculando la caja donde se va a meter
var getTargetBoxDimentions = function (boundingBox) {
    var factor = 0.6;
    var dim = [];
    dim.push(factor, factor * (boundingBox[3] - boundingBox[2]) / (boundingBox[1] - boundingBox[0]), factor * (boundingBox[5] - boundingBox[4]) / (boundingBox[1] - boundingBox[0]));
    return dim;
}



//moviendo el objeto para contenerlo en la caja deseada el objeto en una caja deseada

var contain = function (boundingBox, tBoxDimentions) {
    var m = new THREE.Matrix4();
    m.set((tBoxDimentions[0]) / (boundingBox[1] - boundingBox[0]), 0, 0, -tBoxDimentions[0]/2-(tBoxDimentions[0]*boundingBox[0])/ (boundingBox[1] - boundingBox[0]),
        0, (tBoxDimentions[1]) / (boundingBox[3] - boundingBox[2]), 0, -tBoxDimentions[1]/2-(tBoxDimentions[1]*boundingBox[2])/ (boundingBox[3] - boundingBox[2]),
        0, 0, (tBoxDimentions[2]) / (boundingBox[5] - boundingBox[4]), -tBoxDimentions[2]/2-(tBoxDimentions[2]*boundingBox[4])/ (boundingBox[5] - boundingBox[4]),
        0, 0, 0, 1)

    figure.geometry.applyMatrix(m);
    figure.updateMatrix();
    
    return m;
}



//para calcular los polinomios de interpolacion
var getPoly = function (x, y, z) {
    var ans = [0];
    var polyX = [];
    var polyY = [];
    var polyZ = [];
    for (var i = 0; i < x.length; i++) {
        var coef = 1;
        var aux = [1];
        for (var j = 0; j < x.length; j++) {
            if (i != j) {
                coef /= (x[i] - x[j]);
                aux = polyMult(aux, [-x[j], 1]);
            }
        }
        aux = polyMult(aux, [coef]);
        polyX.push(aux);
    }

    for (var i = 0; i < y.length; i++) {
        var coef = 1;
        var aux = [1];
        for (var j = 0; j < y.length; j++) {
            if (i != j) {
                coef /= (y[i] - y[j]);
                aux = polyMult(aux, [-y[j], 1]);
            }
        }
        aux = polyMult(aux, [coef]);
        polyY.push(aux);
    }

    for (var i = 0; i < z.length; i++) {
        var coef = 1;
        var aux = [1];
        for (var j = 0; j < z.length; j++) {
            if (i != j) {
                coef /= (z[i] - z[j]);
                aux = polyMult(aux, [-z[j], 1]);
            }
        }
        aux = polyMult(aux, [coef]);
        polyZ.push(aux);
    }

    return [polyX, polyY, polyZ];
}

//funcion para interpolar, polyX: polynomios en x, polyY: polnomios en y, polyZ: polynomios en z, U: valores de movimiento, x,y,z punto
var interpolacion = function (polyX, polyY, polyZ, U, x, y, z) {
    var ans = 0;
    for (var i = 0; i < polyX.length; i++) {
        for (var j = 0; j < polyY.length; j++) {
            for (var k = 0; k < polyZ.length; k++) {
                ans += (U[i][j][k] * polyVal(polyX[i], x) * polyVal(polyY[j], y) * polyVal(polyZ[k], z))
            }
        }
    }
    return ans;
}


//sumar polynomios
var polySum = function (p1, p2) {
    var ans = [];
    for (var i = 0; i < Math.max(p1.length, p2.length); i++) {
        var aux = 0;
        if (i < p1.length) {
            aux += p1[i];
        }
        if (i < p2.length) {
            aux += p2[i];
        }
        ans.push(aux);
    }
    return ans;
}

//multiplicar polynomios
var polyMult = function (p1, p2) {
    var ans = [];
    for (var i = 0; i < p1.length + p2.length - 1; i++) {
        var aux = 0;
        for (var j = 0; j <= i; j++) {
            if (j < p1.length && (i - j) < p2.length)
                aux += (p1[j] * p2[i - j]);
        }
        ans.push(aux);
    }
    return ans;
}

//evaluar polyniomios

var polyVal = function (p, x) {
    var ans = 0;
    var aux = 1;
    for (var i = 0; i < p.length; i++) {
        ans += (aux * p[i]);
        aux *= x;
    }
    return ans;
}




//Añadiendo los puntos de control


function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function llenarArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[0].length; j++) {
            for (var k = 0; k < arr[0][0].length; k++) {
                arr[i][j][k] = 0;
            }
        }
    }
}
var vertex = [];
var v = [];
var material;

var objetos = [];
var puntos = function () {
    vertex = createArray(3, 3, 3);
    v = createArray(3, 3, 3);
    material = new THREE.MeshBasicMaterial();

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                vertex[i][j][k] = new THREE.SphereGeometry(0.03, 50, 50);
                v[i][j][k] = new THREE.Mesh(vertex[i][j][k], material);
            }
        }
    }


    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                v[i][j][k].position.x = ((i % 3) - 1) * w / 2;
                v[i][j][k].position.y = ((j % 3) - 1) * h / 2;
                v[i][j][k].position.z = ((k % 3) - 1) * d / 2;
                scene.add(v[i][j][k]);
                objetos.push(v[i][j][k]);
            }
        }
    }
}

puntos();


var drag = new THREE.DragControls(objetos, camera, renderer.domElement);

drag.addEventListener('dragstart', dragStartCallback);
drag.addEventListener('dragend', dragendCallback);
function dragStartCallback(event) {
    controls.enabled = false;
}
function dragendCallback(event) {
    controls.enabled = true;
}

//se obtienen las lineas de la caja en la que se va a encerrar
var geomLines = [];
var line = [];
var getLines = function (v) {

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            geomLines.push(new THREE.Geometry())
            geomLines[3 * i + j].vertices.push(new THREE.Vector3(v[i][j][0].position.x, v[i][j][0].position.y, v[i][j][0].position.z));
            geomLines[3 * i + j].vertices.push(new THREE.Vector3(v[i][j][1].position.x, v[i][j][1].position.y, v[i][j][1].position.z));
            geomLines[3 * i + j].vertices.push(new THREE.Vector3(v[i][j][2].position.x, v[i][j][2].position.y, v[i][j][2].position.z));
            line.push(new THREE.Line(geomLines[3 * i + j], new THREE.MeshBasicMaterial()));
            scene.add(line[3 * i + j]);
        }
    }
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            geomLines.push(new THREE.Geometry())
            geomLines[3 * i + j + 9].vertices.push(new THREE.Vector3(v[i][0][j].position.x, v[i][0][j].position.y, v[i][0][j].position.z));
            geomLines[3 * i + j + 9].vertices.push(new THREE.Vector3(v[i][1][j].position.x, v[i][1][j].position.y, v[i][1][j].position.z));
            geomLines[3 * i + j + 9].vertices.push(new THREE.Vector3(v[i][2][j].position.x, v[i][2][j].position.y, v[i][2][j].position.z));
            line.push(new THREE.Line(geomLines[3 * i + j + 9], new THREE.MeshBasicMaterial()));
            scene.add(line[3 * i + j + 9]);
        }
    }
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            geomLines.push(new THREE.Geometry())
            geomLines[3 * i + j + 18].vertices.push(new THREE.Vector3(v[0][j][i].position.x, v[0][j][i].position.y, v[0][j][i].position.z));
            geomLines[3 * i + j + 18].vertices.push(new THREE.Vector3(v[1][j][i].position.x, v[1][j][i].position.y, v[1][j][i].position.z));
            geomLines[3 * i + j + 18].vertices.push(new THREE.Vector3(v[2][j][i].position.x, v[2][j][i].position.y, v[2][j][i].position.z));
            line.push(new THREE.Line(geomLines[3 * i + j + 18], new THREE.MeshBasicMaterial()));
            scene.add(line[3 * i + j + 18]);
        }
    }


}

var modifyLines = function (v) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            geomLines[3 * i + j].vertices[0].x = v[i][j][0].position.x;
            geomLines[3 * i + j].vertices[0].y = v[i][j][0].position.y;
            geomLines[3 * i + j].vertices[0].z = v[i][j][0].position.z;
            geomLines[3 * i + j].vertices[1].x = v[i][j][1].position.x;
            geomLines[3 * i + j].vertices[1].y = v[i][j][1].position.y;
            geomLines[3 * i + j].vertices[1].z = v[i][j][1].position.z;
            geomLines[3 * i + j].vertices[2].x = v[i][j][2].position.x;
            geomLines[3 * i + j].vertices[2].y = v[i][j][2].position.y;
            geomLines[3 * i + j].vertices[2].z = v[i][j][2].position.z;
        }
    }
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            geomLines[3 * i + j + 9].vertices[0].x = v[i][0][j].position.x;
            geomLines[3 * i + j + 9].vertices[0].y = v[i][0][j].position.y;
            geomLines[3 * i + j + 9].vertices[0].z = v[i][0][j].position.z;
            geomLines[3 * i + j + 9].vertices[1].x = v[i][1][j].position.x;
            geomLines[3 * i + j + 9].vertices[1].y = v[i][1][j].position.y;
            geomLines[3 * i + j + 9].vertices[1].z = v[i][1][j].position.z;
            geomLines[3 * i + j + 9].vertices[2].x = v[i][2][j].position.x;
            geomLines[3 * i + j + 9].vertices[2].y = v[i][2][j].position.y;
            geomLines[3 * i + j + 9].vertices[2].z = v[i][2][j].position.z;
        }
    }
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            geomLines[3 * i + j + 18].vertices[0].x = v[0][j][i].position.x;
            geomLines[3 * i + j + 18].vertices[0].y = v[0][j][i].position.y;
            geomLines[3 * i + j + 18].vertices[0].z = v[0][j][i].position.z;
            geomLines[3 * i + j + 18].vertices[1].x = v[1][j][i].position.x;
            geomLines[3 * i + j + 18].vertices[1].y = v[1][j][i].position.y;
            geomLines[3 * i + j + 18].vertices[1].z = v[1][j][i].position.z;
            geomLines[3 * i + j + 18].vertices[2].x = v[2][j][i].position.x;
            geomLines[3 * i + j + 18].vertices[2].y = v[2][j][i].position.y;
            geomLines[3 * i + j + 18].vertices[2].z = v[2][j][i].position.z;
        }
    }


}



//deformando
var X, Y, Z;
[X, Y, Z] = getPoly([-1, 0, 1], [-1, 0, 1], [-1, 0, 1]);
var Ux = createArray(3, 3, 3);
var Uy = createArray(3, 3, 3);
var Uz = createArray(3, 3, 3);

llenarArray(Ux);
llenarArray(Uy);
llenarArray(Uz);

var mover = function (indice, dx, dy, dz) {
    objetos[indice].position.x = dx;
    objetos[indice].position.y = dy;
    objetos[indice].position.z = dz;
}

for (var i = 0; i < Ux.length; i++) {
    for (var j = 0; j < Ux[0].length; j++) {
        for (var k = 0; k < Ux[0][0].length; k++) {
            v[i][j][k].position.x += Ux[i][j][k];
            v[i][j][k].position.y += Uy[i][j][k];
            v[i][j][k].position.z += Uz[i][j][k];
        }
    }
}
getLines(v);




//asignando los colores de la nueva figura segun la deformacion
var updateColors = function () {
    for (var i = 0; i < figure.geometry.faces.length; i++) {
        var index1 = figure.geometry.faces[i].a;
        var index2 = figure.geometry.faces[i].b;
        var index3 = figure.geometry.faces[i].c;
        var p1 = figure.geometry.vertices[index1];
        var p2 = figure.geometry.vertices[index2];
        var p3 = figure.geometry.vertices[index3];
        var vec1 = [p2.x - p1.x, p2.y - p1.y, p2.z - p1.z];
        var vec2 = [p3.x - p1.x, p3.y - p1.y, p3.z - p1.z];
        var a1 = math.norm(math.cross(vec1, vec2));
        p1 = original.vertices[index1];
        p2 = original.vertices[index2];
        p3 = original.vertices[index3];
        vec1 = [p2.x - p1.x, p2.y - p1.y, p2.z - p1.z];
        vec2 = [p3.x - p1.x, p3.y - p1.y, p3.z - p1.z];
        var a2 = math.norm(math.cross(vec1, vec2));
        var n = 4 * ((a1 / a2) * 255 / 2.7) / 256;
        var r = Math.min(Math.max(Math.min(n - 1.5, -n + 4.5), 0), 1);
        var g = Math.min(Math.max(Math.min(n - 0.5, -n + 3.5), 0), 1);
        var b = Math.min(Math.max(Math.min(n + 0.5, -n + 2.5), 0), 1);
        figure.geometry.faces[i].color.setRGB(r, g, b);

    }
    figure.geometry.colorsNeedUpdate = true;
}



var vector = new THREE.Vector3(0, 1, 0)


var animate = function () {
    for (let i = 0; i < Ux.length; i++) {
        for (let j = 0; j < Ux[0].length; j++) {
            for (let k = 0; k < Ux[0][0].length; k++) {
                Ux[i][j][k] = v[i][j][k].position.x - (((i % 3) - 1) );
                Uy[i][j][k] = v[i][j][k].position.y - (((j % 3) - 1) );
                Uz[i][j][k] = v[i][j][k].position.z - (((k % 3) - 1) );

            }

        }

    }
    for (var i = 0; i < figure.geometry.vertices.length; i++) {
        figure.geometry.vertices[i].x = original.vertices[i].x + interpolacion(X, Y, Z, Ux, original.vertices[i].x, original.vertices[i].y, original.vertices[i].z);
        figure.geometry.vertices[i].y = original.vertices[i].y + interpolacion(X, Y, Z, Uy, original.vertices[i].x, original.vertices[i].y, original.vertices[i].z);
        figure.geometry.vertices[i].z = original.vertices[i].z + interpolacion(X, Y, Z, Uz, original.vertices[i].x, original.vertices[i].y, original.vertices[i].z);

    }
    figure.geometry.verticesNeedUpdate = true;
    figure.geometry.dynamic = true;

    for (let index = 0; index < line.length; index++) {
        line[index].geometry.verticesNeedUpdate = true;

    }
    modifyLines(v);
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}


geom = new THREE.TorusGeometry( 10, 3, 16, 100 );
materialN = new THREE.MeshBasicMaterial();
figure = new THREE.Mesh(geom, materialN);
scene.add(figure);
bBox=getBoundingBox(geom)
tBoxDimentions=getTargetBoxDimentions(bBox)
h = tBoxDimentions[0] + 0.5;
w = tBoxDimentions[1] + 0.5;
d = tBoxDimentions[2] + 0.5;
contain(bBox, tBoxDimentions);
setTimeout(function(){
    original = figure.geometry.clone();
    animate();
}, 500)
figure.geometry.verticesNeedUpdate = true;
figure.geometry.dynamic = true;
figure.material.vertexColors = THREE.FaceColors

