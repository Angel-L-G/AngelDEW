function isPalindrome(text) {
    // Elimina los espacios y convierte todo a minúsculas
    const cleanedText = text.replace(/\s+/g, '').toLowerCase();
    const reversedText = cleanedText.split('').reverse().join('');

    if (cleanedText === reversedText) {
        console.log("El texto es un palíndromo.");
    } else {
        console.log("El texto no es un palíndromo.");
    }
}

isPalindrome("A man, a plan, a canal: Panama");
isPalindrome("racecar");