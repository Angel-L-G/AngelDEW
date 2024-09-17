function minMaxArrayInfo(array) {
    let minValue = Math.min(...array);
    let maxValue = Math.max(...array);
    let minIndex = array.indexOf(minValue);
    let maxIndex = array.indexOf(maxValue);

    return {
        minValue, minIndex, maxValue, maxIndex
    };
}

// Probar con un array aleatorio entre -100 y 100
let array6 = generateRandomArray(20, -100, 100);
let { minValue, minIndex, maxValue, maxIndex } = minMaxArrayInfo(array6);

console.log("Array:", array6);
console.log(`Mínimo: ${minValue} (índice ${minIndex}), Máximo: ${maxValue} (índice ${maxIndex})`);
