/* ============================================================
   1. REFERÊNCIAS DO DOM (Elementos Globais)
   ============================================================ */

// Layout e UI Geral
const text_area = document.getElementById('text-area');
const divisao_container_esquerdo = document.getElementById('divisao-container-esquerdo');
const config_sidebar = document.getElementById('config-sidebar');
const container_exit = document.getElementById('container-exit');
const container_botao_divisoria = document.getElementById('container-botao-divisoria');

// Abas (Navegação)
const botoesMenu = document.querySelectorAll('.nav-item');
const todas_as_telas = document.querySelectorAll('.tela'); 

const botao_ativar_perfil = document.getElementById('botao-ativar-perfil');
const botao_ativar_conta = document.getElementById('botao-ativar-conta');
const botao_ativar_aparencia = document.getElementById('botao-ativar-aparencia');
const botao_ativar_endereco = document.getElementById('botao-ativar-endereco');
const botao_ativar_seguranca = document.getElementById('botao-ativar-seguranca');
const botao_ativar_privacidade = document.getElementById('botao-ativar-privacidade');

// Containers de Conteúdo
const tela_perfil = document.getElementById('container-perfil');
const containerConta = document.getElementById('container-conta');
const container_aparencia = document.getElementById('container-aparencia');
const container_endereco = document.getElementById('container-endereco');
const container_seguranca = document.getElementById('container-seguranca');
const container_privacidade = document.getElementById('container-privacidade');

// Módulos de Endereço (Modal e Listagem)
const aparecer_aba_adicionar_endereco = document.getElementById('aba-adicionar-novo-endereco');
const botao_adicionar_novo_endereco = document.getElementById('adicionar-novo-endereco');
const aparecer_infos_endereco = document.getElementById('container-infos-endereco');
const lista_enderecos_container = document.getElementById('lista-enderecos-container');
const mensagem_vazia = document.getElementById('mensagem-vazia');

// Inputs e Botões do Modal de Endereço
const campoNome = document.getElementById('nomeDoEndereco');
const campoRua = document.getElementById('enderecoRua');
const campoCidade = document.getElementById('enderecoCidade');
const campoCep = document.getElementById('cep');
const botaoSalva = document.getElementById('salvar');
const botaoCancelar = document.getElementById('cancelar');
const botao_cancelar_endereco = aparecer_aba_adicionar_endereco.querySelector('.cancelar');


// VARIAVEIS DO TEMA 

const temaClaro = document.getElementById('claro');
const temaEscuro = document.getElementById('escuro');
const temaSistema = document.getElementById('tema-sistema');


var root = document.documentElement;


// MUDANDO COR DO SITE

const corItem = document.querySelectorAll('.cor-item');

//RECUPERAÇÃO DO TEMA 

window.onload = function() {
    // Recupera valor salvo no localStorage
    const root = document.documentElement;

    const corSelecionada = localStorage.getItem('temaCustomizado');
    if(corSelecionada){
        root.style.setProperty('--cor-destaque', corSelecionada);
    }
    
    const temaSalvo = localStorage.getItem('modoTema')

    if(temaSalvo === 'escuro'){
        root.style.setProperty('--bg-site', '#171412');
        root.style.setProperty('--colorText', '#252728');
        root.style.setProperty('--fundo-de-abas', '#28221F');
        root.style.setProperty('--colorTextCinza', '#A0A0A0');
        root.style.setProperty('--textoPreto', 'rgba(0, 0, 0, 0.631)');
        root.style.setProperty('--corInput', '#201A17');
        root.style.setProperty('color-scheme', 'dark');
    }
}
/* ============================================================
   2. FUNÇÕES AUXILIARES (Lógica de Negócio)
   ============================================================ */

function esconderTodasAsTelas() {
    todas_as_telas.forEach(tela => {
        tela.style.display = 'none';
        tela.classList.remove('ativa');
    });

    const todosOsBotoes = document.querySelectorAll('.nav-item button');
    todosOsBotoes.forEach(btn => {
        btn.classList.remove('ativo');
    })
}

function alternarAba(botaoClicado, telaParaMostrar, nomeTexto) {
    esconderTodasAsTelas();

    if (telaParaMostrar) {
        telaParaMostrar.style.display = 'block';
        telaParaMostrar.classList.add('ativa');
    }

    botaoClicado.classList.add('ativo');
    text_area.innerText = nomeTexto;
    
    // Reiniciar animação do texto
    text_area.style.animation = 'none';
    text_area.offsetHeight; // Trigger reflow
    text_area.style.animation = '';
}

function Animaçoes() {
    config_sidebar.classList.toggle('ativado');
    document.body.classList.toggle('sidebar-encolhida');
    container_botao_divisoria.classList.toggle('movendo-botao-divisoria');
    container_exit.classList.toggle('movendo-botao-sair');
}

function limparInputs() {
    campoNome.value = "";
    campoRua.value = "";
    campoCidade.value = "";
    campoCep.value = "";
}

function mostrarConfirmacaoExclusao(mensagem) {
    const confirmacaoExcluir = document.getElementById('confirmacao-excluir');
    const mostrarMensagemExcluir = document.getElementById('toast-menssage');

    mostrarMensagemExcluir.innerText = mensaje;
    confirmacaoExcluir.classList.add('mostrar');

    setTimeout(() => {
        confirmacaoExcluir.classList.remove('mostrar');
    }, 3000);
}

