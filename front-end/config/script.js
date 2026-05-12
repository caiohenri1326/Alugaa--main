/* ============================================================
   1. REFERÊNCIAS DO DOM (Elementos Globais)
   ============================================================ */

// Layout e UI Geral
const text_area = document.getElementById('text-area');
const divisao_container_esquerdo = document.getElementById('divisao-container-esquerdo');
const config_sidebar = document.getElementById('config-sidebar');
const container_exit = document.getElementById('container-exit');
const container_botao_divisoria = document.getElementById('container-botao-divisoria');

// Abas (Navegação)
const botoesMenu = document.querySelectorAll('.nav-item');
const todas_as_telas = document.querySelectorAll('.tela'); 

const botao_ativar_perfil = document.getElementById('botao-ativar-perfil');
const botao_ativar_conta = document.getElementById('botao-ativar-conta');
const botao_ativar_aparencia = document.getElementById('botao-ativar-aparencia');
const botao_ativar_endereco = document.getElementById('botao-ativar-endereco');
const botao_ativar_seguranca = document.getElementById('botao-ativar-seguranca');
const botao_ativar_privacidade = document.getElementById('botao-ativar-privacidade');

// Containers de Conteúdo
const tela_perfil = document.getElementById('container-perfil');
const containerConta = document.getElementById('container-conta');
const container_aparencia = document.getElementById('container-aparencia');
const container_endereco = document.getElementById('container-endereco');
const container_seguranca = document.getElementById('container-seguranca');
const container_privacidade = document.getElementById('container-privacidade');

// Módulos de Endereço (Modal e Listagem)
const aparecer_aba_adicionar_endereco = document.getElementById('aba-adicionar-novo-endereco');
const botao_adicionar_novo_endereco = document.getElementById('adicionar-novo-endereco');
const aparecer_infos_endereco = document.getElementById('container-infos-endereco');
const lista_enderecos_container = document.getElementById('lista-enderecos-container');
const mensagem_vazia = document.getElementById('mensagem-vazia');

// Inputs e Botões do Modal de Endereço
const campoNome = document.getElementById('nomeDoEndereco');
const campoRua = document.getElementById('enderecoRua');
const campoNumero = document.getElementById('numeroCasa');
const campoCidade = document.getElementById('enderecoCidade');
const campoBairro = document.getElementById('bairro');
const campoEstado = document.getElementById('estado');
const campoCep = document.getElementById('cep');
const botaoSalva = document.getElementById('salvar');
const botaoCancelar = document.getElementById('cancelar');
const botao_cancelar_endereco = aparecer_aba_adicionar_endereco.querySelector('.cancelar');

/* ============================================================
   2. FUNÇÕES AUXILIARES (Lógica de Negócio)
   ============================================================ */

function esconderTodasAsTelas() {
    todas_as_telas.forEach(tela => {
        tela.style.display = 'none';
        tela.classList.remove('ativa');
    });

    const todosOsBotoes = document.querySelectorAll('.nav-item button');
    todosOsBotoes.forEach(btn => {
        btn.classList.remove('ativo');
    })
}

function alternarAba(botaoClicado, telaParaMostrar, nomeTexto) {
    esconderTodasAsTelas();

    if (telaParaMostrar) {
        telaParaMostrar.style.display = 'block';
        telaParaMostrar.classList.add('ativa');
    }

    botaoClicado.classList.add('ativo');
    text_area.innerText = nomeTexto;
    
    // Reiniciar animação do texto
    text_area.style.animation = 'none';
    text_area.offsetHeight; // Trigger reflow
    text_area.style.animation = '';
}

function Animaçoes() {
    config_sidebar.classList.toggle('ativado');
    document.body.classList.toggle('sidebar-encolhida');
    container_botao_divisoria.classList.toggle('movendo-botao-divisoria');
    container_exit.classList.toggle('movendo-botao-sair');
}

function limparInputs() {
    campoNome.value = "";
    campoRua.value = "";
    campoCidade.value = "";
    campoCep.value = "";
}

function mostrarConfirmacaoExclusao(mensagem) {
    const confirmacaoExcluir = document.getElementById('confirmacao-excluir');
    const mostrarMensagemExcluir = document.getElementById('toast-menssage');

    mostrarMensagemExcluir.innerText = mensagem;
    confirmacaoExcluir.classList.add('mostrar');

    setTimeout(() => {
        confirmacaoExcluir.classList.remove('mostrar');
    }, 3000);
}

/* ============================================================
   3. EVENT LISTENERS (Interações)
   ============================================================ */

