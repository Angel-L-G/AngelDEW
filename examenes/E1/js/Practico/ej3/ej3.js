/*Se comprobará usando javascript que el input contenga un número natural entre 0 y 20, ambos
incluidos, usando para ello una expresión regular (no usar atributos HTML como paƩern, required,
etc.). Si el input está vacío o no conƟene un número válido, se informará al usuario (por ejemplo
con un alert) y no se hará nada más.*/

document.getElementById("lanzar").addEventListener("click", validar);
document.getElementById("parar").disabled = true;

function validar() {
    let input = document.getElementById("inputNumber");
    let num = input.value;
    let reg = new RegExp("^[0-9]{1,2}$");

    if (reg.test(num)) {
        if (num >= 0 && num <= 20) {
            //en el espacio para emiƟr mensajes se escribirá “Lanzando…”

            var interval = setInterval(function () {
                //en el espacio para emiƟr mensajes se escribirá “Lanzando…”
                document.getElementById("results").innerHTML = "<p>Lanzando...</p>";

                if (num == 0) {
                    /*Si durante cualquier momento mientras se estén Ɵrando los datos se pulsa el botón
                    “Parar” (o cuando N=0), el proceso se detendrá, el botón “Lanzar” quedará habilitado, el
                    botón “Parar” deshabilitado, se permiƟrá que el usuario modifique el input y se borrará el
                    mensaje de información. */
                    document.getElementById("results").innerHTML = "<p>No hay mas tiradas</p>";
                    clearInterval(interval);
                    parar();
                    return;
                } else {
                    //se deshabilitará el botón “Lanzar” y se habilitará el botón “Parar”
                    document.getElementById("inputNumber").disabled = true;
                    document.getElementById("lanzar").disabled = true;
                    document.getElementById("parar").disabled = false;
                }

                document.getElementById("parar").addEventListener("click", function () {
                    parar();
                    clearInterval(interval);
                });

                setTimeout(() => {
                    document.getElementById("results").innerHTML =
                        "<p>"
                        + "El valor obtenido al lanzar en el dado es " + lanzar()
                        + ", quedan " + num + " tiradas"
                        + "</p>";
                }, 3000);

                num--;
                document.getElementById("inputNumber").value = num;
            }, 10000);

        } else {
            alert("Número inválido");
        }
    } else {
        alert("Número inválido");
    }
}

function parar() {
    document.getElementById("inputNumber").disabled = false;
    document.getElementById("lanzar").disabled = false;
    document.getElementById("parar").disabled = true;
}

function lanzar() {
    return Math.floor(Math.random() * 6) + 1;
}
