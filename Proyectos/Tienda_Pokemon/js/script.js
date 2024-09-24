//import {Pokemon} from "./classes/Pokemon.js";

//Function for fetchong the data from the pokeapi
async function fetchdata(uri, resultType){
    let response = await fetch("https://pokeapi.co/api/v2/"+uri);
    let fetchedData = await response.json();
    let items;

    switch (resultType) {
        case "pokemon":
            items = await fetchedData.results;
            break;
        case "type":
            items = await fetchedData.pokemon;
            break;
        case "generation":
            items = await fetchedData.pokemon_species;
            break;
    }

    return items;
}

//This function sets the list on the html.
async function setHtml(items){
    let htmlList = document.getElementById("items");
    htmlList.innerHTML = "";

    items.forEach(poke => {
        let li = document.createElement("li");
        li.innerHTML = poke.name;
        htmlList.appendChild(li);
    });
}

async function fetchPokemons() {
    let items = await fetchdata("pokemon?limit=151", "pokemon");
    setHtml(items);
}

fetchPokemons();

async function fetchPokemonsByType() {
    let input = document.getElementById("typeFilter");
    let type = input.value;

    let items = await fetchdata("type/"+type, "type");
    let newItems = [];

    for (let index = 0; index < items.length; index++) {
        newItems.push(items[index].pokemon)
    }

    setHtml(newItems);
}

async function fetchPokemonsByGen() {
    let input = document.getElementById("genFilter");
    let gen = input.value;

    let items = await fetchdata("generation/"+gen, "generation");
    setHtml(items);
}

async function filterByTotalStats(items, stat) {
    setHtml([{name: "Loading"},{name: "."},{name: "."},{name: "."}])

    let newItems = await Promise.all(items.map(async (pokemon) => {
        let response = await fetch(pokemon.url);
        let fetchedData = await response.json();
        let totalStats = 0;

        fetchedData.stats.forEach(stat => {
            totalStats += stat.base_stat;
        });

        if (totalStats >= stat) {
            return pokemon;
        }

        return null;
    }));

    return newItems.filter(pokemon => pokemon !== null);
}

async function fetchPokemonByStats() {
    let input = document.getElementById("statFilter");
    let stat = input.value;

    let items = await fetchdata("pokemon?limit=1025", "pokemon");

    let newItems = await filterByTotalStats(items, stat);

    setHtml(newItems);
}