/* --- Navegação entre Abas --- */
botao_ativar_perfil.addEventListener('click', function() { alternarAba(this, tela_perfil, "Perfil"); });
botao_ativar_conta.addEventListener('click', function() { alternarAba(this, containerConta, "Conta"); });
botao_ativar_aparencia.addEventListener('click', function() { alternarAba(this, container_aparencia, "Aparencia"); });
botao_ativar_endereco.addEventListener('click', function() { alternarAba(this, container_endereco, "Endereço"); });
botao_ativar_seguranca.addEventListener('click', function() { alternarAba(this, container_seguranca, "Segurança"); });
botao_ativar_privacidade.addEventListener('click', function() { alternarAba(this, container_privacidade, "Privacidade"); });

/* --- Sidebar --- */
divisao_container_esquerdo.addEventListener('click', Animaçoes);

/* --- Modal de Endereço (Ações de Abrir/Fechar) --- */
botao_adicionar_novo_endereco.addEventListener('click', () => {

    aparecer_aba_adicionar_endereco.showModal();

    requestAnimationFrame(() => {
        aparecer_aba_adicionar_endereco.classList.add('ativo');
    });

});

botaoCancelar.addEventListener('click', function (event) {

    event.preventDefault();

    limparInputs();

    aparecer_aba_adicionar_endereco.classList.remove('ativo');

    setTimeout(() => {

        aparecer_aba_adicionar_endereco.close();

    }, 200);

});
// 📮 CEP ENDEREÇO
campoCep.addEventListener('input', () => {

    let valor = campoCep.value
        .replace(/\D/g, '')
        .slice(0, 8);

    // 12345-678
    if (valor.length > 5) {

        valor =
            valor.slice(0, 5) +
            '-' +
            valor.slice(5);

    }

    campoCep.value = valor;

});

// 🔥 BUSCAR CEP AUTOMATICAMENTE
campoCep.addEventListener('blur', async () => {

    const cep = campoCep.value
        .replace(/\D/g, '');

    // 🚨 CEP inválido
    if (cep.length !== 8) {

        alert('CEP inválido');

        return;
    }

    try {

        const res = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        const data = await res.json();

        // 🚨 CEP não encontrado
        if (data.erro) {

            alert('CEP não encontrado');

            return;
        }

        // 🔥 PREENCHER CAMPOS
        campoRua.value = data.logradouro || '';

        campoBairro.value = data.bairro || '';

        campoCidade.value = data.localidade || '';

        campoEstado.value = data.uf || '';

    } catch (error) {

        console.error(error);

        alert('Erro ao buscar CEP');

    }

});

/* --- Lógica de Salvar Endereço --- */
botaoSalva.addEventListener('click', async function () {

    const nome = campoNome.value;
    const rua = campoRua.value;
    const numero = campoNumero.value;
    const cidade = campoCidade.value;
    const cepVal = campoCep.value;

    // 🚨 validação
    if (!nome || !rua || !numero || !cidade || !cepVal) {

        alert('Preencha todos os campos!');

        return;
    }

    try {

        const token = localStorage.getItem('token');

        // 🚀 ENVIA PRO BACKEND
        const res = await fetch(
            'http://localhost:3000/api/enderecos',
            {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({

                    nome_endereco: nome,

                    logradouro: rua,

                    numero: numero,

                    cidade: cidade,

                    cep: cepVal

                })

            }
        );

        const data = await res.json();

        if (!res.ok) {

            alert(data.message);

            return;
        }

        // 🔥 cria card visual
        const novoCard = aparecer_infos_endereco.cloneNode(true);

        novoCard.removeAttribute('id');

        novoCard.style.display = "flex";

        novoCard.querySelector('.nomeEndereco').innerText = nome;

        novoCard.querySelector('.text-endereco').innerText =
            `${rua}, ${numero}`;

        novoCard.querySelector('.estado-cep').innerText =
            `${cidade} • CEP ${cepVal}`;

        lista_enderecos_container.appendChild(novoCard);

        mensagem_vazia.style.display = "none";

        // ✅ fecha modal
        aparecer_aba_adicionar_endereco.close();

        // 🧹 limpa inputs
        limparInputs();

        alert('Endereço salvo com sucesso 🚀');

    } catch (error) {

        console.error(error);

        alert('Erro ao salvar endereço');

    }

});

/* ============================================================
   4. INICIALIZAÇÃO
   ============================================================ */
botao_ativar_perfil.click();

/* ============================================================
   5. CARREGAR DADOS DO USUÁRIO
============================================================ */

