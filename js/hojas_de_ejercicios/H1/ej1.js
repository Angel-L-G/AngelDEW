function checkVariables(a, b, c) {
    if (a < 0 || b < 0 || c < 0) {
        console.error("Error: Al menos una variable es negativa.");
    } else if (a === 0 && b === 0 && c === 0) {
        console.error("Error: Las tres variables son iguales a 0.");
    } else if (a + b + c > 10 && a !== b && b !== c && a !== c) {
        console.error("Error: La suma de las 3 variables es mayor que 10 y las tres variables son diferentes.");
    } else {
        console.log("Las variables cumplen con las condiciones.");
    }
}

console.log("a) " + checkVariables(1,1,-2));

console.log("b) " + checkVariables(0,0,0));

console.log("c) " + checkVariables(3,2,6));