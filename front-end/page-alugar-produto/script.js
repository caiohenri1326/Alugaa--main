const cssAbas = document.querySelectorAll('.mudar');

function alternarAba(abaClicada){
    cssAbas.forEach(aba => {
        aba.classList.remove('active');
    });

    abaClicada.classList.add('active');
    
    // ---------- MOSTRAR CONTEUDO ----------------

    const conteudos = document.querySelectorAll('.conteudo-aba');
    conteudos.forEach(conteudo => conteudo.classList.remove('active'));


    const idConteudoAlvo = abaClicada.getAttribute('data-aba');


    const conteudoAlvo = document.getElementById(idConteudoAlvo);
    if(conteudoAlvo){
        conteudoAlvo.classList.add('active');
    }
}

<<<<<<< HEAD


=======
// ---------------------- SELEÇÃO DE PAGAMENTO ---------------------------


const cardsPagamento = document.querySelectorAll('.method-card');

cardsPagamento.forEach(card => {
    card.addEventListener('click', () =>{
        cardsPagamento.forEach(c => c.classList.remove('selecionado'));
        
        card.classList.add('selecionado');
    })

    
})
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
