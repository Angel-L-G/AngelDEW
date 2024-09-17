function generateRandomArray(numElements = 10, minValue = 100, maxValue = 200) {
    let array = [];
    for (let i = 0; i < numElements; i++) {
        array.push(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
    }
    return array;
}
