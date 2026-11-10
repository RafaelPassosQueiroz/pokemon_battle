async function mudar() { //Method change(), that will storage the pokemons variables "poke_pla" and "poke_adv", for when the page changes
    
    let pok_pla = document.getElementById("inputss").value.toLowerCase(); //Receive the value in lowercase of the input
    //Storage the value of the input (player pokémon) on "pok_pla" variable
    
    let pok_adv = document.getElementById("inputs").value.toLowerCase();//Receive the value in lowercase of the input
    //Storage the value of the input (adversary pokémon) on "pok_adv" variable


    if (!isNaN(pok_pla) && pok_pla !== "") //If the value of the variable "pok_pla" is a number and is not empty
        {
        try { //Search inside pokeAPi which Pokémon represents this number

            const resp1 = await fetch('https://pokeapi.co/api/v2/pokemon/' + pok_pla);
            const dados1 = await resp1.json();
            //Consults in pokeAPI, and transform the response in JSON


            pok_pla = dados1.name //So that, the variable will be the name of the pokémon, and not the number
        } catch (erro) {
            alert("ID of your Pokémon not found!");
            return; 
            }
    }

    if (!isNaN(pok_adv) && pok_adv !== "") //If the value of the variable "pok_adv" is a number and is not empty
        {
        try { //Search inside pokeAPi which Pokémon represents this number

            const resp1 = await fetch('https://pokeapi.co/api/v2/pokemon/' + pok_adv);
            const dados1 = await resp1.json();
            //Consults in pokeAPI, and transform the response in JSON

            pok_adv = dados1.name //So that, the variable will be the name of the pokémon, and not the number
        } catch (erro) {
            alert("ID of your Adversary's Pokémon not found!");
            return; 
            }
    }

    localStorage.setItem("player", pok_pla); //Storage the value of the variable "pok_pla", so that we can use it in the next page (golpes.html)
    localStorage.setItem("adversario", pok_adv); //Storage the value of the variable "pok_adv", so that we can use it in the next page (golpes.html)

    //Finally, after storage the pokémons names in variables, 
    window.location.href = "golpes.html";
}

async function buscarNaTCG() { //Search for the pokémon cards in the TCG API
    const pokemon_player = localStorage.getItem("player"); //Get the name of the player's pokémon, that was storage in the variable "pok_pla"

    
    const URL_TCG = `https://api.tcgdex.net/v2/en/cards?name=${pokemon_player}`;
    //Search on TCG API for cards with the name of the player's pokémon, and storage the URL in the variable "URL_TCG"

    try {
        const resposta = await fetch(URL_TCG);
        const listaDeCartas = await resposta.json(); //Transform the response in JSON, and storage in the variable "listaDeCartas"

        const cartasComImagens = listaDeCartas.filter(c => c.image );  //c => c.image is a function that filters the cards where the property "image" is not null
        //Filter the cards that have images, and storage in the variable "cartasComImagens"

        if (cartasComImagens.length > 0) { 

            const cartasDisponiveis = [...cartasComImagens];
            //Create a copy of the "cartasComImagens" array, so that we'll can remove duplicates (the cards have to be individuals), and storage in the variable "cartasDisponiveis"

            for (let i = 1; i <= 6; i++) { //A loop that will run 6 times, to show 6 cards on the screen

            const randomIndex = Math.floor(Math.random() * cartasDisponiveis.length);
            //Generates a random index between 0 and 6 (the length of the array)

            const cartaSorteada = cartasDisponiveis.splice(randomIndex, 1)[0];
            //Remove the card at the random index from the "cartasDisponiveis" array, and storage in the variable "cartaSorteada"
            //Doing that we'll remove the duplicates, because the card that was removed won't be available for the next iterations of the loop

            const imagemFinal = `${cartaSorteada.image}/high.png`;
            //Get the image of the card, and storage in the variable "imagemFinal"

            document.getElementById(`tcg${i}`).src = imagemFinal;
            //The HTML elements that will show the cards on the screen, have the id "tcg1", "tcg2", "tcg3", "tcg4", "tcg5" and "tcg6"
            //So we'll use the loop variable "i" to access them, and set the source of the image to the variable "imagemFinal"
        }

            const main_img = document.getElementById("main_img");
            //Select the Main Image on HTML page, where it is a pokémon photo and storage in the variable "main_img"

            const URL1 = 'https://pokeapi.co/api/v2/pokemon/' + pokemon_player; 
            const resp1 = await fetch(URL1);         
            const dados1 = await resp1.json(); 
            //Consults in pokeAPI, and transform the response in JSON


            const gif = dados1.sprites.other.dream_world.front_default;
            //Select the type of the photo of the pokémon that we want to show, and storage in the variable "gif"

            main_img.src = gif;
            //Set the source of the main image to the variable "gif", so that the photo of the pokémon will be shown on the screen
        
        } else {
            alert("There wwasn't enough cards with images for this Pokémon! Try again.");
        }

    } catch (erro) {
        console.error("Error:", erro);
    }
}

