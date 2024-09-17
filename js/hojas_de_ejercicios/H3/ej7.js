function detectFirstAppearance(array) {
    let seen = new Set();

    array.forEach((num, index) => {
        if (seen.has(num)) {
            console.log(`Elemento ${num} en posición ${index} es repetido.`);
        } else {
            console.log(`Elemento ${num} en posición ${index} es la primera vez que aparece.`);
            seen.add(num);
        }
    });
}

// Probar con un array de 50 números entre 10 y 20
let array7 = generateRandomArray(50, 10, 20);
detectFirstAppearance(array7);
