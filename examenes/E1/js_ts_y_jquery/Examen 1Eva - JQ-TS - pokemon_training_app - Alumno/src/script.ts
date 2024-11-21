import Pokemon from './pokemon.js';
import IPokemon from './pokemon.js';

class PokemonTrainer {
    private pokemonData: Pokemon[] = [];

    async loadPokemonList(): Promise<void> {
        
        try {
            const response = await fetch('http://localhost:3000/pokemon_data');
            
            if (!response.ok) {
                throw new Error('Failed to load Pokemon data');
            }

            const data: IPokemon[] = await response.json();
            
            this.pokemonData = data.map(pokemon => new Pokemon(
                pokemon.id,
                pokemon.name,
                pokemon.attack,
                pokemon.defense,
                pokemon.speed,
                pokemon.hp,
                pokemon.special_attack
            ));

            this.populatePokemonList();
        } catch (error) {
            console.error("Error",error);
            alert('Error loading Pokemon data.');
        }
    }

    async updatePokemonData(updatedPokemon: Pokemon): Promise<void> {
        try {
            console.log('Enviando datos actualizados al servidor:', updatedPokemon);
            
            const response = await fetch('http://localhost:3000/pokemon_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPokemon)
            });

            if (!response.ok) {
                throw new Error('Failed to update Pokemon data');
            }

            console.log('Pokemon data updated successfully');
        } catch (error) {
            console.error('Error updating Pokemon data:', error);
            alert('Failed to update Pokémon data.');
        }
    }

    populatePokemonList() {
        const dropdown = $('#pokemon-list');

        dropdown.empty();

        this.pokemonData.forEach((pokemon) => {
            dropdown.append(
                `<option value="${pokemon.id}">${pokemon.name}</option>`
            );
        });
    }

    trainPokemon() {
        $("#results").text("Training in progress...");
            
        let stat = $('#stat-to-train').val() as string;
        let percentage = $('#training-percentage').val() as number;
        let pokeId = $('#pokemon-list').val() as number;
        
        const pokemon = this.pokemonData.find(pokemon => pokemon.id == pokeId);

        let duration = Math.round(Math.random()*10000);

        setTimeout(async () => {
            pokemon!.train(stat, percentage);

            $('#update-poke').show();

            $('#update-poke').on('click', () => {
                trainer.updatePokemonData(pokemon!);
            });

            $("#results").text(`Training completed! ${pokemon!.name}'s ${stat} has been increased by ${percentage}%`);
        }, duration);
    }
}

export { };

const trainer = new PokemonTrainer();
trainer.loadPokemonList();

$('#start-training').on('click', () => {
    trainer.trainPokemon();
});

$('#update-poke').hide();