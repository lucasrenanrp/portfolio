// ==========================================================================
// 1. ALTERNÂNCIA DE TEMA (MODO CLARO E MODO ESCURO COM PERSISTÊNCIA)
// ==========================================================================

// Seleciona os elementos do botão e do ícone no HTML
const botaoTema = document.querySelector('#botao-tema');
const iconeTema = document.querySelector('.icone-tema');

// Função que atualiza o ícone conforme o tema ativo
function atualizarIconeTema(modoClaroAtivo) {
    if (modoClaroAtivo) {
        iconeTema.classList.remove('fa-moon');
        iconeTema.classList.add('fa-sun');
    } else {
        iconeTema.classList.remove('fa-sun');
        iconeTema.classList.add('fa-moon');
    }
}

// Função que alterna a classe de tema claro no corpo da página
function alternarTema() {
    document.body.classList.toggle('modo-claro');
    const estaModoClaro = document.body.classList.contains('modo-claro');

    // Atualiza o ícone do sol ou lua
    atualizarIconeTema(estaModoClaro);

    // Salva a preferência do usuário no navegador (localStorage)
    if (estaModoClaro) {
        localStorage.setItem('tema-preferido', 'claro');
    } else {
        localStorage.setItem('tema-preferido', 'escuro');
    }
}

// Recupera a preferência salva ao recarregar a página
function carregarTemaSalvo() {
    const temaSalvo = localStorage.getItem('tema-preferido');
    if (temaSalvo === 'claro') {
        document.body.classList.add('modo-claro');
        atualizarIconeTema(true);
    }
}

// Inicializa a verificação do tema salvo e adiciona o evento de clique
carregarTemaSalvo();
if (botaoTema) {
    botaoTema.addEventListener('click', alternarTema);
}

// ==========================================================================
// 2. MENU DE NAVEGAÇÃO MOBILE (ABRIR, FECHAR E TROCAR ÍCONE)
// ==========================================================================

// Seleciona o botão de menu, o container de navegação e os links
const botaoMenu = document.querySelector('#botao-menu');
const iconeMenu = document.querySelector('.icone-menu');
const menuNavegacao = document.querySelector('#menu-navegacao');
const linksNavegacao = document.querySelectorAll('.item-link');

// Função que atualiza o ícone do menu mobile (hambúrguer ou X)
function atualizarIconeMenu(menuAberto) {
    if (iconeMenu) {
        if (menuAberto) {
            iconeMenu.classList.remove('fa-bars');
            iconeMenu.classList.add('fa-xmark');
        } else {
            iconeMenu.classList.remove('fa-xmark');
            iconeMenu.classList.add('fa-bars');
        }
    }
}

// Função que alterna a visibilidade do menu no celular
function alternarMenuMobile() {
    menuNavegacao.classList.toggle('menu-aberto');
    const estaAberto = menuNavegacao.classList.contains('menu-aberto');
    atualizarIconeMenu(estaAberto);
}

// Função que fecha o menu após clicar em uma seção
function fecharMenuMobile() {
    menuNavegacao.classList.remove('menu-aberto');
    atualizarIconeMenu(false);
}

// Escuta o clique no botão para abrir ou fechar o menu
if (botaoMenu) {
    botaoMenu.addEventListener('click', alternarMenuMobile);
}

// Adiciona o evento de fechar em cada link usando um laço for
for (let i = 0; i < linksNavegacao.length; i = i + 1) {
    linksNavegacao[i].addEventListener('click', fecharMenuMobile);
}

// ==========================================================================
// 3. SEÇÃO DE PROJETOS (DADOS EM ARRAY DE OBJETOS E RENDERIZAÇÃO COM FOR)
// ==========================================================================

