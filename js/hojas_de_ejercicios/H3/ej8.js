function generateRandomArray(numElements = 10, minValue = 100, maxValue = 200) {
    let array = [];
    for (let i = 0; i < numElements; i++) {
        array.push(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
    }
    return array;
}

function detectRepeatedOccurrences(array) {
    let occurrences = {};

    array.forEach((num, index) => {
        if (occurrences[num]) {
            occurrences[num]++;
            console.log(`Elemento ${num} en posición ${index} ha aparecido ${occurrences[num] - 1} veces antes.`);
        } else {
            occurrences[num] = 1;
            console.log(`Elemento ${num} en posición ${index} es la primera vez que aparece.`);
        }
    });
}

// Probar con un array de 50 números entre 10 y 20
let array8 = generateRandomArray(50, 10, 20);
detectRepeatedOccurrences(array8);
