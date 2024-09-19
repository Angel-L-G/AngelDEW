import {Card} from './Clases/Card.js';
import {Player} from './Clases/Player.js';

var cards = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+2", "skip", "rev"];
var colors = ["blue", "red", "green", "yellow"];
var players = [];
var deck = [];
var discarded = [];
var last_card_played;
var turn = "User";

function init(){
    generateDeck();
    shuffleDeck();
    generatePlayers(2);
    giveStartingCards();
    renderHands();
}

function generatePlayers(num_players) {
    if(num_players < 2 || num_players > 8){
        console.log("Número de jugadores inválido. Debe ser entre 2 y 8.");
        num_players = 2;
    }

    for (let index = 0; index < num_players; index++) {
        if(index == 0){
            players.push(new Player("User"));
        } else {
            players.push(new Player(`Player${index}`));
        }
    }

    document.getElementById('draw-button').addEventListener('click', () => {
        drawCard(players[0]); // Suponiendo que el jugador 0 es el usuario
        renderHands(); // Volver a renderizar las cartas
    });
}

function generateDeck() {
    colors.forEach(color => {
        cards.forEach(type => {
            deck.push(new Card(type, color));
            deck.push(new Card(type, color));
        });
    });

    deck.push(new Card("+4", "wild"));
    deck.push(new Card("+4", "wild"));
    deck.push(new Card("+4", "wild"));
    deck.push(new Card("+4", "wild"));

    deck.push(new Card("0", "blue"));
    deck.push(new Card("0", "red"));
    deck.push(new Card("0", "green"));
    deck.push(new Card("0", "yellow"));

    deck.push(new Card("wild", "wild"));
    deck.push(new Card("wild", "wild"));
    deck.push(new Card("wild", "wild"));
    deck.push(new Card("wild", "wild"));
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function giveStartingCards() {
    players.forEach(player => {
        for (let index = 0; index < 7; index++) {
            player.addCard(deck[0]);
            let drawedCard = deck.shift();
            discarded.push(drawedCard);   
        }
        console.log(player.hand);
    });

    let card_on_table = deck.shift();
    last_card_played = card_on_table;
    discarded.push(card_on_table);
}

function drawCard(player) {
    if(deck.length === 0) {
        console.log("No hay cartas en la baraja.");
        deck = [...discarded];
        discarded = [];
        shuffleDeck();
    }

    let drawedCard = deck.shift();
    player.addCard(drawedCard);

    renderHands();
}

//TODO
function playCard(player, card) {
    if(/^[0-9]$/.test(card.value)){
        // Aqui solo puede haber numeros
        if(card.value === last_card_played.value || card.color === last_card_played.color){
            // Si el numero o el color coinciden
        }else {
            return false;
        }
    }else {
        if(card.value === "skip"){

        } else if(card.value === "reverse"){
        
        } else if(card.value === "+2"){

        } else if(card.value === "+4"){

        } else if(card.value === "wild"){
        
        } else {
            return false;
        }
    }
}

function renderHands() {
    const userHandDiv = document.querySelector('.user .hand');
    userHandDiv.innerHTML = ''; // Limpiar el contenido previo
    players[0].hand.forEach(card => {
        let cardElement = `
            <div class="uno-card ${card.color}">
                <div class="corner-number top">${card.value}</div>
                <div class="center-number">${card.value}</div>
                <div class="corner-number bottom">${card.value}</div>
            </div>
        `;
        if(card.color === card.value){
            cardElement = `
                <div class="uno-card ${card.color}">
                    <div class="corner-number top"></div>
                    <div class="center-number"></div>
                    <div class="corner-number bottom"></div>
                </div>
            `;
        }

        userHandDiv.innerHTML += cardElement; // Añadir la carta al contenedor
    });

    const enemyHandDiv = document.querySelector('.topEnemy .hand');
    enemyHandDiv.innerHTML = ''; // Limpiar el contenido previo
    players.slice(1).forEach(player => {
        player.hand.forEach(card => {
            const cardElement = `
                <div class="uno-card ${card.color}">
                    <div class="corner-number top">${card.value}</div>
                    <div class="center-number">${card.value}</div>
                    <div class="corner-number bottom">${card.value}</div>
                </div>
            `;
            enemyHandDiv.innerHTML += cardElement; // Añadir la carta al contenedor
        });
    });
}

init();