document.addEventListener('DOMContentLoaded', async () => {

    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '../login-page/index.html';
        return;
    }

    try {

        const res = await fetch('http://localhost:3000/api/usuarios/me', {

            method: 'GET',

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const usuario = await res.json();

        console.log('USUÁRIO:', usuario);

        // 🔥 TOPO PERFIL
        document.getElementById('nomePessoa').textContent =
            usuario.nome || 'Usuário';

        // 🔥 INPUT NOME
        document.querySelector('.nome input').value =
            usuario.nome || '';

        // 🔥 TELEFONE
        document.querySelector('.fone input').value =
            usuario.telefone || '';

        // 🔥 CIDADE
        document.querySelector('.cidade input').value =
            usuario.cidade || '';

        // 🔥 CPF
        document.querySelector('.cpf input').value =
            usuario.cpf || '';

        // 🔥 RG
        document.querySelector('.rg input').value =
            usuario.rg || '';

        // 🔥 BIO
        document.querySelector('.bio textarea').value =
            usuario.bio || '';

        // 🔥 EMAIL
        document.querySelector('.input-email input').value =
            usuario.email || '';

        // 🔥 MEMBRO DESDE
        const membroDesde =
            new Date(usuario.criado_em).toLocaleDateString('pt-BR');

        document.querySelector('.text-member span').textContent =
            membroDesde;

    } catch (error) {

        console.error('ERRO AO CARREGAR PERFIL:', error);

    }

});

/* ============================================================
   6. FORMATAÇÃO AUTOMÁTICA
============================================================ */

// 📱 TELEFONE
const inputTelefone = document.querySelector('.fone input');

inputTelefone.addEventListener('input', () => {

    let valor = inputTelefone.value
        .replace(/\D/g, '')
        .slice(0, 11);

    valor = valor.replace(
        /^(\d{2})(\d)/,
        '($1) $2'
    );

    valor = valor.replace(
        /(\d{5})(\d)/,
        '$1-$2'
    );

    inputTelefone.value = valor;

});

// 🪪 CPF
const inputCpf = document.querySelector('.cpf input');

inputCpf.addEventListener('input', () => {

    let valor = inputCpf.value
        .replace(/\D/g, '')
        .slice(0, 11);

    valor = valor.replace(
        /(\d{3})(\d)/,
        '$1.$2'
    );

    valor = valor.replace(
        /(\d{3})(\d)/,
        '$1.$2'
    );

    valor = valor.replace(
        /(\d{3})(\d{1,2})$/,
        '$1-$2'
    );

    inputCpf.value = valor;

});

// 🪪 RG
const inputRg = document.querySelector('.rg input');

inputRg.addEventListener('input', () => {

    let valor = inputRg.value
        .replace(/\D/g, '')
        .slice(0, 9);

    valor = valor.replace(
        /(\d{2})(\d)/,
        '$1.$2'
    );

    valor = valor.replace(
        /(\d{3})(\d)/,
        '$1.$2'
    );

    valor = valor.replace(
        /(\d{3})(\d)/,
        '$1-$2'
    );

    inputRg.value = valor;

});

// ============================================================
// 🔥 ATUALIZAR PERFIL
// ============================================================

const botaoSalvarPerfil = document.getElementById('salvar-perfil');

botaoSalvarPerfil.addEventListener('click', async () => {

    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa estar logado');
        return;
    }

    const nome = document.getElementById('input-nome').value;
    const telefone = document.getElementById('input-telefone').value;
    const cidade = document.getElementById('input-cidade').value;
    const cpf = document.getElementById('input-cpf').value;
    const rg = document.getElementById('input-rg').value;
    const bio = document.getElementById('input-bio').value;

    try {

        const res = await fetch(
            'http://localhost:3000/api/usuarios/me',
            {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

                body: JSON.stringify({
                    nome,
                    telefone,
                    cidade,
                    cpf,
                    rg,
                    bio
                })
            }
        );

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        alert('Perfil atualizado com sucesso 🚀');

    } catch (error) {

        console.error(error);

        alert('Erro ao atualizar perfil');

    }

});

/* ============================================================
   📦 CARREGAR ENDEREÇOS
============================================================ */

async function carregarEnderecos() {

    try {

        const token = localStorage.getItem('token');

        const res = await fetch(
            'http://localhost:3000/api/enderecos',
            {

                method: 'GET',

                headers: {
                    Authorization: `Bearer ${token}`
                }

            }
        );

        const enderecos = await res.json();

        console.log(enderecos);

        // limpa lista
        lista_enderecos_container.innerHTML = '';

        // 🚨 sem endereço
        if (enderecos.length === 0) {

            mensagem_vazia.style.display = 'block';

            return;
        }

        mensagem_vazia.style.display = 'none';

        // 🔥 cria cards
        enderecos.forEach(endereco => {

            const novoCard =
                aparecer_infos_endereco.cloneNode(true);

            novoCard.removeAttribute('id');

            novoCard.style.display = 'flex';

            novoCard.querySelector('.nomeEndereco').innerText =
                endereco.nome_endereco;

            novoCard.querySelector('.text-endereco').innerText =
                `${endereco.logradouro}, ${endereco.numero}`;

            novoCard.querySelector('.estado-cep').innerText =
                `${endereco.cidade} • CEP ${endereco.cep}`;

            lista_enderecos_container.appendChild(novoCard);

        });

    } catch (error) {

        console.error(error);

    }

}

carregarEnderecos();