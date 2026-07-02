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
    const box = document.getElementById('endereco');
    const cepMain = box?.querySelector('.cep-main');
    const cepSub = box?.querySelector('.cep-sub');

    const selectCustom = document.querySelector('.select-custom');
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
        inputCep.addEventListener('input', () => {
            let cep = inputCep.value.replace(/\D/g, '').slice(0, 8);

            if (cep.length > 5) {
                cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
            }

            inputCep.value = cep;
        });

        inputCep.addEventListener('blur', async () => {
            const cep = inputCep.value.replace(/\D/g, '');

            if (cep.length !== 8) {
                box?.classList.add('hidden');
                endereco = {};
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

                if (cepMain) cepMain.textContent = data.bairro || 'Sem bairro';
                if (cepSub) cepSub.textContent = `${data.localidade}, ${data.uf}`;

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

    if (!form) {
        console.error('Formulário .form-anuncio não encontrado');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('FORM SUBMITOU');

        const token = localStorage.getItem('alugae_token');

        if (!token) {
            alert('Você precisa estar logado!');
            return;
        }

        const nome = document.querySelector('.input-titulo')?.value.trim();
        const descricao = document.querySelector('.area-caracteristicas')?.value.trim();
        const preco = document.querySelector('.input-preco')?.value;
        const categoria = inputHidden?.value;

        const fileInput = document.getElementById('foto');
        const imagem = fileInput?.files[0];

        if (!nome || !preco || !categoria) {
            alert('Preencha título, preço e categoria!');
            return;
        }

        if (!endereco.cep) {
            alert('Digite um CEP válido!');
            return;
        }

        try {
            const formData = new FormData();

            formData.append('titulo', nome);
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

            const res = await fetch('http://localhost:3000/api/produtos', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                console.error('Erro backend:', data);
                alert(data?.message || 'Erro ao criar anúncio');
                return;
            }

            alert('Anúncio criado com sucesso 🚀');
            window.location.href = '../homepage/index.html';

        } catch (error) {
            console.error('Erro geral:', error);
            alert('Erro ao criar anúncio');
        }
    });
});