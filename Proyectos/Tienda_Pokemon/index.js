import Pokemon from "./js/classes/Pokemon.js";
import SesionManager from "./js/classes/SesionManager.js"
import UserData from "./js/classes/UserData.js"
import save, { getById } from "./js/DB/DAO.js";

async function fetchData(uri, resultType) {
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

export async function setHtml(items){
    let htmlList = document.getElementById("items");
    htmlList.innerHTML = "";

    items.forEach(poke => {
        let div = document.createElement("div");
        div.classList.add("poke-card");

        let imgFront = document.createElement("img");
        imgFront.src = poke.frontSprite;

        let imgBack = document.createElement("img");
        imgBack.src = poke.backSprite;

        let paragraphName = document.createElement("p");
        paragraphName.textContent = poke.name;

        let paragraphTypes = document.createElement("p");
        paragraphTypes.textContent = poke.types.join(", ");
        paragraphTypes.classList.add("types");

        let buyButton = document.createElement("button");
        buyButton.textContent = "Añadir Al Carrito";
        buyButton.classList.add("btnComprar");
        buyButton.addEventListener("click", () => {
            addToCart(poke);
        });

        let wishButton = document.createElement("button");
        wishButton.textContent = "Añadir A Deseados";
        wishButton.classList.add("btnDeseado");
        wishButton.addEventListener("click", () => {
            addToWished(poke);
        });

        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        buttonContainer.appendChild(buyButton);
        buttonContainer.appendChild(wishButton);

        div.appendChild(imgFront);
        div.appendChild(imgBack);
        div.appendChild(paragraphName);
        div.appendChild(paragraphTypes);
        div.appendChild(buttonContainer);

        htmlList.appendChild(div);
    });
}

export async function fetchPokemons() {
    let items = await fetchData("pokemon?limit=151", "pokemon");
    await setHtml(items);
}

async function fetchPokemonsByType() {
    setHtml([{name: "Loading..."}]);

    let input = document.getElementById("typeFilter");
    let type = input.value;

    if (type == '') {
        fetchPokemons();
        return;
    }

    let pokemons = await fetchData("type/" + type, "type");
    setHtml(pokemons);
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
    setHtml(pokemons);
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

    let items = await fetchData("pokemon?limit=151", "pokemon");

    let newItems = await filterByTotalStats(items, stat);

    setHtml(newItems);
}

async function addToCart(p) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    console.log(cart);
    console.log(Array.isArray(cart));

    if (cart == null) {
        cart = [];
        cart[0] = p;
    }else {
        cart.push(p);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

async function addToWished(p) {
    try {
        let uid = JSON.parse(localStorage.getItem('user')).uid;
        const userData = await getById(uid);

        if (!userData) {
            console.error("No se encontraron datos de usuario para este UID.");
            return;
        }

        let userDataObj = new UserData(uid);
        userDataObj.wishes = userData.wishes;
        userDataObj.history = userData.history;
 
        userDataObj.wishes.push(p);
        userDataObj.wishes = JSON.stringify(userDataObj.wishes);
        userDataObj.wishes = JSON.parse(userDataObj.wishes);

        const data = userDataObj.toJson();
        await save(uid, data);

    } catch (error) {
        console.error("Error al añadir el Pokémon a la lista de deseos:", error);
    }
}

function redirectToUserData() {
    window.location.href = "userList.html";
}

function redirectToHistory() {
    window.location.href = "history.html";
}

function initApp() {
    fetchPokemons();
    
    document.getElementById("btnCartWished").addEventListener("click",redirectToUserData);
    document.getElementById("btnHistory").addEventListener("click",redirectToHistory);
    document.getElementById("typeFilter").addEventListener("keyup",fetchPokemonsByType);
    document.getElementById("genFilter").addEventListener("keyup",fetchPokemonsByGen);
    document.getElementById("statFilter").addEventListener("keyup",fetchPokemonsByStats);
}

initApp();