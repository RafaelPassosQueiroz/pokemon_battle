async function mudar() {
    let pok_pla = document.getElementById("inputss").value.toLowerCase();
    let pok_adv = document.getElementById("inputs").value.toLowerCase();

    if (!isNaN(pok_pla) && pok_pla !== "") {
        try {
            const resp1 = await fetch('https://pokeapi.co/api/v2/pokemon/' + pok_pla);
            const dados1 = await resp1.json();
            pok_pla = dados1.name; 
        } catch (erro) {
            alert("ID de Pokémon não encontrado!");
            return; 
            }
    }

    localStorage.setItem("player", pok_pla);
    localStorage.setItem("adversario", pok_adv);

    // 3. POR ÚLTIMO mudamos de página
    window.location.href = "golpes.html";
}

async function buscarNaTCG() {
    const pokemon_player = localStorage.getItem("player");
    
    const URL_TCG = `https://api.tcgdex.net/v2/en/cards?name=${pokemon_player}`;

    try {
        const resposta = await fetch(URL_TCG);
        const listaDeCartas = await resposta.json();

        const cartasComImagens = listaDeCartas.filter(c => c.image);

        if (cartasComImagens.length > 0) {

            const cartasDisponiveis = [...cartasComImagens];

            const randomId1 = Math.floor(Math.random() * cartasDisponiveis.length);
            cartasDisponiveis.splice(randomId1, 1)[0];

            const randomId2 = Math.floor(Math.random() * cartasDisponiveis.length);
            cartasDisponiveis.splice(randomId2, 1)[0];

            const randomId3 = Math.floor(Math.random() * cartasDisponiveis.length);
            cartasDisponiveis.splice(randomId3, 1)[0];

            const randomId4 = Math.floor(Math.random() * cartasDisponiveis.length);
            cartasDisponiveis.splice(randomId4, 1)[0];

            const randomId5 = Math.floor(Math.random() * cartasDisponiveis.length);
            cartasDisponiveis.splice(randomId5, 1)[0];

            const randomId6 = Math.floor(Math.random() * cartasDisponiveis.length);
            cartasDisponiveis.splice(randomId6, 1)[0];


            const cartaSorteada1 = cartasDisponiveis.splice(randomId1, 1)[0]; // Remove a carta sorteada
            const imagemFinal1 = `${cartaSorteada1.image}/high.png`;
            document.getElementById("tcg1").src = imagemFinal1;

            const cartaSorteada2 = cartasComImagens.splice(randomId2, 1)[0];
            const imagemFinal2 = `${cartaSorteada2.image}/high.png`;
            document.getElementById("tcg2").src = imagemFinal2;

            const cartaSorteada3 = cartasComImagens.splice(randomId3, 1)[0];
            const imagemFinal3 = `${cartaSorteada3.image}/high.png`;
            document.getElementById("tcg3").src = imagemFinal3;

            const cartaSorteada4 = cartasComImagens.splice(randomId4, 1)[0];
            const imagemFinal4 = `${cartaSorteada4.image}/high.png`;
            document.getElementById("tcg4").src = imagemFinal4;

            const cartaSorteada5 = cartasComImagens.splice(randomId5, 1)[0];
            const imagemFinal5 = `${cartaSorteada5.image}/high.png`;
            document.getElementById("tcg5").src = imagemFinal5;

            const cartaSorteada6 = cartasComImagens.splice(randomId6, 1)[0];
            const imagemFinal6 = `${cartaSorteada6.image}/high.png`;
            document.getElementById("tcg6").src = imagemFinal6;

            

            const main_img = document.getElementById("main_img");
            const URL1 = 'https://pokeapi.co/api/v2/pokemon/' + pokemon_player; 
            const resp1 = await fetch(URL1);         
            const dados1 = await resp1.json(); 
            const gif = dados1.sprites.other.dream_world.front_default;
            main_img.src = gif;
        
        } else {
            alert("Nenhuma carta com imagem encontrada para este Pokémon.");
        }

    } catch (erro) {
        console.error("Erro:", erro);
    }
}

async function info(){
    const pok_pla = localStorage.getItem("player");
        const URL1 = 'https://pokeapi.co/api/v2/pokemon/' + pok_pla; 
        const resp1 = await fetch(URL1);         
        const dados1 = await resp1.json(); 
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
            cor = "#A8A878"; // Cor padrão (Normal) caso o tipo não seja encontrado
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

info();
buscarNaTCG();











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