/* ============================================================
   3. EVENT LISTENERS (Interações)
   ============================================================ */

/* --- Navegação entre Abas --- */
botao_ativar_perfil.addEventListener('click', function() { alternarAba(this, tela_perfil, "Perfil");});
botao_ativar_conta.addEventListener('click', function() { alternarAba(this, containerConta, "Conta"); });
botao_ativar_aparencia.addEventListener('click', function() { alternarAba(this, container_aparencia, "Aparencia"); });
botao_ativar_endereco.addEventListener('click', function() { alternarAba(this, container_endereco, "Endereço"); });
botao_ativar_seguranca.addEventListener('click', function() { alternarAba(this, container_seguranca, "Segurança"); });
botao_ativar_privacidade.addEventListener('click', function() { alternarAba(this, container_privacidade, "Privacidade"); });

/* --- Sidebar --- */
divisao_container_esquerdo.addEventListener('click', Animaçoes);

/* --- Modal de Endereço (Ações de Abrir/Fechar) --- */
botao_adicionar_novo_endereco.addEventListener('click', () => {
    aparecer_aba_adicionar_endereco.showModal();
});

botaoCancelar.addEventListener('click', limparInputs);

botao_cancelar_endereco.addEventListener('click', function(event) {
    event.preventDefault();
    aparecer_aba_adicionar_endereco.classList.add('fechando');

    aparecer_aba_adicionar_endereco.addEventListener('animationend', function functionOnEnd() {
        aparecer_aba_adicionar_endereco.classList.remove('fechando');
        aparecer_aba_adicionar_endereco.removeEventListener('animationend', functionOnEnd);
        aparecer_aba_adicionar_endereco.close();
    });
});

/* --- Lógica de Salvar Endereço --- */
botaoSalva.addEventListener('click', function() {
    const nomeAddEndereco = campoNome.value;
    const rua = campoRua.value;
    const cidade = campoCidade.value;
    const cepVal = campoCep.value;

    if (nomeAddEndereco && rua) {
        const novoCard = aparecer_infos_endereco.cloneNode(true);

        novoCard.removeAttribute('id');
        novoCard.style.display = "flex";

        novoCard.querySelector('.nomeEndereco').innerText = nomeAddEndereco;
        novoCard.querySelector('.text-endereco').innerText = rua;
        novoCard.querySelector('.estado-cep').innerText = `${cidade} • CEP ${cepVal}`;

        lista_enderecos_container.appendChild(novoCard);

        mensagem_vazia.style.display = "none";
        aparecer_aba_adicionar_endereco.close();
        limparInputs();

        // Lógica de Exclusão do Novo Card
        const excluirEndereco = novoCard.querySelector('.excluir-endereco');
        excluirEndereco.addEventListener('click', function() {
            novoCard.remove();
            
            // Verifica se a lista ficou vazia (considerando o template original se estiver no container)
            if (lista_enderecos_container.children.length === 1) { 
                mensagem_vazia.style.display = "block";
            }
            mostrarConfirmacaoExclusao("Endereço removido.");
        });

    } else {
        alert("Preencha o nome e a rua!");
    }
});

// MUNDANDO TEMA DO SITE

temaClaro.addEventListener('click', function(){
    root.style.setProperty('--bg-site', '');
    root.style.setProperty('--colorText', '');
    root.style.setProperty('--fundo-de-abas', '');
    root.style.setProperty('--colorTextCinza', '');
    root.style.setProperty('--textoPreto', '');
    root.style.colorScheme = 'light';

    localStorage.setItem('modoTema', 'claro')
})

temaEscuro.addEventListener('click', function(){
    root.style.setProperty('--bg-site', '#1C1C1D');
    root.style.setProperty('--colorText', '#252728');
    root.style.setProperty('--fundo-de-abas', '#252728');
    root.style.setProperty('--colorTextCinza', '#A0A0A0');
    root.style.setProperty('--textoPreto', 'rgba(0, 0, 0, 0.631)');
    root.style.colorScheme = 'dark';


    localStorage.setItem('modoTema', 'escuro');
})



// MUDANDO A COR DOS ICONES E TEXTOS

corItem.forEach(botao => {
    botao.addEventListener('click', function(){
        const corSelecionada = this.getAttribute('data-color');
        const bgInputSelecionado = this.getAttribute('data-bg-input')
       
       if (corSelecionada){
        root.style.setProperty('--cor-destaque', corSelecionada);

        localStorage.setItem('temaCustomizado', corSelecionada);
       }

       if(this.id === 'laranja') root.style.setProperty('--cor-destaque-background-input', '#FCFAF7');
       if(this.id === 'azul') root.style.setProperty('--cor-destaque-background-input', '#8fc7ffff');
       if(this.id === 'verde') root.style.setProperty('--cor-destaque-background-input', '#cdfff1ff');
       if(this.id === 'rosa') root.style.setProperty('--cor-destaque-background-input', '#fdbed2ff');
       if(this.id === 'roxo') root.style.setProperty('--cor-destaque-background-input', '#e0d0fdff');
    })
})

/* ============================================================
   4. INICIALIZAÇÃO
   ============================================================ */
botao_ativar_perfil.click();
