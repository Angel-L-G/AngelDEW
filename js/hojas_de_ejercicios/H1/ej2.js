function checkNumber(x) {
    switch (x) {
        case 0:
            console.log('Este es muy fácil… ¡prueba otro!');
            break;
        case 2:
        case 4:
        case 6:
            console.log('El número es par');
            break;
        case 1:
        case 3:
        case 5:
            console.log('El número es impar');
            break;
        default:
            console.log('¡¡Sólo sé contar de 0 a 6!!');
    }
}

checkNumber(0);

checkNumber(2);

checkNumber(1);

checkNumber(10);