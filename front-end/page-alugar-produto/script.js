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



