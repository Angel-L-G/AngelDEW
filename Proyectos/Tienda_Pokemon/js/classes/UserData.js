export default class UserData{
    constructor(uid){
        this.uid = uid;
        this.wishes = [];
        this.history = [];
    }

    addCartToHistory(cart) {
        const currentIndex = Object.keys(this.history).length;
        this.history[currentIndex] = cart;
    }

    addToWished(p){
        this.wishes.push(p);
    }

    toJson() {
        return {
            uid: this.uid,
            wishes: this.wishes,
            history: this.history
        };
    }
    
    fromJson(data) {
        const historyArray = Object.values(data.history || {});
        return new UserData(data.uid, data.wishes || [], historyArray);
    }
}