/* --- REFERÊNCIAS DO DOM --- */
const text_area = document.getElementById('text-area');
const divisao_container_esquerdo = document.getElementById('divisao-container-esquerdo');
const config_sidebar = document.getElementById('config-sidebar');
const container_exit = document.getElementById('container-exit');
const container_botao_divisoria = document.getElementById('container-botao-divisoria');
const aparecer_aba_adicionar_endereco = document.getElementById('aba-adicionar-novo-endereco');
// ========================================
// Abas e Botões
const botao_ativar_perfil = document.getElementById('botao-ativar-perfil');
const tela_perfil = document.getElementById('container-perfil');
const botao_ativar_aparencia = document.getElementById('botao-ativar-aparencia');
const botao_ativar_endereco = document.getElementById('botao-ativar-endereco');
const botao_ativar_conta = document.getElementById('botao-ativar-conta');
const botao_adicionar_novo_endereco = document.getElementById('adicionar-novo-endereco');

// ========================================================
// ADICIONANDO O CONTAINER AO HTML
const containerConta = document.getElementById('container-conta'); // Alterado para ID para bater com o perfil
const container_aparencia = document.getElementById('container-aparencia');
const container_endereco = document.getElementById('container-endereco');

// Seleção de todas as telas para poder esconder
const todas_as_telas = document.querySelectorAll('.tela'); 
const botoesMenu = document.querySelectorAll('.nav-item');

/* --- FUNÇÃO DE LIMPEZA (Para as abas funcionarem) --- */
function esconderTodasAsTelas() {
    todas_as_telas.forEach(tela => {
        tela.style.display = 'none';
        tela.classList.remove('ativa');
    });
    botoesMenu.forEach(btn => btn.classList.remove('ativo'));
}

/* --- LOGICA DA ABA PERFIL --- */
botao_ativar_perfil.addEventListener('click', function(){
    alternarAba(this, tela_perfil, "Perfil");
});

/* --- LOGICA DA ABA CONTA --- */
botao_ativar_conta.addEventListener('click', function(){
    alternarAba(this, containerConta, "Conta");
});

botao_ativar_aparencia.addEventListener('click', function(){
    alternarAba(this, container_aparencia, "Aparencia");
});

botao_ativar_endereco.addEventListener('click', function(){
    alternarAba(this, container_endereco, "Endereço"); 
});
/* --- ANIMAÇÃO SIDEBAR (ABRIR/FECHAR) --- */
divisao_container_esquerdo.addEventListener('click', function(){
    Animaçoes();
});





function Animaçoes(){
    config_sidebar.classList.toggle('ativado');
    document.body.classList.toggle('sidebar-encolhida');
    container_botao_divisoria.classList.toggle('movendo-botao-divisoria');
    container_exit.classList.toggle('movendo-botao-sair');
}

function alternarAba(botaoClicado, telaParaMostrar, nomeTexto){
    esconderTodasAsTelas()

    if(telaParaMostrar){
        telaParaMostrar.style.display = 'block';
        telaParaMostrar.classList.add('ativa');
    }

    botaoClicado.classList.add('ativo');
    text_area.innerText = nomeTexto;
}

// ================================================================
// ADICIONANDO NOVO ENDEREÇO
const botao_cancelar_endereco = aparecer_aba_adicionar_endereco.querySelector('.cancelar');

botao_adicionar_novo_endereco.addEventListener('click', function(){
    aparecer_aba_adicionar_endereco.showModal();
});

botao_cancelar_endereco.addEventListener('click', function(){
    aparecer_aba_adicionar_endereco.close();
})

// LOGICA ADICIONANDO ENDERECO

// 1. Referencie apenas os ELEMENTOS (sem o .value) no topo
const campoNome = document.getElementById('nomeDoEndereco');
const campoRua = document.getElementById('enderecoRua');
const campoCidade = document.getElementById('enderecoCidade');
const campoCep = document.getElementById('cep');

const aparecer_infos_endereco = document.getElementById('container-infos-endereco');
const botaoSalva = document.getElementById('salvar');
const botaoCancelar = document.getElementById('cancelar');

const nomeEnderecoTrocado = document.getElementById('nomeEndereco');
const text_endereco = document.getElementById('text-endereco');
const text_cidade = document.getElementById('text-cidade');
const text_cep = document.getElementById('text-cep');

// MENSAGEM VAZIA

const mensagem_vazia = document.getElementById('mensagem-vazia');


// 2. Capture os VALORES apenas dentro do evento de clique
botaoSalva.addEventListener('click', function() {
    const nome = campoNome.value;
    const rua = campoRua.value;
    const cidade = campoCidade.value;
    const cepVal = campoCep.value;

    // Verifica se os campos principais foram preenchidos
    if (nome && rua) {
        const novoCard = aparecer_infos_endereco.cloneNode(true);

        novoCard.removeAttribute('id');
        novoCard.style.display = "flex";

        novoCard.querySelector('.nomeEndereco').innerText = nome;
        novoCard.querySelector('.text-endereco').innerText = rua;
        novoCard.querySelector('.estado-cep').innerText = `${cidade} • CEP ${cepVal}`;

        document.getElementById('lista-enderecos-container').appendChild(novoCard);

        mensagem_vazia.style.display = "none";
        aparecer_aba_adicionar_endereco.close();
        limparInputs();

        // BOTAO EXCLUIR E MODIFICAR ENDEREÇO

        const excluirEndereco = novoCard.querySelector('.excluir-endereco');
        const modificarEndereco = document.getElementById('edit-endereco');


excluirEndereco.addEventListener('click', function(){
        const containerLista = document.getElementById('lista-enderecos-container');
        const cardsRestantes = containerLista.children.length;
        console.log(cardsRestantes);
        
        if(cardsRestantes === 2){
            mensagem_vazia.style.display = "block";
        }


        novoCard.remove(); // Remove o card da tela
        console.log("Numero de abas:", cardsRestantes);
        mostrarConfirmacaoExclusao("Endereço removido.");
});
    } else {
        alert("Preencha o nome e a rua!");
    }

});


botaoCancelar.addEventListener('click', function(){
        limparInputs();
    })

    function limparInputs(){
    document.getElementById('nomeDoEndereco').value = "";
    document.getElementById('enderecoRua').value = "";
    document.getElementById('enderecoCidade').value = "";
    document.getElementById('cep').value = "";
}

// EXCLUIR E MODIFICAR ENDEREÇO




function mostrarConfirmacaoExclusao(mensagem){
    const confirmacaoExcluir = document.getElementById('confirmacao-excluir');
    const mostrarMensagemExcluir = document.getElementById('toast-menssage');


    mostrarMensagemExcluir.innerText = mensagem;

    confirmacaoExcluir.classList.add('mostrar');

    setTimeout(() => {
        confirmacaoExcluir.classList.remove('mostrar');
    }, 3000)
}

// ANIMAÇAO ADICIONANDO NOVO ENDEREÇO

botao_cancelar_endereco.addEventListener('click', function(event){
    event.preventDefault();

    aparecer_aba_adicionar_endereco.classList.add('fechando');
    

    aparecer_aba_adicionar_endereco.addEventListener('animationend', function functionOnEnd(){
        aparecer_aba_adicionar_endereco.classList.remove('fechando');

        aparecer_aba_adicionar_endereco.removeEventListener('animationend', functionOnEnd);

        aparecer_aba_adicionar_endereco.close();
    })
})






/* --- INICIALIZAÇÃO --- */
// Força o clique no perfil ao carregar a página
botao_ativar_perfil.click();