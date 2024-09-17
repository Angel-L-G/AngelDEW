function displaySum(a, b) {
    // Lista de argumentos
    console.log(a, "+", b, "=", a + b);

    // Concatenación de strings
    console.log(a + " + " + b + " = " + (a + b));

    // Marcadores de posición
    console.log("%d + %d = %d", a, b, a + b);

    // Template strings
    console.log(`${a} + ${b} = ${a + b}`);
}
