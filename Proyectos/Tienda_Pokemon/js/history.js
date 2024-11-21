import UserData from "./classes/UserData.js";
import {getById} from "./DB/DAO.js";

async function displayHistory() {
    let uid = JSON.parse(localStorage.getItem('user')).uid;
    const userData = await getById(uid);

    if (!userData || !userData.history) {
        console.error("No hay historial disponible para mostrar.");
        return;
    }

    // Organizar el historial como un array de compras
    const historyArray = Object.values(userData.history);

    // Generar HTML para mostrar
    const historyContainer = document.getElementById("historyContainer"); // Elemento contenedor en tu HTML
    historyContainer.innerHTML = ""; // Limpiar contenido previo

    historyArray.forEach((purchase, index) => {
        const purchaseList = document.createElement("ul");
        purchaseList.classList.add("purchase-list");
        
        const purchaseTitle = document.createElement("h3");
        purchaseTitle.textContent = `Compra ${index + 1}`;
        purchaseList.appendChild(purchaseTitle);

        purchase.forEach(pokemon => {
            const pokemonItem = document.createElement("li");
            pokemonItem.textContent = `${pokemon.name} - ${pokemon.types.join(", ")}`;
            purchaseList.appendChild(pokemonItem);
        });

        historyContainer.appendChild(purchaseList);
    });
}

window.onload = () => {
    displayHistory();
}