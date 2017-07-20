var nombresPersonas = ["Victor", "Omar", "karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Nestor", "Daniel", "Raymundo", "Fran"];
var bebidas = ["Limonada", "Naranjada", "Cerveza", "Agua fresca", "Café", "Malteada", "Refresco", "Licuado", "Eskimo", "Té"];
var comidas = ["Sopa", "Ensalada", "Pastel", "Lasaña", "Pasta", "Pizza", "Sopes", "Carnitas", "Pambazo"];
var tipo = ["entrada", "fuerte", "postre"];

function generarTipoAleatorio() {
    return tipo[Math.floor(Math.random() * tipo.length)];
}
function generarComidaAleatoria() {
    return comidas[Math.floor(Math.random() * comidas.length)];
}
function generarBebidaAleatoria() {
    return bebidas[Math.floor(Math.random() * bebidas.length)];
}
function generarNombreAleatorio() {
    return nombresPersonas[Math.floor(Math.random() * nombresPersonas.length)];
}
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generaCargoAleatorio() {
	var cargo;
	if(getRandomInteger(1,2) == 1){
		cargo = "encargado"; 
	} else {
		cargo = "mozo";
	}
	return cargo;
}
function generaAlcoholAleatorio() {
	var tieneAlcohol;
	if(getRandomInteger(1,2) == 1){
		tieneAlcohol = true; 
	} else {
		tieneAlcohol = false;
	}
	return tieneAlcohol;
}

class Persona{
	constructor(){
		this._nombre = generarNombreAleatorio();
		this._edad = getRandomInteger(20, 60);

	}
}
class Camarero extends Persona{
	constructor(){
		super();
		this._cargo = generaCargoAleatorio();
	}
}
var camarero1 = new Camarero();

class Cliente extends Persona{
	constructor(){
		super();
		this._dinero = getRandomInteger(0, 1500);
	}
}

class Mesa{
	constructor(id){
		this._capacidad = getRandomInteger(2, 10);
		this._id = id;
		this._ocupada = false;
		this._personas = [];
		this._ordenes = [];
	}
	getPintadoDeMesa(){
		var mesa = '<h2>' + this._id + '</h2>';
			mesa = mesa + '<label>Capacidad: ' + this._capacidad + ' </label>';
			mesa = mesa + '<label>Personas: ' + this._personas.length + ' </label>';
			mesa = mesa + '<label>Ocupada: ' + this._ocupada + ' </label>';
		return mesa;
	}
}

class Producto{
	constructor(){
		this._existencias = getRandomInteger(2, 50);
		this._calorias = getRandomInteger(700, 1000);
		this._precio = getRandomInteger(50, 100);
	}
}
class Bebida extends Producto{
	constructor(){
		super();
		this._nombre = generarBebidaAleatoria();
		this._esAlcoholica = generaAlcoholAleatorio();
		this._alcohol = getRandomInteger(4, 14);
	}
	getPintadoHTML(){
		var bebida = '<tr><td>' + this._nombre + '</td><td>' +this._precio+ '</td></tr>';
		return bebida;
	}
}
class Comida extends Producto{
	constructor(tipo, nombre){
		super();
		this._tipo = generarTipoAleatorio();
		this._nombre = generarComidaAleatoria();
	}
	getPintadoHTML(){
		var comida = '<tr><td>' + this._nombre + '</td><td>' +this._precio+ '</td></tr>';
		return comida;
	}
}

class Carta{
	constructor(){
		this._bebidas = [];
		this._platillos = [];
	}
	addBebidas(){
		for (var i = 0; i < 5; i++) {
			this._bebidas.push(new Bebida());
		}	
	}
	addPlatillos(){
		for (var i = 0; i < 5; i++) {
			this._platillos.push(new Comida());
		}	
	}
	getPintadoTabla(producto){
		var arreglo = [];
		if(producto == "bebidas"){
			arreglo = this._bebidas;
		} else {
			arreglo = this._platillos;
		}
		var cabecera = '<thead><th colspan="2" class="titulo">'+ producto.toUpperCase() +'</th><tr><th>Nombre</th><th>Precio</th></tr></thead>';
		var divP = document.getElementById("carta");
		var tableCarta = document.createElement('table');
			tableCarta.innerHTML = cabecera;
			tableCarta.className = "tabla_carta";
		var filas ="";
		var tbody = document.createElement('tbody');
			for (var i = 0; i < arreglo.length; i++) {
				filas = filas + arreglo[i].getPintadoHTML();
			}
			tbody.innerHTML = filas;
			tableCarta.appendChild(tbody);
		divP.insertBefore(tableCarta, null);
	}
}
var carta = new Carta();
	carta.addBebidas();
	carta.addPlatillos();

class Restaurante{
	constructor(nombre, carta){
		this._nombre = nombre;
		this._mesas = [];
		this._camareros = [];
		this._carta = carta;
	}
	putMesas(){
		for(var i=0; i<30; i++){
			this._mesas.push(new Mesa(i));
		}
	}
	putCamareros(){
		for (var i = 0; i < 5; i++) {
			this._camareros.push(new Camarero());
		}
	}
	pintarMesas(){
		var divP = document.getElementById("restaurante");
		for(var i=0; i<this._mesas.length; i++){
			var div = document.createElement('div');
			div.innerHTML = this._mesas[i].getPintadoDeMesa();
			div.className = "mesa"
			divP.insertBefore(div,null);
		}
	}
	pintarRestaurante(){
		this.pintarMesas();
		this._carta.getPintadoTabla('bebidas');
		this._carta.getPintadoTabla('platillos');
	}
}

var miRestaurante = new Restaurante("Krusty Krab", carta);
	miRestaurante.putMesas();
	miRestaurante.putCamareros();
	//miRestaurante.pintarRestaurante();
	


//clase de carta con un array de 5 bebidas y otro de 5 platillos