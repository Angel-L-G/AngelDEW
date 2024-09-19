function getDNILetter(dni) {
    const letters = "TRWAGMYFPDXBNJZSQVHLCKET";
    if (typeof dni !== 'number' || dni < 0 || dni > 99999999) {
        console.error("El DNI debe ser un número entre 0 y 99999999.");
        return;
    }
    
    const remainder = dni % 23;
    return `${dni}${letters[remainder]}`;
}

console.log(getDNILetter(12345678));
