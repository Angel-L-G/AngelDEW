function processText(text) {
    text = text.toLowerCase().trim();
    let score = 0;

    if (text.startsWith("el") || text.startsWith("la")) {
        score += 1;
    }
    
    if (text.endsWith("ando") || text.endsWith("endo")) {
        score += 10;
    }

    if (/\bcon\b/.test(text)) {
        score += 100;
    }

    return score;
}
