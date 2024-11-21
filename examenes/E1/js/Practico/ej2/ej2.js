/*Implemente una función llamada json2sessionStorage() que copie/mueva datos de un
json al sessionStorage. Esta función acepta un parámetro opcional, si es false (por defecto), copia las
cookies, si es true, las mueve */

function json2sessionStorage(json, move = false) {
    if (move) {
        sessionStorage.clear();
    }
    for (let key in json) {
        sessionStorage.setItem(key, json[key]);
    }
}

/*Implemente la función inversa sessionStorage2json(), con el mismo comportamiento descrito
anteriormente. Para las pruebas y la corrección, escriba algunos datos de prueba y compruebe que realmente las
funciones operan correctamente */

function sessionStorage2json(move = false) {
    let json = {};
    for (let i = 0; i < sessionStorage.length; i++) {
        json[sessionStorage.key(i)] = sessionStorage.getItem(sessionStorage.key(i));
        if (move) {
            sessionStorage.removeItem(sessionStorage.key(i));
        }
    }
    return json;
}

let json = {
    "name": "Pedro",
    "age": 25,
    "city": "Cordoba"
};

json2sessionStorage(json);
console.log(sessionStorage2json());

json2sessionStorage(json, true);
console.log(sessionStorage2json());

json2sessionStorage(json);
console.log(sessionStorage2json(true));