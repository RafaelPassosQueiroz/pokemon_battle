async function chamarApi() {
    try {
        const card = await tcgdex.card.list();

        const cards = await tcgdex.card.list(new Query().equal('name', 'furret'));



    } catch (erro) {
        console.error("Ops! Algo deu errado:", erro.message);
    }
}




        //Lógica de DANO











/*
function trocarNome(){
let v = document.getElementById('nome');
let variavel = v.value;
let outro = document.getElementById("oi").textContent = "Olá "+ variavel +"!";
}
function outraFo() {
    const titulo = document.getElementById('oi');

    titulo.innerHTML = 'Texto <strong>Modificado</strong>!';

    titulo.style.color = 'red';             // Altera a cor do texto
    titulo.style.opacity = '0.5';           // Controla a transparência (0 a 1)
    titulo.style.backgroundColor = 'blue';  // Fundo (referente ao backgroundImage da imagem)
    titulo.style.width = '300px';           // Define largura

    titulo.insertAdjacentHTML('afterend', '<p>Novo parágrafo inserido!</p>');

    console.log("Conteúdo bruto: " + titulo.textContent);
}

function outraFu() {

    const novoConteudo = `
        <div class="card-novo">
            <h2 style="color: 'blue'; opacity: '0.9';">Novo Título Gerado</h2>
            <p>Este parágrafo foi criado do zero.</p>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', novoConteudo);

    // 3. Criando um elemento isolado para aplicar estilos específicos da imagem
    const tempDiv = document.createElement('div');
    
    // textContent: Define o texto bruto do novo elemento
    tempDiv.textContent = "Elemento de estilo dinâmico";
    
    // style: Aplicando as características conforme a imagem
    tempDiv.style.color = 'white';
    tempDiv.style.backgroundColor = 'black'; // Referência ao background da imagem
    tempDiv.style.width = '200px';
    tempDiv.style.height = '100px';
    tempDiv.style.opacity = '0.7';
    
    // Adiciona esse elemento estilizado ao final da página
    document.body.appendChild(tempDiv);
}
function aba() {
    // 1. Criamos a estrutura da aba do zero
    // Usamos aspas simples para os valores de CSS conforme a regra
    const htmlAba = `
        <div id="minhaOverlay" style="
            position: 'relative'; 
            margin-left: '200px';
            width: '400px'; 
            height: '400px'; 
            backgroundColor: 'rgba(184, 19, 19, 0.8)'; 
            display: 'flex'; 
            justifyContent: 'center'; 
            alignItems: 'center'; 
            zIndex: '1000';">
            
            <div id="conteudoAba" style="
                backgroundColor: 'white'; 
                padding: '20px'; 
                width: '300px'; 
                textAlign: 'center';">
                <h2 id="tituloAba">Aba Sobreposta</h2>
                <button onclick="this.parentElement.parentElement.remove()">Fechar</button>
            </div>
        </div>
    `;

    // 2. insertAdjacentHTML: Insere a aba no final do body
    document.body.insertAdjacentHTML('beforeend', htmlAba);

    // 3. Aplicando conceitos adicionais nos elementos recém-criados
    const titulo = document.querySelector('#tituloAba');
    
    // innerHTML: Traduzindo conteúdo com tag strong
    titulo.innerHTML = 'Aba <strong>Ativada</strong>'; 

    // style: Definindo características específicas
    titulo.style.color = 'darkblue';
    titulo.style.opacity = '1';
    
    // textContent: Apenas para logar a criação no console
    console.log("Status: " + titulo.textContent);
}
*/