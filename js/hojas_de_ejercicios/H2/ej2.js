function sumAndAverage(first, ...args) {
    if (typeof first === 'undefined') {
        console.error("Debe ingresar al menos un argumento.");
        return;
    }

    let sum = 0;
    let count = 0;

    if (typeof first === 'number') {
        sum += first;
        count++;
    } else {
        console.warn(`¡AVISO! El argumento 1 "${first}" no es un número, lo ignoramos.`);
    }

    args.forEach((arg, index) => {
        if (typeof arg === 'number') {
            sum += arg;
            count++;
        } else {
            console.warn(`¡AVISO! El argumento número ${index + 2} "${arg}" no es un número, lo ignoramos.`);
        }
    });

    const average = sum / count;
    console.log(`Suma: ${sum}, Media: ${average}`);
}

sumAndAverage(1, 2,3,4,5,5,6);
