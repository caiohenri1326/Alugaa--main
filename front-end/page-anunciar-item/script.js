<<<<<<< HEAD
console.log('SCRIPT DE ANÚNCIO CARREGOU');

const root = document.documentElement;

window.addEventListener('DOMContentLoaded', () => {
    const corSelecionada = localStorage.getItem('temaCustomizado');
    if (corSelecionada) {
        root.style.setProperty('--cor-destaque', corSelecionada);
    }

    const temaSalvo = localStorage.getItem('modoTema');

    if (temaSalvo === 'escuro') {
        root.style.setProperty('--bg-site', '#1C1C1D');
        root.style.setProperty('--colorText', '#252728');
        root.style.setProperty('--fundo-de-abas', '#252728');
        root.style.setProperty('--colorTextCinza', '#A0A0A0');
        root.style.setProperty('--textoPreto', 'rgba(0, 0, 0, 0.631)');
        root.style.colorScheme = 'dark';
    }
});

document.addEventListener('DOMContentLoaded', () => {
=======
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
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
    const box = document.getElementById('endereco');
    const cepMain = box?.querySelector('.cep-main');
    const cepSub = box?.querySelector('.cep-sub');

    const selectCustom = document.querySelector('.select-custom');
<<<<<<< HEAD
    const selected = selectCustom?.querySelector('.select-selected');
    const options = selectCustom?.querySelectorAll('.select-options li');
    const inputHidden = selectCustom?.querySelector('input[type="hidden"]');

    if (selected && selectCustom && options) {
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
    }

    let endereco = {};
    const inputCep = document.getElementById('cep');

    if (inputCep) {
=======
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
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
        inputCep.addEventListener('input', () => {
            let cep = inputCep.value.replace(/\D/g, '').slice(0, 8);

            if (cep.length > 5) {
                cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
            }

            inputCep.value = cep;
        });

<<<<<<< HEAD
        inputCep.addEventListener('blur', async () => {
            const cep = inputCep.value.replace(/\D/g, '');

            if (cep.length !== 8) {
                box?.classList.add('hidden');
                endereco = {};
=======
        // 🔎 BUSCA CEP
        inputCep.addEventListener('blur', async () => {

            let cep = inputCep.value.replace(/\D/g, '');

            if (cep.length !== 8) {
                box?.classList.add('hidden');
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
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

<<<<<<< HEAD
                if (cepMain) cepMain.textContent = data.bairro || 'Sem bairro';
                if (cepSub) cepSub.textContent = `${data.localidade}, ${data.uf}`;
=======
                const cidade = `${data.localidade}, ${data.uf}`;

                // 🔥 ATUALIZA UI BONITA
                if (cepMain) cepMain.textContent = data.bairro || 'Sem bairro';
                if (cepSub) cepSub.textContent = cidade;
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe

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

<<<<<<< HEAD
    if (!form) {
        console.error('Formulário .form-anuncio não encontrado');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('FORM SUBMITOU');

        const token = localStorage.getItem('alugae_token');
=======
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe

        if (!token) {
            alert('Você precisa estar logado!');
            return;
        }

<<<<<<< HEAD
        const nome = document.querySelector('.input-titulo')?.value.trim();
        const descricao = document.querySelector('.area-caracteristicas')?.value.trim();
        const preco = document.querySelector('.input-preco')?.value;
        const categoria = inputHidden?.value;

        const fileInput = document.getElementById('foto');
        const imagem = fileInput?.files[0];

        if (!nome || !preco || !categoria) {
            alert('Preencha título, preço e categoria!');
=======
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
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
            return;
        }

        if (!endereco.cep) {
            alert('Digite um CEP válido!');
            return;
        }

        try {
            const formData = new FormData();

            formData.append('titulo', nome);
<<<<<<< HEAD
            formData.append('nome', nome);
            formData.append('descricao', descricao || '');
            formData.append('preco', preco);
            formData.append('preco_dia', preco);
            formData.append('categoria', categoria);
            formData.append('categoria_id', categoria);

            formData.append('cidade', endereco.localidade || '');
            formData.append('estado', endereco.uf || '');
            formData.append('cep', endereco.cep || '');
            formData.append('bairro', endereco.bairro || '');
            formData.append('logradouro', endereco.logradouro || '');

            if (imagem) {
                formData.append('foto', imagem);
            }
=======
            formData.append('descricao', descricao);
            formData.append('preco', preco);
            formData.append('categoria', categoria);
            formData.append('cidade', cidade);
            formData.append('cep', endereco.cep);
            formData.append('estado', endereco.uf);
            formData.append('bairro', endereco.bairro || '');
            formData.append('logradouro', endereco.logradouro || '');
            formData.append('foto', imagem);
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe

            const res = await fetch('http://localhost:3000/api/produtos', {
                method: 'POST',
                headers: {
<<<<<<< HEAD
                    Authorization: `Bearer ${token}`
=======
                    'Authorization': `Bearer ${token}`
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
                },
                body: formData
            });

<<<<<<< HEAD
            const data = await res.json().catch(() => null);

            if (!res.ok) {
                console.error('Erro backend:', data);
                alert(data?.message || 'Erro ao criar anúncio');
=======
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
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
                return;
            }

            alert('Anúncio criado com sucesso 🚀');
<<<<<<< HEAD
            window.location.href = '../homepage/index.html';
=======
            window.location.href = "../homepage/index.html";
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe

        } catch (error) {
            console.error('Erro geral:', error);
            alert('Erro ao criar anúncio');
        }
    });
<<<<<<< HEAD
=======

>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
});