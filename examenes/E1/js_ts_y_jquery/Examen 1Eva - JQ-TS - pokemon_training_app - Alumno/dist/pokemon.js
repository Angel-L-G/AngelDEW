// Interface for the Pokémon Trainer class
export default class Pokemon {
    constructor(id, name, attack, defense, speed, hp, special_attack) {
        this.id = id;
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.hp = hp;
        this.special_attack = special_attack;
    }
    train(stat, percentage) {
        switch (stat) {
            case "attack":
                this.attack += this.attack * percentage / 100;
                this.attack = Math.round(this.attack);
                break;
            case "defense":
                this.defense += this.defense * percentage / 100;
                this.defense = Math.round(this.defense);
                break;
            case "speed":
                this.speed += this.speed * percentage / 100;
                this.speed = Math.round(this.speed);
                break;
            case "hp":
                this.hp += this.hp * percentage / 100;
                this.hp = Math.round(this.hp);
                break;
            case "special_attack":
                this.special_attack += this.special_attack * percentage / 100;
                this.special_attack = Math.round(this.special_attack);
                break;
            default:
                console.log("Invalid stat");
                break;
        }
    }
}
