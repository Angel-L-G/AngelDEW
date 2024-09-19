function safeDivide(num1, num2) {
    console.log("a");
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return "Error: Uno o ambos valores no son números.";
    }
    
    if (num2 === 0) {
        return "Error: División por cero.";
    }
    
    const result = num1 / num2;
    
    if (!isFinite(result)) {
        return "Error: El resultado es infinito.";
    }
    
    return `Resultado de la división: ${result}`;
}
console.log(safeDivide(1,0));
console.log(safeDivide("1","0"));
console.log(safeDivide(2,4));