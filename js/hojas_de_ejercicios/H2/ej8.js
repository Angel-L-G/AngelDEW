function findAndReplaceArriba(text) {
    if (text.includes("arriba")) {
        const newText = text.replace(/arriba/g, "abajo");
        console.log("Cadena encontrada. Texto modificado:", newText);
    } else {
        console.log("No se encontró la cadena 'arriba'.");
    }
}
