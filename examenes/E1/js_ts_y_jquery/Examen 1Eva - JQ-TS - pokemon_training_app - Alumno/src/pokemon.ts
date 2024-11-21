
// TypeScript types for Pokémon data
export default interface IPokemon {
    id: number;
    name: string;
    attack: number;
    defense: number;
    speed: number;
    hp: number;
    special_attack: number;
}

// Interface for the Pokémon Trainer class
export default class Pokemon implements IPokemon {
    constructor(
        public id: number,
        public name: string,
        public attack: number,
        public defense: number,
        public speed: number,
        public hp: number,
        public special_attack: number
    ) {}

    train(stat: string, percentage: number){
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