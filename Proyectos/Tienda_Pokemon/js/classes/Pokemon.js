export default class Pokemon {
    constructor(data) {
        this.name = data.name;
        this.uri = data.url || data.uri;
        this.types = data.types.map(typeInfo => typeInfo.type.name);
        this.frontSprite = data.sprites.front_default;
        this.backSprite = data.sprites.back_default;

        this.stats = {};
        data.stats.forEach(stat => {
            this.stats[stat.stat.name] = stat.base_stat;
        });
    }
}