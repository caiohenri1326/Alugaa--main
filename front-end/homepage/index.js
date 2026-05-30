
document.addEventListener('DOMContentLoaded', function(){

    // 🔐 proteção (opcional mas recomendado)
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "../login-page/index.html";
        return;
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

