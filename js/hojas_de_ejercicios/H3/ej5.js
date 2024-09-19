function generateRandomArray(numElements = 10, minValue = 100, maxValue = 200) {
    let array = [];
    for (let i = 0; i < numElements; i++) {
        array.push(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
    }
    return array;
}

function sqrtArray(array) {
    return array.map(num => Math.sqrt(num));
}

// Probar con un array aleatorio entre 60 y 100
let array5 = generateRandomArray(20, 60, 100);
console.log("Array original:", array5);
console.log("Raíces cuadradas:", sqrtArray(array5));
