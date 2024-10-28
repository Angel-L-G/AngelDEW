import Pokemon from "./classes/Pokemon.js";
import UserData from "./classes/UserData.js";
import save from "./DB/DAO.js";

async function loadCart() {
    let c = JSON.parse(localStorage.getItem('cart'));

    if (c[0] === null) {
        cart.innerHTML = "<p>Tu carrito está vacío</p>";
    } else {
        console.log(c);
        setHtml(c,'cart');
    }
}

function setHtml(pokemons, htmlTag) {
    let tag = document.getElementById(htmlTag);

    console.log(htmlTag);

    tag.innerHTML = "";

    if (htmlTag === "cart") {
        pokemons.forEach(p => {
            const statsText = Object.entries(p.stats)
                .map(([key, value]) => `${key}: ${value}`)
                .join(' | ');
        
            // Crear el contenedor de la tarjeta de Pokémon
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("pokemon-card-list");
        
            // Agregar el contenido HTML dentro del contenedor
            cardDiv.innerHTML = `
                <img src="${p.frontSprite}" alt="${p.name}" class="pokemon-img">
                <div class="pokemon-info">
                    <p class="pokemon-name">${p.name}</p>
                    <p class="pokemon-types">${p.types.join(", ")}</p>
                    <p class="pokemon-stats">${statsText}</p>
                </div>
            `;
        
            // Crear el botón de "Quitar del carrito"
            let button = document.createElement("button");
            button.textContent = "Quitar Del Carrito";
            button.classList.add("btn-remove");
            button.addEventListener("click", () => {
                removePokemonFromCart(p.name);
            });
        
            // Añadir el botón al contenedor de la tarjeta
            cardDiv.appendChild(button);
        
            // Añadir la tarjeta completa al DOM (suponiendo que 'tag' es tu contenedor principal)
            tag.appendChild(cardDiv);
        });        
    } else {
        console.log("Algo raro paso");
    }
}

function buyCart() {
    let c = JSON.parse(localStorage.getItem('cart'));
    let uid = (JSON.parse(localStorage.getItem('user'))).uid;

    //Get the user data from db
    ///////////////////////////////////////////////

    const userCollectionRef = collection(db, "userData");
    
    // Crear una consulta para obtener documentos con el `uid` proporcionado
    const q = query(userCollectionRef);

    console.log(q);
    ////////////////////////////////////////////////
    let userData = new UserData(uid);
    userData.addCartToHistory(c);

    let data = userData.toJson();
    
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    save(uid, data);
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



function loadWished() {
    let wished = document.getElementById('wished');


}

window.onload = function() {
    let u = new UserData(JSON.parse(localStorage.getItem('user')));
    let c = JSON.parse(localStorage.getItem('cart'));

    document.getElementById("btnComprar").addEventListener("click", () => {
        buyCart();
    });

    loadCart();
    loadWished();
}