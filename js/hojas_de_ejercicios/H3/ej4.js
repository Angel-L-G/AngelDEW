let array4 = generateRandomArray(15, -10, 20);  // Generar array aleatorio

let newArray = [];

array4.forEach((x) => {
    if (x <= -5) {
        let removed = newArray.shift();  // Elimina el primer elemento
        console.log(`Valor: ${x} - Se eliminó el primer elemento (${removed || 'vacío'}), nuevo tamaño: ${newArray.length}`);
    } else if (x > -5 && x <= 0) {
        let removed = newArray.pop();  // Elimina el último elemento
        console.log(`Valor: ${x} - Se eliminó el último elemento (${removed || 'vacío'}), nuevo tamaño: ${newArray.length}`);
    } else if (x > 0 && x <= 10) {
        newArray.unshift(x);  // Añade al principio
        console.log(`Valor: ${x} - Se añadió al principio, nuevo tamaño: ${newArray.length}`);
    } else if (x > 10) {
        newArray.push(x);  // Añade al final
        console.log(`Valor: ${x} - Se añadió al final, nuevo tamaño: ${newArray.length}`);
    }
});
