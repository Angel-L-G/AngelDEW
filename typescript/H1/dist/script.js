"use strict";
var mensaje = "¡Hola desde TypeScript!";
$("#output1").text(mensaje);
var freddy = {
    nombre: "Freddy Krueger",
    edad: 40,
    pesadilla: "Pesadilla en Elm Street"
};
$("#output2").text("Nombre: ".concat(freddy.nombre, ", Edad: ").concat(freddy.edad, ", Pesadilla: ").concat(freddy.pesadilla));
// Ejercicio D1S2.1.1: Función atacar
function atacar(arma) {
    $("#output3").text("Freddy ataca con ".concat(arma));
}
atacar("guantes con cuchillas");
// Ejercicio D1S2.1.2: Función saltar con parámetro opcional
function saltar(metros) {
    var distancia = metros !== null && metros !== void 0 ? metros : "una altura misteriosa";
    $("#output4").text("Freddy salta ".concat(distancia, " metros"));
}
saltar();
saltar(5);
// Ejercicio D1S2.2.1: Clase Pesadilla con función tradicional gritar
var Pesadilla = /** @class */ (function () {
    function Pesadilla() {
    }
    Pesadilla.prototype.gritar = function (nombre) {
        return "".concat(nombre.toUpperCase(), " est\u00E1 aqu\u00ED!");
    };
    return Pesadilla;
}());
var pesadilla = new Pesadilla();
$("#output5").text(pesadilla.gritar("Freddy"));
// Ejercicio D1S2.2.2: Clase Pesadilla con función flecha gritar
var PesadillaFlecha = /** @class */ (function () {
    function PesadillaFlecha() {
        this.gritar = function (nombre) {
            return "".concat(nombre.toUpperCase(), " est\u00E1 aqu\u00ED!");
        };
    }
    return PesadillaFlecha;
}());
var pesadillaFlecha = new PesadillaFlecha();
$("#output6").text(pesadillaFlecha.gritar("Freddy"));
