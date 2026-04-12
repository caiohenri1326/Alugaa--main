document.addEventListener('DOMContentLoaded', function(){
    const botoesCategorias = document.querySelectorAll('.btn-categoria-filtro');

    botoesCategorias.forEach(botao => {
        botao.addEventListener('click', function() {
            // 1. Limpa a classe de todos os botões
            botoesCategorias.forEach(b => b.classList.remove('active'));

            // 2. Adiciona no botão que você clicou
            // Usamos 'this' aqui porque é uma function comum
            this.classList.add('active');
        });
    });
});