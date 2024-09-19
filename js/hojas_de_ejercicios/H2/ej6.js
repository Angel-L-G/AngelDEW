function processCSV(text = '', separator = ',') {
    const elements = text.split(separator);
    console.log(`Se han detectado ${elements.length} elementos:`);
    elements.forEach((element, index) => {
        console.log(`Elemento ${index + 1}: ${element.trim()}`);
    });
}

processCSV("a,b,c,d,e,f,g");