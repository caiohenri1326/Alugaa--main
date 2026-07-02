
document.addEventListener('DOMContentLoaded', function(){

    // 🔐 proteção (opcional mas recomendado)
    const token = localStorage.getItem('alugae_token');
    const usuarioSalvo = localStorage.getItem('alugae_usuario') || localStorage.getItem('usuario');

    let usuario;

    if (token && usuarioSalvo) {
        try {
            usuario = JSON.parse(usuarioSalvo);
        } catch (error) {
            usuario = null;
        }
    }
    const nomeUsuarioMenu = document.getElementById('nomeUsuarioMenu');
    const avatarUsuarioMenu = document.getElementById('menuPerfil');
    const botaoSair = document.querySelector('.area-sair');

    if (nomeUsuarioMenu && usuario?.nome) {
        nomeUsuarioMenu.textContent = usuario.nome.trim().split(/\s+/)[0];
    }

    if (avatarUsuarioMenu && usuario?.foto_perfil) {
        avatarUsuarioMenu.src = usuario.foto_perfil;
    }

    if (botaoSair) {
        botaoSair.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('alugae_token');
            localStorage.removeItem('alugae_usuario');
            window.location.href = "../login-page/index.html";
        });
    }

    // 🎯 CATEGORIAS (seu código original)
    const botoesCategorias = document.querySelectorAll('.btn-categoria-filtro');

    botoesCategorias.forEach(botao => {
        botao.addEventListener('click', function() {
            botoesCategorias.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 🚀 BOTÃO ANUNCIAR
    const btnAnunciar = document.querySelector('.btn-anunciar');

    if (btnAnunciar) {
        btnAnunciar.addEventListener('click', () => {
            window.location.href = "../page-anunciar-item/index.html";
        });
    }

});
