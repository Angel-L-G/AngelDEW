const mensaje: string = "¡Hola desde TypeScript!";
$("#output1").text(mensaje);

// Ejercicio D1S1.1.2: Crea un objeto Freddy con nombre, edad y pesadilla, y muéstralo en "output2"
interface Freddy {
    nombre: string;
    edad: number;
    pesadilla: string;
}

const freddy: Freddy = {
    nombre: "Freddy Krueger",
    edad: 40,
    pesadilla: "Pesadilla en Elm Street"
};
$("#output2").text(`Nombre: ${freddy.nombre}, Edad: ${freddy.edad}, Pesadilla: ${freddy.pesadilla}`);

// Ejercicio D1S2.1.1: Función atacar
function atacar(arma: string): void {
    $("#output3").text(`Freddy ataca con ${arma}`);
}
atacar("guantes con cuchillas");

// Ejercicio D1S2.1.2: Función saltar con parámetro opcional
function saltar(metros?: number): void {
    const distancia = metros ?? "una altura misteriosa";
    $("#output4").text(`Freddy salta ${distancia} metros`);
}

saltar();
saltar(5);

// Ejercicio D1S2.2.1: Clase Pesadilla con función tradicional gritar
class Pesadilla {
    gritar(nombre: string): string {
        return `${nombre.toUpperCase()} está aquí!`;
    }
}
const pesadilla = new Pesadilla();
$("#output5").text(pesadilla.gritar("Freddy"));

// Ejercicio D1S2.2.2: Clase Pesadilla con función flecha gritar
class PesadillaFlecha {
    gritar = (nombre: string): string => {
        return `${nombre.toUpperCase()} está aquí!`;
    }
}
const pesadillaFlecha = new PesadillaFlecha();
$("#output6").text(pesadillaFlecha.gritar("Freddy"));
