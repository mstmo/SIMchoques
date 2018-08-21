escenario = new Escenario([720, 405], [100, 56], 60, "Screen");
p1 = new Particula("#0095DD", 10, [100, escenario.canvas.height-30], [1,0], 40);
p1.enable = 1;

p2 = new Particula("#A095DD", 10, [370, escenario.canvas.height-30], [-1,0], 20);
p2.enable = 1;

escenario.agregarElementos(p1);
escenario.agregarElementos(p2);

function set () {
	escenario.elementos[0].velocidad = document.getElementById('v1').value;
	escenario.elementos[1].velocidad = document.getElementById('v2').value;
	//alert(document.getElementById('v2').value);
	setInterval(correr, 1000/escenario.fps);
}

var a = 0;
function correr () {
escenario.update();

//escenario.colision(10);


tmpC = escenario.colision(10);
console.log(tmpC.length);
if(tmpC.length != 0 && a!=1){
	for (var i = 0; i < tmpC.length; i++) {
		//escenario.elementos[tmpC[i][0]].invertirDx();
		escenario.elementos[tmpC[i][1]].invertirDx();
		a = 1;
		console.log("colisionando");
	}
}

//
//console.log(escenario.colision());
}



//for (var i = 0; i < 3000; i++) {
//	escenario.update();
//	}