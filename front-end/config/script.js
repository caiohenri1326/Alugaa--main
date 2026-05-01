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

botao_adicionar_novo_endereco.addEventListener('click', function(){
    alternarAba(this, aparecer_aba_adicionar_endereco);
});


/* --- INICIALIZAÇÃO --- */
// Força o clique no perfil ao carregar a página
botao_ativar_perfil.click();