// Lista de projetos representados como objetos simples dentro de um array
const listaProjetos = [
    {
        nome: "Pokedex interativa",
        descricao: "Pokédex interativa feita com HTML, CSS e JavaScript, consumindo a PokeAPI para buscar e exibir informações detalhadas de cada pokémon.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        imagem: "/img/pokedex.jpg",
        link: "",
        github: "https://github.com/joaomiguelsant0ss/pokedex"
    },
    {
        nome: "Player de Musica",
        descricao: "Player de música com interface moderna, controles de reprodução (play/pause, próxima/anterior), barra de progresso e lista de faixas.",
        tecnologias: ["HTML", "CSS", "JavaScript", "React"],
        imagem: "/img/player musica.jpg",
        link: "https://player-musica-react.vercel.app/",
        github: "https://github.com/joaomiguelsant0ss/player-de-musica"
    },
    {
        nome: "Gerador de Citações",
        descricao: "Gerador de citações que exibe citações aleatórias de autores famosos, com opção de copiar texto e compartilhar em redes sociais.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        imagem: "/img/engre.jpg",
        link: "https://geradordecitacoesjoaomiguel.netlify.app/",
        github: "https://github.com/joaomiguelsant0ss/Gerador-de-Citacoes"
    }
];

// Função que percorre o array de tecnologias de um projeto e cria as tags HTML
function gerarTagsTecnologias(tecnologias) {
    let htmlTags = "";
    for (let j = 0; j < tecnologias.length; j = j + 1) {
        htmlTags = htmlTags + `<span class="tag-tecnologia">${tecnologias[j]}</span>`;
    }
    return htmlTags;
}

// Função que monta a estrutura visual de um único cartão de projeto
function montarCartaoProjeto(projeto) {
    const tagsHtml = gerarTagsTecnologias(projeto.tecnologias);

    // Condicional para verificar se o projeto possui imagem ou usa o marcador visual
    let areaVisual = "";
    if (projeto.imagem !== "") {
        areaVisual = `<img src="${projeto.imagem}" alt="Imagem do projeto ${projeto.nome}" class="imagem-projeto">`;
    } else {
        areaVisual = `
            <div class="previa-projeto">
                <i class="fa-solid fa-laptop-code icone-previa"></i>
                <span>[imagem do projeto]</span>
            </div>
        `;
    }

    return `
        <article class="cartao-projeto">
            ${areaVisual}
            <div class="conteudo-projeto">
                <h3 class="titulo-projeto">${projeto.nome}</h3>
                <p class="descricao-projeto">${projeto.descricao}</p>
                <div class="lista-tecnologias">
                    ${tagsHtml}
                </div>
                <div class="acoes-projeto">
                    <a href="${projeto.link}" class="botao botao-primario" target="_blank" rel="noopener noreferrer">
                        <i class="fa-solid fa-arrow-up-right-from-square icone-botao"></i>
                        Ver projeto
                    </a>
                    <a href="${projeto.github}" class="botao botao-secundario" target="_blank" rel="noopener noreferrer">
                        <i class="fa-brands fa-github icone-botao"></i>
                        Código
                    </a>
                </div>
            </div>
        </article>
    `;
}

// Função principal que percorre a lista de projetos e insere os cartões na página
function exibirProjetos() {
    const gradeProjetos = document.querySelector('#grade-projetos');

    if (!gradeProjetos) {
        return;
    }

    let conteudoTotal = "";

    // Laço for que percorre cada projeto cadastrado no array
    for (let i = 0; i < listaProjetos.length; i = i + 1) {
        const cartao = montarCartaoProjeto(listaProjetos[i]);
        conteudoTotal = conteudoTotal + cartao;
    }

    gradeProjetos.innerHTML = conteudoTotal;
}

// Inicializa a exibição dos projetos na página
exibirProjetos();

// ==========================================================================
// 4. FORMULÁRIO DE CONTATO (VALIDAÇÃO CAMPO POR CAMPO EM JAVASCRIPT PURO)
// ==========================================================================

// Seleciona o formulário e os campos de entrada no HTML
const formularioContato = document.querySelector('#formulario-contato');
const campoNome = document.querySelector('#campo-nome');
const campoEmail = document.querySelector('#campo-email');
const campoMensagem = document.querySelector('#campo-mensagem');

// Seleciona as áreas de mensagem de erro específicas de cada campo
const erroNome = document.querySelector('#erro-nome');
const erroEmail = document.querySelector('#erro-email');
const erroMensagem = document.querySelector('#erro-mensagem');
const mensagemStatus = document.querySelector('#mensagem-status');

