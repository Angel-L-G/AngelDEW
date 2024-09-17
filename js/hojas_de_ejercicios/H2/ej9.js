function checkLetterCase(text) {
    if (text === text.toUpperCase()) {
        console.log("Todas las letras son mayúsculas.");
    } else if (text === text.toLowerCase()) {
        console.log("Todas las letras son minúsculas.");
    } else {
        console.log("Es una combinación de mayúsculas y minúsculas.");
    }
}
