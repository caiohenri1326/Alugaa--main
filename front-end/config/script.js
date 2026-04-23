// FAZER APARECER TELA DE PERFIL CONFIGURAÇOES

const botao_ativar_perfil = document.getElementById('botao-ativar-perfil');

const tela_perfil = document.getElementById('container-perfil');

const tela_ativa = document.querySelectorAll('.tela');


botao_ativar_perfil.addEventListener('click', function(){
    tela_perfil.classList.toggle('ativa');
})


// ANIMAÇÃO SELECIONADO CONTAINER ESQUERDO


const botoesMenu = document.querySelectorAll('.nav-item button');

botoesMenu.forEach(botao => {
    botao.addEventListener('click', function(){
        botoesMenu.forEach(btn => btn.classList.remove('ativo'));

        

        this.classList.add('ativo');
    })
})