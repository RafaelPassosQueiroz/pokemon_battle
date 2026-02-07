/*const URL = 'https://pokeapi.co/api/v2/pokemon/pikachu;';

async function chamarApi() {
    const resp = await fetch(URL);
    // Convertemos a resposta bruta em um objeto JS que podemos ler
    const dados = await resp.json(); 
    console.log(dados);
}

// ESTA LINHA É A QUE FALTA:
chamarApi(); 

const URL = 'https://pokeapi.co/api/v2/pokemon/greninja'; 

async function chamarApi() {
    try {
        const resp = await fetch(URL);
        // Convertemos a resposta bruta em um objeto JS que podemos ler
        const dados = await resp.json(); 
        console.log(dados);
    } catch (erro) {
        console.error("Ops! Algo deu errado:", erro.message);
    }
}

chamarApi();

*/

const URL = 'https://pokeapi.co/api/v2/pokemon/658'; 

async function chamarApi() {
    try {
        const resp = await fetch(URL);        
        const dados = await resp.json(); 
        const spriteAnimado = dados.sprites.other.dream_world.front_default;
        console.log(dados.sprites.front_default)
        console.log(dados.sprites.front_shiny)
        console.log("Categoria:", dados.category)
        console.log("Gif:"+spriteAnimado)
    } catch (erro) {
        console.error("Ops! Algo deu errado:", erro.message);
    }
}

chamarApi();

