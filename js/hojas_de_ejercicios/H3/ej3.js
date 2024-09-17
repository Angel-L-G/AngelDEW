function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  // Intercambia elementos
    }
    return array;
}

// Probamos con el array ordenado del ejercicio anterior
let shuffledArray = shuffleArray([...randomArray]);  // Usamos una copia del array
console.log("Array mezclado:", shuffledArray);