async function info(){ //Method to search the main information of the pokémon in pokeAPI, and show on the screen
    const pok_pla = localStorage.getItem("player");
    //Get the name of the player's pokémon, that was storage in the variable "pok_pla"

        const URL1 = 'https://pokeapi.co/api/v2/pokemon/' + pok_pla; 
        const resp1 = await fetch(URL1);         
        const dados1 = await resp1.json(); 
        //Consults in pokeAPI, and transform the response in JSON


        const tipo = dados1.types[0].type.name;
        let cor = "0";
        switch (tipo) {
          case 'fire': cor = '#F08030'; break;
          case 'water': cor = '#6890F0'; break;
          case 'grass': cor = '#78C850'; break;
          case 'electric': cor = '#F8D030'; break;
          case 'psychic': cor = '#F85888'; break;
          case 'ice': cor = '#98D8D8'; break;
          case 'dragon': cor = '#7038F8'; break;
          case 'dark': cor = '#705848'; break;
          case 'fairy': cor = '#EE99AC'; break;
          case 'normal': cor = '#A8A878'; break;
          case 'fighting': cor = '#C03028'; break;
          case 'flying': cor = '#A890F0'; break;
          case 'poison': cor = '#A040A0'; break;
          case 'ground': cor = '#E0C068'; break;
          case 'rock': cor = '#B8A038'; break;
          case 'bug': cor = '#A8B820'; break;
          case 'ghost': cor = '#705898'; break;
          case 'steel': cor = '#B8B8D0'; break;
          default:
            cor = "#A8A878"; //Default color if the type is not recognized
        }

        const pok_id = document.getElementById("pok_id");
        const pok_name = document.getElementById("pok_name");
        pok_id.innerText = dados1.id;
        pok_name.innerText = dados1.name;

        const img_info = document.getElementById("img_info");
        img_info.src = dados1.sprites.other['official-artwork'].front_default;

        const hp = document.getElementById("hp");
        const att = document.getElementById("att");
        const def = document.getElementById("def");
        const sp_at = document.getElementById("sp_at");
        const sp_de = document.getElementById("sp_de");
        const spd = document.getElementById("spd");

        hp.innerHTML = dados1.stats[0].base_stat;
        att.innerHTML = dados1.stats[1].base_stat;
        def.innerHTML = dados1.stats[2].base_stat;
        sp_at.innerHTML = dados1.stats[3].base_stat;
        sp_de.innerHTML = dados1.stats[4].base_stat;
        spd.innerHTML = dados1.stats[5].base_stat;


        
        const back_div = document.getElementById("back_div");
        back_div.style['background-color'] = cor
}

async function carregar_golpes() {
    try {
        const pok_pla = localStorage.getItem("player");
        const gp_container = document.getElementById("gp_container");
        gp_container.innerHTML = ""; // Limpa os blocos estáticos do HTML

        const resp1 = await fetch('https://pokeapi.co/api/v2/pokemon/' + pok_pla);
        const dados1 = await resp1.json();

        // Criamos uma lista de promessas para buscar os detalhes de CADA move
        const promessasDeMoves = dados1.moves.map(m => fetch(m.move.url).then(r => r.json()));
        
        // Aguarda todos os golpes serem baixados de uma vez
        const todosOsDadosMoves = await Promise.all(promessasDeMoves);

        todosOsDadosMoves.forEach(moveData => {
            let cor = "";
            // Switch de cores conforme solicitado
            switch (moveData.type.name) {
                case 'fire': cor = '#F08030'; break;
                case 'water': cor = '#6890F0'; break;
                case 'grass': cor = '#78C850'; break;
                case 'electric': cor = '#F8D030'; break;
                case 'psychic': cor = '#F85888'; break;
                case 'ice': cor = '#98D8D8'; break;
                case 'dragon': cor = '#7038F8'; break;
                case 'dark': cor = '#705848'; break;
                case 'fairy': cor = '#EE99AC'; break;
                case 'normal': cor = '#A8A878'; break;
                case 'fighting': cor = '#C03028'; break;
                case 'flying': cor = '#A890F0'; break;
                case 'poison': cor = '#A040A0'; break;
                case 'ground': cor = '#E0C068'; break;
                case 'rock': cor = '#B8A038'; break;
                case 'bug': cor = '#A8B820'; break;
                case 'ghost': cor = '#705898'; break;
                case 'steel': cor = '#B8B8D0'; break;
                default: cor = "#A8A878";
            }
            
            // Busca a descrição curta em inglês
            const desc = moveData.effect_entries.find(e => e.language.name === 'en')?.short_effect || "Sem descrição.";

            const golpeDiv = document.createElement('div');
            golpeDiv.className = "golpes";
            golpeDiv.style.backgroundColor = cor;

            golpeDiv.innerHTML = `
                <div class="golpes_header">
                    <input class="check" type="checkbox">
                    <h3>${moveData.name.replace("-", " ").toUpperCase()}</h3>
                    <img class="dmg_class" src="https://img.pokemondb.net/images/icons/move-${moveData.damage_class.name}.png">
                </div>
                <div class="info_golpe">
                    <span class="tipo">${moveData.type.name.toUpperCase()}</span>
                    <div class="stats_row">
                        <p>PP: ${moveData.pp || '--'}</p>
                        <p>Att: ${moveData.power || '--'}</p>
                        <p>Acc: ${moveData.accuracy || '--'}</p>
                    </div>
                    <p class="descricao">${desc}</p>
                </div>
            `;
            gp_container.appendChild(golpeDiv);
        });
    } catch (erro) {
        console.error("Erro ao carregar lista completa:", erro);
    }
}





