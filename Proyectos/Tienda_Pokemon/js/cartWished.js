import Pokemon from "./classes/Pokemon.js";
import UserData from "./classes/UserData.js";
import save, {getById} from "./DB/DAO.js";

async function loadCart() {
    let c = JSON.parse(localStorage.getItem('cart'));

    if (c[0] === null) {
        cart.innerHTML = "<p>Tu carrito está vacío</p>";
    } else {
        setHtml(c,'cart');
    }
}

function setHtml(pokemons, htmlTag) {
    let tag = document.getElementById(htmlTag);

    tag.innerHTML = "";

    if (htmlTag === "cart") {
        pokemons.forEach(p => {
            const statsText = Object.entries(p.stats)
                .map(([key, value]) => `${key}: ${value}`)
                .join(' | ');
        
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("pokemon-card-list");
        
            cardDiv.innerHTML = `
                <img src="${p.frontSprite}" alt="${p.name}" class="pokemon-img">
                <div class="pokemon-info">
                    <p class="pokemon-name">${p.name}</p>
                    <p class="pokemon-types">${p.types.join(", ")}</p>
                    <p class="pokemon-stats">${statsText}</p>
                </div>
            `;
        
            let button = document.createElement("button");
            button.textContent = "Quitar Del Carrito";
            button.classList.add("btn-remove");
            button.addEventListener("click", () => {
                removePokemonFromCart(p.name);
            });
        
            cardDiv.appendChild(button);
        
            tag.appendChild(cardDiv);
        });        
    } else if (htmlTag === "wished"){
        pokemons.forEach(p => {
            const statsText = Object.entries(p.stats)
                .map(([key, value]) => `${key}: ${value}`)
                .join(' | ');
        
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("pokemon-card-list");
        
            cardDiv.innerHTML = `
                <img src="${p.frontSprite}" alt="${p.name}" class="pokemon-img">
                <div class="pokemon-info">
                    <p class="pokemon-name">${p.name}</p>
                    <p class="pokemon-types">${p.types.join(", ")}</p>
                    <p class="pokemon-stats">${statsText}</p>
                </div>
            `;
        
            const buttonRemove = document.createElement("button");
            buttonRemove.textContent = "Quitar De Deseos";
            buttonRemove.classList.add("btn-remove");
            buttonRemove.addEventListener("click", () => {
                removeFromWished(p.name);
            });
        
            const buttonAdd = document.createElement("button");
            buttonAdd.textContent = "Añadir Al Carrito";
            buttonAdd.classList.add("btnComprar");
            buttonAdd.addEventListener("click", () => {
                addToCart(p);
            });
        
            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("pokemon-card-buttons");
            buttonContainer.appendChild(buttonRemove);
            buttonContainer.appendChild(buttonAdd);
        
            cardDiv.appendChild(buttonContainer);
        
            tag.appendChild(cardDiv);
        });        
    } else {
        console.log("Algo raro paso");
    }
}

async function buyCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let uid = JSON.parse(localStorage.getItem('user')).uid;

    const userData = await getById(uid);

    if (!userData) {
        console.log("No se encontraron datos de usuario en la base de datos para este UID.");
        return;
    }

    let userDataObj = new UserData(uid);
    userDataObj.wishes = userData.wishes;
    userDataObj.history = userData.history;

    userDataObj.addCartToHistory(cart);

    const data = userDataObj.toJson();
    console.log(data);
    await save(uid, data);

    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    setHtml(cart, 'cart');
}


function removePokemonFromCart(pokemonName) {
    let c = JSON.parse(localStorage.getItem("cart"));
    
    if (!Array.isArray(c)) {
        console.error("Error: El carrito no es un array o está vacío.");
        return;
    }

    const index = c.findIndex(pokemon => pokemon.name === pokemonName);
    if (index !== -1) {
        c.splice(index, 1);
    } else {
        console.warn("Pokémon no encontrado en el carrito.");
    }

    localStorage.setItem("cart", JSON.stringify(c));

    setHtml(c, 'cart');
}

async function removeFromWished(pokemonName) {
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
        userDataObj.wishes = userDataObj.wishes.filter(pokemon => pokemon.name !== pokemonName);

        await save(uid, userDataObj.toJson());

        setHtml(userDataObj.wishes, 'wished');
    } catch (error) {
        console.error("Error al eliminar el Pokémon de la lista de deseos:", error);
    }
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
    setHtml(cart, 'cart');
}

async function loadWished() {
    let uid = JSON.parse(localStorage.getItem('user')).uid;
    const userData = await getById(uid);

    if (!userData) {
        console.error("No se encontraron datos de usuario para este UID.");
        return;
    }

    let userDataObj = new UserData(uid);
    userDataObj.wishes = userData.wishes;
    userDataObj.history = userData.history;

    setHtml(userDataObj.wishes,'wished');
}

window.onload = function() {
    document.getElementById("btnComprar").addEventListener("click", () => {
        buyCart();
    });

    loadCart();
    loadWished();
}