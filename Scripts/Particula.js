function  Particula(color, radio, poscicionInicial, direccion, velocidad) {
	this.enable = 0;
	this.contexto;
	this.color = color;
	this.radio = radio;
	this.xy = poscicionInicial;
	this.direccion = direccion;
	this.masa = 0;
	this.velocidad = velocidad;
	this.getAvance = function(movimiento){return [movimiento[0]*this.velocidad*this.direccion[0], movimiento[1]*this.velocidad*this.direccion[1]]} 
	this.avanzar = function(movimiento){
		this.xy[0]+=(movimiento[0]*this.velocidad)*this.direccion[0];
		this.xy[1]+=(movimiento[1]*this.velocidad)*this.direccion[1];
	}

	this.dibujarFigura = function () {
		if (this.enable){
			this.contexto.beginPath();
    		this.contexto.arc(this.xy[0], this.xy[1], this.radio, 0, Math.PI*2);
    		this.contexto.fillStyle = this.color;
    		this.contexto.fill();
    		this.contexto.closePath();
    	}
	}
}

function Escenario(tamanioC, escala, fps, IDselector) {
	this.intervalID;
	this.elementos = [];
	this.fps = fps;
	this.canvas = document.getElementById(IDselector);
	this.canvas.width = tamanioC[0];
	this.canvas.height = tamanioC[1];
	this.contexto = this.canvas.getContext("2d");
	this.movimiento = [(tamanioC[0]/escala[0])/this.fps, (tamanioC[1]/escala[1])/this.fps]

	this.agregarElementos = function(objeto) {
		this.elementos.push(objeto);
	}


	this.colision = function(radio) {
		var pares = [];
		var tmpCoorX = [];

		for (var i = 0; i < this.elementos.length; i++) {
			tmpCoorX.push([i, this.elementos[i].getAvance(this.movimiento)[0]])
		};
		tmpCoorX = tmpCoorX.sort(function(a,b){ return a[1] - b[1];});

		for (var i = 0; i < tmpCoorX.length - 1; i++) {
			if((tmpCoorX[i][1] + this.elementos[tmpCoorX[i][0]].xy[0]) - radio < (this.elementos[tmpCoorX[i+1][0]].xy[0] - tmpCoorX[i][1]) + radio &&
				this.elementos[tmpCoorX[i][0]] + this.elementos[tmpCoorX[i+1][0]] != 2){
				pares.push([tmpCoorX[i][0], tmpCoorX[i+1][0]]);
			}
			if (this.elementos[tmpCoorX[i][0]] + this.elementos[tmpCoorX[i+1][0]] == 2) {
				if((tmpCoorX[i][1] + this.elementos[tmpCoorX[i][0]].xy[0]) + radio > (this.elementos[tmpCoorX[i+1][0]].xy[0] - tmpCoorX[i][1]) - radio){
					pares.push([tmpCoorX[i][0], tmpCoorX[i+1][0]]);
				}
			}
		}
		return pares;
	}

	this.update = function(){
		this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (var i = 0; i < this.elementos.length; i++) {
			this.elementos[i].contexto = this.contexto;
			this.elementos[i].dibujarFigura();
			this.elementos[i].avanzar(this.movimiento);
		}
	}
}