const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 150;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors)

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i)
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data)
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("pokemon")

    // Formata o nome e o ID (ex: 001)
    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    // Mapeia os tipos e define a cor de fundo baseada no tipo principal
    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color

    const pokemonInnerHTML = `
        <div class="imgContainer">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `

    card.innerHTML = pokemonInnerHTML
    pokeContainer.appendChild(card)
}

if (pokeContainer) {
    fetchPokemons().catch(erro => console.error("Erro ao carregar Pokémon:", erro));
}







// Este script é compartilhado: inicializa somente os elementos da tela atual.
if (document.getElementById("gp_container") && localStorage.getItem("player")) {
    info().catch(erro => console.error("Erro ao carregar informações:", erro));
    buscarNaTCG();
    carregar_golpes();
}











/*
async function carregarPokemonAutomatico() {
    try {
        if (!pokemon_player) return;

        const URL1 = 'https://pokeapi.co/api/v2/pokemon/' + pokemon_player; 
        const resp1 = await fetch(URL1);         
        const dados1 = await resp1.json(); 

        const gif = dados1.sprites.other.dream_world.front_default;
        
        if (main_img) {
            main_img.src = gif;
        }

    } catch (erro) {
        console.error("Erro ao carregar o Pokémon:", erro);
    }
}


 Chama a função imediatamente
carregarPokemonAutomatico(); */
















/*
async function chamarApi() {
    try {
        const pok1 = document.getElementById("imgs");
        pok1.style.visibility = "visible";
        const pok2 = document.getElementById("imgss");
        pok2.style.visibility = "visible";
        const input1 = document.getElementById("inputs");
        input1.style.visibility = "hidden";
        const val1 = document.getElementById("inputs").value.toLowerCase();
        const input2 = document.getElementById("inputss");
        input2.style.visibility = "hidden";
        const val2 = document.getElementById("inputss").value.toLowerCase();

        const buttom = document.getElementById("battle");
        buttom.style.visibility = "hidden";


        const URL1 = 'https://pokeapi.co/api/v2/pokemon/'+val1; 
        const resp1 = await fetch(URL1);        
        const dados1 = await resp1.json(); 

        const URL2 = 'https://pokeapi.co/api/v2/pokemon/'+val2; 
        
        const resp2 = await fetch(URL2);        
        const dados2 = await resp2.json(); 
        const gif1 = dados1.sprites.other.showdown.front_default;
        pok1.src = gif1; 

        const gif2 = dados2.sprites.versions['generation-v']['black-white'].back_default;        
        pok2.src = gif2;

    } catch (erro) {
        alert("Pokémon não encontrado! Tente novamente.");
    }
}

function chamarApis(){
    const pok1 = document.getElementById("imgs");
    pok1.style.visibility = "visible";
    const pok2 = document.getElementById("imgss");
    pok2.style.visibility = "visible";
    const input1 = document.getElementById("inputs");
    input1.style.visibility = "hidden";
    const input2 = document.getElementById("inputss");
    input2.style.visibility = "hidden";
    const buttom = document.getElementById("battle");
    buttom.style.visibility = "hidden";
}

*/


























/*async function chamarApi() {
    try {
        const pla = document.getElementById("pok_pla").value;
        const adv = document.getElementById("pok_adv").value;

        if (!pla || !adv) return alert("Digite o nome dos dois Pokémons!");

        const URL_pla = 'https://pokeapi.co/api/v2/pokemon/'+pla; 
        const URL_adv = 'https://pokeapi.co/api/v2/pokemon/'+adv; 

        const resp_pla = await fetch(URL_pla);     
        const resp_adv = await fetch(URL_adv);        
   
        const dados_pla = await resp_pla.json(); 
        const dados_adv = await resp_adv.json(); 
        
        const img_pla = dados_pla.sprites.front_default;
        document.getElementById("pok_pla").innerHTML = "<img src="+img_pla+" alt=''>";

        const img_adv = dados_adv.sprites.front_default;
        document.getElementById("pok_adv").innerHTML = "<img src="+img_adv+" alt=''>";
         
    } catch (erro) {
            console.error("Ops! Algo deu errado:", erro.message);
        }
    }*/
