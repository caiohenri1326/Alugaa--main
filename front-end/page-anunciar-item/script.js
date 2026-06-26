const root = document.documentElement;

window.addEventListener('DOMContentLoaded', () =>{
    // Recupera valor salvo no localStorage
    const corSelecionada = localStorage.getItem('temaCustomizado');
    root.style.setProperty('--cor-destaque', corSelecionada);


    const temaSalvo = localStorage.getItem('modoTema')

    if(temaSalvo === 'escuro'){
        root.style.setProperty('--bg-site', '#171412');
        root.style.setProperty('--colorText', '#252728');
        root.style.setProperty('--fundo-de-abas', '#201B18');
        root.style.setProperty('--colorTextCinza', '#A0A0A0');
        root.style.setProperty('--textoPreto', 'rgba(255, 255, 255, 0.9)');
        root.style.colorScheme = 'dark';
    }
})




document.addEventListener('DOMContentLoaded', () => {

    // 🔥 ELEMENTOS DO CARD DE ENDEREÇO
    const box = document.getElementById('endereco');
    const cepMain = box?.querySelector('.cep-main');
    const cepSub = box?.querySelector('.cep-sub');

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

    let endereco = {};

    const inputCep = document.getElementById('cep');

    if (inputCep) {

        // 💡 FORMATA CEP AUTOMÁTICO
        inputCep.addEventListener('input', () => {
            let cep = inputCep.value.replace(/\D/g, '').slice(0, 8);

            if (cep.length > 5) {
                cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
            }

            inputCep.value = cep;
        });

        // 🔎 BUSCA CEP
        inputCep.addEventListener('blur', async () => {

            let cep = inputCep.value.replace(/\D/g, '');

            if (cep.length !== 8) {
                box?.classList.add('hidden');
                return;
            }

            try {
                box?.classList.remove('hidden');
                box?.classList.add('loading');

                if (cepMain) cepMain.textContent = 'Buscando endereço...';
                if (cepSub) cepSub.textContent = '';

                const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await res.json();

                if (data.erro) {
                    if (cepMain) cepMain.textContent = 'CEP inválido ❌';
                    if (cepSub) cepSub.textContent = '';
                    endereco = {};
                    return;
                }

                endereco = data;

                const cidade = `${data.localidade}, ${data.uf}`;

                // 🔥 ATUALIZA UI BONITA
                if (cepMain) cepMain.textContent = data.bairro || 'Sem bairro';
                if (cepSub) cepSub.textContent = cidade;

                box?.classList.remove('loading');

            } catch (error) {
                console.error('Erro CEP:', error);

                if (cepMain) cepMain.textContent = 'Erro ao buscar CEP ❌';
                if (cepSub) cepSub.textContent = '';

                box?.classList.remove('loading');
                endereco = {};
            }
        });
    }

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

        // 📍 cidade vem do CEP
        const cidade = `${endereco.localidade}, ${endereco.uf}`;

        // 📸 IMAGEM
        const fileInput = document.getElementById('foto');
        const imagem = fileInput?.files[0];

        // 🛑 VALIDAÇÃO
        if (!nome || !preco || !categoria || !imagem) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        if (!endereco.cep) {
            alert('Digite um CEP válido!');
            return;
        }

        try {
            const formData = new FormData();

            formData.append('titulo', nome);
            formData.append('descricao', descricao);
            formData.append('preco', preco);
            formData.append('categoria', categoria);
            formData.append('cidade', cidade);
            formData.append('cep', endereco.cep);
            formData.append('estado', endereco.uf);
            formData.append('bairro', endereco.bairro || '');
            formData.append('logradouro', endereco.logradouro || '');
            formData.append('foto', imagem);

            const res = await fetch('http://localhost:3000/api/produtos', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            let data;
            try {
                data = await res.json();
            } catch {
                const text = await res.text();
                console.error('Resposta não é JSON:', text);
                alert('Erro no servidor');
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