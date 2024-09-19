export class Card {
    constructor(value, color) {
        this.value = value;
        this.color = color;
    }

    toString() {
        return `${this.color} ${this.value}`;
    }

    get cardValue() {
        return this.value;
    }

    get cardColor() {
        return this.color;
    }

    set cardValue(value) {
        this.value = value;
    }

    set cardColor(color) {
        this.color = color;
    }
}