// Função 1: Valida individualmente o campo Nome
function validarNome() {
    const nome = campoNome.value.trim();

    if (nome === "") {
        erroNome.textContent = "Por favor, preencha o seu nome.";
        campoNome.classList.add('campo-invalido');
        return false;
    } else if (nome.length < 3) {
        erroNome.textContent = "O nome deve conter pelo menos 3 letras.";
        campoNome.classList.add('campo-invalido');
        return false;
    } else {
        erroNome.textContent = "";
        campoNome.classList.remove('campo-invalido');
        return true;
    }
}

// Função 2: Valida individualmente o campo E-mail
function validarEmail() {
    const email = campoEmail.value.trim();
    const contemArroba = email.indexOf("@") !== -1;
    const contemPontoAposArroba = email.lastIndexOf(".") > email.indexOf("@");

    if (email === "") {
        erroEmail.textContent = "Por favor, preencha o seu e-mail.";
        campoEmail.classList.add('campo-invalido');
        return false;
    } else if (!contemArroba || !contemPontoAposArroba) {
        erroEmail.textContent = "Por favor, informe um e-mail válido (ex: seu.email@exemplo.com).";
        campoEmail.classList.add('campo-invalido');
        return false;
    } else {
        erroEmail.textContent = "";
        campoEmail.classList.remove('campo-invalido');
        return true;
    }
}

// Função 3: Valida individualmente o campo Mensagem
function validarMensagem() {
    const mensagem = campoMensagem.value.trim();

    if (mensagem === "") {
        erroMensagem.textContent = "Por favor, escreva a sua mensagem.";
        campoMensagem.classList.add('campo-invalido');
        return false;
    } else if (mensagem.length < 10) {
        erroMensagem.textContent = "A mensagem deve conter pelo menos 10 caracteres.";
        campoMensagem.classList.add('campo-invalido');
        return false;
    } else {
        erroMensagem.textContent = "";
        campoMensagem.classList.remove('campo-invalido');
        return true;
    }
}

// Função 4: Exibe mensagem geral de status (sucesso ou erro)
function exibirMensagemStatus(texto, tipo) {
    mensagemStatus.textContent = texto;

    if (tipo === "erro") {
        mensagemStatus.classList.remove('status-sucesso');
        mensagemStatus.classList.add('status-erro');
    } else {
        mensagemStatus.classList.remove('status-erro');
        mensagemStatus.classList.add('status-sucesso');
    }
}

// Função 5: Limpa os campos e mensagens de erro do formulário
function limparFormulario() {
    campoNome.value = "";
    campoEmail.value = "";
    campoMensagem.value = "";

    erroNome.textContent = "";
    erroEmail.textContent = "";
    erroMensagem.textContent = "";

    campoNome.classList.remove('campo-invalido');
    campoEmail.classList.remove('campo-invalido');
    campoMensagem.classList.remove('campo-invalido');
}

// Função 6: Validação completa executada ao submeter o formulário
function validarFormulario(evento) {
    evento.preventDefault();

    // Executa a validação de cada campo individualmente
    const nomeValido = validarNome();
    const emailValido = validarEmail();
    const mensagemValida = validarMensagem();

    // Verifica se todos os campos passaram no teste
    if (nomeValido && emailValido && mensagemValida) {
        exibirMensagemStatus("Mensagem validada com sucesso! Todos os campos estão corretos.", "sucesso");
        limparFormulario();
    } else {
        exibirMensagemStatus("Por favor, corrija os campos destacados em vermelho acima.", "erro");
    }
}

// Escuta a submissão do formulário
if (formularioContato) {
    formularioContato.addEventListener('submit', validarFormulario);
}

// Validação em tempo real: remove o erro assim que o usuário digita no campo
if (campoNome) {
    campoNome.addEventListener('input', validarNome);
}

if (campoEmail) {
    campoEmail.addEventListener('input', validarEmail);
}

if (campoMensagem) {
    campoMensagem.addEventListener('input', validarMensagem);
}

// Mensagem no console indicando que os scripts foram carregados com sucesso
console.log("Portfólio de Maria: scripts carregados e prontos para uso.");
