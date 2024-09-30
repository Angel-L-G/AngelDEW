import {Pokemon} from "./classes/Pokemon.js";

//Function for fetchong the data from the pokeapi
async function fetchData(uri, resultType) {
    console.log("Result: " + resultType);
    let response = await fetch("https://pokeapi.co/api/v2/" + uri)
        .catch(() => setHtml([{ name: "404, Not Found" }]));

    let fetchedData = await response.json();
    let items = [];

    switch (resultType) {
        case "pokemon":
            items = fetchedData.results;
            break;

        case "type":
            items = fetchedData.pokemon.map(p => p.pokemon);
            break;

        case "generation":
            items = fetchedData.pokemon_species;
            break;
    }

    const pokemons = await Promise.all(
        items.map(async (item) => {
            try {
                const detailResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + item.url.split('/').slice(-2, -1)[0]);
                const detailData = await detailResponse.json();
                return new Pokemon(detailData);
            } catch (error) {
                console.error(`Error fetching details for ${item.name}:`, error);
                return null;
            }
        })
    );

    return pokemons.filter(pokemon => pokemon !== null);
}

//This function sets the list on the html.
async function setHtml(items){
    let htmlList = document.getElementById("items");
    htmlList.innerHTML = "";

    console.log(items);

    items.forEach(poke => {
        let div = document.createElement("div");

        let imgFront = document.createElement("img");
        imgFront.src = poke.frontSprite;

        let imgBack = document.createElement("img");
        imgBack.src = poke.backSprite;

        let paragraphName = document.createElement("p");
        paragraphName.textContent = poke.name;

        let paragraphTypes = document.createElement("p");
        paragraphTypes.textContent = poke.types.map(t => {return t;});

        div.appendChild(imgFront);
        div.appendChild(imgBack);
        div.appendChild(paragraphName);
        div.appendChild(paragraphTypes);

        htmlList.appendChild(div);
    });
}

async function fetchPokemons() {
    let items = await fetchData("pokemon?limit=300", "pokemon");
    await setHtml(items);
}

fetchPokemons();

async function fetchPokemonsByType() {
    setHtml([{name: "Loading..."}]);

    let input = document.getElementById("typeFilter");
    let type = input.value;

    if (type == '') {
        fetchPokemons();
        return;
    }

    let pokemons = await fetchData("type/" + type, "type");
    setHtml(pokemons); // Ahora los pokemons son instancias de la clase Pokemon
}


async function fetchPokemonsByGen() {
    setHtml([{name: "Loading..."}]);

    let input = document.getElementById("genFilter");
    let gen = input.value;

    if (gen == '') {
        fetchPokemons();
        return;
    }

    let pokemons = await fetchData("generation/" + gen, "generation");
    setHtml(pokemons); // Ahora los pokemons son instancias de la clase Pokemon
}


async function filterByTotalStats(items, stat) {
    setHtml([{name: "Loading..."}]);

    let pokemons = await Promise.all(items.map(async (pokemon) => {
        let totalStats = 0;

        Object.values(pokemon.stats).forEach(value => {
            totalStats += value;
        });

        if (totalStats < stat) {
            pokemon = null;
        }

        return pokemon;
    }));

    return pokemons.filter(pokemon => pokemon !== null);
}

async function fetchPokemonsByStats() {
    let input = document.getElementById("statFilter");
    let stat = input.value;

    let items = await fetchData("pokemon?limit=300", "pokemon");

    let newItems = await filterByTotalStats(items, stat);

    setHtml(newItems);
}

document.getElementById("typeFilter").addEventListener("keyup",fetchPokemonsByType);
document.getElementById("genFilter").addEventListener("keyup",fetchPokemonsByGen);
document.getElementById("statFilter").addEventListener("keyup",fetchPokemonsByStats);
