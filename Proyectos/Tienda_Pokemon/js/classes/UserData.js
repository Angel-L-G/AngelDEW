export default class UserData{
    constructor(uid){
        this.uid = uid;
        this.wishes = [];
        this.history = [];
    }

    addCartToHistory(cart) {
        this.history.push(cart);
    }

    addToWished(p){
        this.wishes.push(p);
    }

    toJson() {
        // Asegúrate de que 'history' es un array
        if (!Array.isArray(this.history)) {
            console.error("Error: 'history' no es un array.");
            return;
        }
    
        // Convierte 'history' en un diccionario
        const historyDict = this.history.reduce((acc, arr, index) => {
            acc[`${index}`] = arr;
            return acc;
        }, {});
    
        console.log(historyDict);
    
        // Retorna el objeto con el diccionario de 'history'
        return {
            uid: this.uid,
            wishes: this.wishes,
            history: historyDict // Aquí usas el diccionario generado
        };
    }    
}