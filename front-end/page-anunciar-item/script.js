document.addEventListener('DOMContentLoaded', () => {

    // =============================
    // SELECT CUSTOM (SEU CÓDIGO)
    // =============================
    const selectCustom = document.querySelector('.select-custom');
    const selected = selectCustom.querySelector('.select-selected');
    const options = selectCustom.querySelectorAll('.select-options li');
    const inputHidden = selectCustom.querySelector('input[type="hidden"]');

    // Abre / fecha o select
    selected.addEventListener('click', () => {
        selectCustom.classList.toggle('open');
    });

    // Clique em uma opção
    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.textContent = option.textContent;
            inputHidden.value = option.dataset.value;
            selectCustom.classList.remove('open');
        });
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
        if (!selectCustom.contains(e.target)) {
            selectCustom.classList.remove('open');
        }
    });

    // =============================
    // ENVIO DO FORMULÁRIO
    // =============================
    const form = document.querySelector('.form-anuncio');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (!token) {
            alert('Você precisa estar logado');
            window.location.href = "../login-page/index.html";
            return;
        }

        // 📦 dados do formulário
        const titulo = document.querySelector('.nome-do-anuncio input').value;
        const categoria = inputHidden.value;
        const preco = document.querySelector('.input-preco').value;
        const descricao = document.querySelector('.area-caracteristicas').value;
        const cidade = document.querySelector('.input-localization').value;
        const telefone = document.querySelector('.container-contato input').value;

        // validação básica
        if (!titulo || !categoria || !preco) {
            alert('Preencha título, categoria e preço');
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    titulo,
                    categoria,
                    preco,
                    descricao,
                    cidade,
                    telefone
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            alert('Anúncio criado com sucesso 🚀');

            // limpa form
            form.reset();
            inputHidden.value = '';
            selected.textContent = 'Categorias';

        } catch (error) {
            console.error(error);
            alert('Erro ao criar anúncio');
        }
    });

    // =============================
    // BOTÃO CANCELAR
    // =============================
    const btnCancel = document.querySelector('.button-cancel');

    btnCancel.addEventListener('click', (e) => {
        e.preventDefault();
        form.reset();
        inputHidden.value = '';
        selected.textContent = 'Categorias';
    });

});