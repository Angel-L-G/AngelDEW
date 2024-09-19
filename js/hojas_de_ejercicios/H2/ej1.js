function countCharacterInText(text, char) {
    console.log("a");
    if (typeof char !== 'string' || char.length !== 1) {
        console.error("El segundo parámetro debe ser un único carácter.");
        return;
    }

    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === char) {
            count++;
        }
    }
    console.log(`El carácter "${char}" aparece ${count} veces en el texto.`);
}

countCharacterInText("abca", "a");