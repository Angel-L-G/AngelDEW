export class Player {
    constructor(name) {
        this._name = name;
        this.hand = [];
        this.score = 0;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    addCard(card) {
        this.hand.push(card);
    }

    removeCard(card) {
        this.hand = this.hand.filter((c) => c.cardValue!== card.cardValue || c.cardColor!== card.cardColor);
    }

    /*calculateScore() {
        let score = 0;
        this.hand.forEach((card) => {
            if (card.cardValue === "0") {
                score += 0;
            } else if (card.cardValue === "+2" || card.cardValue === "skip" || card.cardValue === "reverse") {
                score += 2;
            } else if (card.cardValue === "+4") {
                score += 4;
            }
        });
    }*/
}