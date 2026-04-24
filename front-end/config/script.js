// FAZER APARECER TELA DE PERFIL CONFIGURAÇOES

const botao_ativar_perfil = document.getElementById('botao-ativar-perfil');

const tela_perfil = document.getElementById('container-perfil');

const tela_ativa = document.querySelectorAll('.tela');

const text_area = document.getElementById('text-area');


botao_ativar_perfil.addEventListener('click', function(){
    tela_perfil.classList.add('ativa');

    text_area.innerText = "Perfil"

    tela_perfil.forEach(tela_ativa => {
        tela_ativa.style.display = 'none';
    })

    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('ativo'));
    this.classList.add('ativo');
})


// ANIMAÇÃO SELECIONADO CONTAINER ESQUERDO


const botoesMenu = document.querySelectorAll('.nav-item button');

botoesMenu.forEach(botao => {
    botao.addEventListener('click', function(){
        botoesMenu.forEach(btn => btn.classList.remove('ativo'));

        

        this.classList.add('ativo');
    })
})






const divisao_container_esquerdo = document.getElementById('divisao-container-esquerdo');

const config_sidebar = document.getElementById('config-sidebar');

const container_exit = document.getElementById('container-exit');
 
divisao_container_esquerdo.addEventListener('click', function(){
    if(config_sidebar.style.width === "60px"){
        config_sidebar.style.width = "290px";
    }else{
        config_sidebar.style.width = "45px";
        config_sidebar.style.overflow = "hidden";
    }
});