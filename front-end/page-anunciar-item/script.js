document.addEventListener('DOMContentLoaded', () => {

    // 🎯 SELECT CUSTOM (mantido)
    const selectCustom = document.querySelector('.select-custom');
    const selected = selectCustom.querySelector('.select-selected');
    const options = selectCustom.querySelectorAll('.select-options li');
    const inputHidden = selectCustom.querySelector('input[type="hidden"]');

    selected.addEventListener('click', () => {
        selectCustom.classList.toggle('open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.textContent = option.textContent;
            inputHidden.value = option.dataset.value;
            selectCustom.classList.remove('open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!selectCustom.contains(e.target)) {
            selectCustom.classList.remove('open');
        }
    });

    // 🚀 FORM
    const form = document.querySelector('.form-anuncio');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            alert('Você precisa estar logado!');
            return;
        }

        // 🔥 DADOS
        const nome = document.querySelector('.input-titulo')?.value;
        const descricao = document.querySelector('.area-caracteristicas')?.value;
        const preco = document.querySelector('.input-preco')?.value;
        const categoria = inputHidden?.value;
        const cidade = document.querySelector('.input-localization')?.value;

        // 📸 IMAGEM
        const fileInput = document.getElementById('foto');
        const imagem = fileInput?.files[0];

        // 🛑 VALIDAÇÃO
        if (!nome || !preco || !categoria || !imagem) {
            alert('Preencha todos os campos obrigatórios, incluindo a imagem!');
            return;
        }

        try {
            const formData = new FormData();

            formData.append('titulo', nome);
            formData.append('descricao', descricao);
            formData.append('preco', preco);
            formData.append('categoria', categoria);
            formData.append('cidade', cidade);
            formData.append('telefone', '');

            // 📸 imagem
            formData.append('foto', imagem);

            // 🧪 DEBUG (IMPORTANTE AGORA)
            console.log('Enviando:', {
                nome,
                preco,
                categoria,
                cidade,
                imagem
            });

            const res = await fetch('http://localhost:3000/api/produtos', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            // ⚠️ PROTEÇÃO CONTRA ERRO HTML (SEU CASO)
            let data;
            try {
                data = await res.json();
            } catch {
                const text = await res.text();
                console.error('Resposta não é JSON:', text);
                alert('Erro no servidor (resposta inválida)');
                return;
            }

            if (!res.ok) {
                console.error('Erro backend:', data);
                alert(data.message || 'Erro ao criar anúncio');
                return;
            }

            alert('Anúncio criado com sucesso 🚀');

            window.location.href = "../homepage/index.html";

        } catch (error) {
            console.error('Erro geral:', error);
            alert('Erro ao criar anúncio');
        }
    });

});