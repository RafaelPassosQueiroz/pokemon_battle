let id_atual = 0;

async function imagens(number, sla) {
    try {
        let base = isNaN(sla) ? sla : Number(sla);
        let num = typeof base === 'number' ? base + number : base;

        const img1 = document.getElementById("img1");
        img1.style.visibility = "visible";
        const img2 = document.getElementById("img2");
        img2.style.visibility = "visible";
        const img3 = document.getElementById("img3");
        img3.style.visibility = "visible";
        const img4 = document.getElementById("img4");
        img4.style.visibility = "visible";
        const img5 = document.getElementById("img5");
        img5.style.visibility = "visible";
        const img6 = document.getElementById("img6");
        img6.style.visibility = "visible";
        const img7 = document.getElementById("img7");
        img7.style.visibility = "visible";
        const img8 = document.getElementById("img8");
        img8.style.visibility = "visible";
        const img9 = document.getElementById("img9");
        img9.style.visibility = "visible";
        const img10 = document.getElementById("img10");
        img10.style.visibility = "visible";
        const img11 = document.getElementById("img11");
        img11.style.visibility = "visible";
        const img12 = document.getElementById("img12");
        img12.style.visibility = "visible";
        const img13 = document.getElementById("img13");
        img13.style.visibility = "visible";
        const img14 = document.getElementById("img14");
        img14.style.visibility = "visible";

        const URL1 = `https://pokeapi.co/api/v2/pokemon/${num}`; // Corrigido o URL
        const resp1 = await fetch(URL1);

        if (!resp1.ok) {
            throw new Error("Pokémon não encontrado!");
        }

        const dados1 = await resp1.json();
        id_atual = dados1.id;

        const gif1 = dados1.sprites.other.showdown.front_default;
        img1.src = gif1;
        const gif2 = dados1.sprites.other.dream_world.front_default;
        img2.src = gif2;
        const gif3 = dados1.sprites.other.home.front_default;
        img3.src = gif3;
        const gif4 = dados1.sprites.front_default;
        img4.src = gif4;
        const gif5 = dados1.sprites.other['official-artwork'].front_default;
        img5.src = gif5;
        const gif6 = dados1.sprites.versions['generation-viii']['brilliant-diamond-shining-pearl'].front_default;
        img6.src = gif6;
        const gif7 = dados1.sprites.versions['generation-viii'].icons.front_default;
        img7.src = gif7;

        const gif8 = dados1.sprites.versions['generation-iv']['diamond-pearl'].front_default;
        img8.src = gif8;
        const gif9 = dados1.sprites.versions['generation-v']['black-white'].animated.front_default;
        img9.src = gif9;
        const gif10 = dados1.sprites.versions['generation-v']['black-white'].animated.front_shiny;
        img10.src = gif10;
        const gif11 = dados1.sprites.back_default;
        img11.src = gif11;
        const gif12 = dados1.sprites.versions['generation-vii']['ultra-sun-ultra-moon'].front_default;
        img12.src = gif12;
        const gif13 = dados1.sprites.versions['generation-vi']['x-y'].front_default;
        img13.src = gif13;
        const gif14 = dados1.sprites.versions['generation-iv']['heartgold-soulsilver'].front_default;
        img14.src = gif14;
    } catch (erro) {
        alert(erro.message || "Erro ao buscar o Pokémon. Tente novamente.");
    }
}

function mostrar() {
    let pok = document.getElementById("for").value.toLowerCase();
    imagens(0, pok);
}

function antes() {
    imagens(-1, id_atual);
}

function depois() {
    imagens(1, id_atual);
}

async function darCor() {
    const pokemon_player = document.getElementById("for").value.toLowerCase();
    const URL1 = `https://pokeapi.co/api/v2/pokemon/${pokemon_player}`;

    try {
        const resp1 = await fetch(URL1);

        if (!resp1.ok) {
            throw new Error("Pokémon não encontrado!");
        }

        const dados1 = await resp1.json();
        const tipo = dados1.types[0].type.name;
        let cor = "#A8A878"; // Cor padrão (Normal)

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
            case 'fighting': cor = '#C03028'; break;
            case 'flying': cor = '#A890F0'; break;
            case 'poison': cor = '#A040A0'; break;
            case 'ground': cor = '#E0C068'; break;
            case 'rock': cor = '#B8A038'; break;
            case 'bug': cor = '#A8B820'; break;
            case 'ghost': cor = '#705898'; break;
            case 'steel': cor = '#B8B8D0'; break;
        }

        const tit = document.getElementById("tit");
        tit.style['background-color'] = cor;
    } catch (erro) {
        alert(erro.message || "Erro ao buscar o Pokémon. Tente novamente.");
    }
}