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
const campoNumero = document.getElementById('enderecoNumero');
const campoCidade = document.getElementById('enderecoCidade');
const campoCep = document.getElementById('cep');
const botaoSalva = document.getElementById('salvar');
const botao_cancelar_endereco = aparecer_aba_adicionar_endereco.querySelector('.cancelar');
let enderecoEditandoId = null;


// VARIAVEIS DO TEMA 

const temaClaro = document.getElementById('claro');
const temaEscuro = document.getElementById('escuro');
const temaSistema = document.getElementById('tema-sistema');


var root = document.documentElement;


// MUDANDO COR DO SITE

const corItem = document.querySelectorAll('.cor-item');

//RECUPERAÇÃO DO TEMA 

window.onload = function() {
    // Recupera valor salvo no localStorage
    const root = document.documentElement;

    const corSelecionada = localStorage.getItem('temaCustomizado');
    if(corSelecionada){
        root.style.setProperty('--cor-destaque', corSelecionada);
    }
    
    const temaSalvo = localStorage.getItem('modoTema')

    if(temaSalvo === 'escuro'){
        root.style.setProperty('--bg-site', '#171412');
        root.style.setProperty('--colorText', '#252728');
        root.style.setProperty('--fundo-de-abas', '#201B18');
        root.style.setProperty('--colorTextCinza', '#8080807a');
        root.style.setProperty('--textoPreto', 'white');
        root.style.setProperty('--corInput', '#201A17');
        root.style.setProperty('--textoBranco', 'black')
        root.style.setProperty('color-scheme', 'dark');
    }
}
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
    campoNumero.value = "";
    campoCidade.value = "";
    campoCep.value = "";
}

function mostrarConfirmacaoExclusao(mensagem) {
    const confirmacaoExcluir = document.getElementById('confirmacao-excluir');
    const mostrarMensagemExcluir = document.getElementById('toast-menssage');

    mostrarMensagemExcluir.innerText = mensaje;
    confirmacaoExcluir.classList.add('mostrar');

    setTimeout(() => {
        confirmacaoExcluir.classList.remove('mostrar');
    }, 3000);
}

/* ============================================================
   3. EVENT LISTENERS (Interações)
   ============================================================ */

/* --- Navegação entre Abas --- */
botao_ativar_perfil.addEventListener('click', function() { alternarAba(this, tela_perfil, "Perfil");});
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
});

/* --- Lógica de Salvar Endereço --- */
botao_cancelar_endereco.addEventListener('click', function(event) {
    event.preventDefault();
    enderecoEditandoId = null;
    limparInputs();
    aparecer_aba_adicionar_endereco.close();
});

const enderecosApiUrl = 'http://localhost:3000/api/enderecos';

function tokenEnderecos() {
    return localStorage.getItem('alugae_token');
}

function fecharModalEndereco() {
    aparecer_aba_adicionar_endereco.classList.add('fechando');

    aparecer_aba_adicionar_endereco.addEventListener('animationend', function functionOnEnd() {
        aparecer_aba_adicionar_endereco.classList.remove('fechando');
        aparecer_aba_adicionar_endereco.removeEventListener('animationend', functionOnEnd);
        aparecer_aba_adicionar_endereco.close();
    });
}

function cidadeComEstado(endereco) {
    return [endereco.cidade, endereco.estado].filter(Boolean).join(', ');
}

function formatarCepEndereco(valor) {
    let cep = valor.replace(/\D/g, '').slice(0, 8);

    if (cep.length > 5) {
        cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
    }

    return cep;
}

async function buscarEnderecoPorCep() {
    const cep = campoCep.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        return;
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const endereco = await resposta.json();

        if (endereco.erro) {
            alert('CEP invalido');
            return;
        }

        campoCep.value = formatarCepEndereco(endereco.cep || cep);
        campoRua.value = endereco.logradouro || campoRua.value;
        campoCidade.value = [endereco.localidade, endereco.uf].filter(Boolean).join(', ');
    } catch (error) {
        alert('Erro ao buscar CEP');
    }
}

function renderizarEndereco(endereco) {
    const novoCard = aparecer_infos_endereco.cloneNode(true);

    novoCard.removeAttribute('id');
    novoCard.dataset.enderecoId = endereco.id;
    novoCard.style.display = 'flex';
    novoCard.querySelector('.nomeEndereco').innerText = endereco.complemento || 'Endereco';
    novoCard.querySelector('.text-endereco').innerText = [endereco.rua, endereco.numero].filter(Boolean).join(', ');
    novoCard.querySelector('.text-cidade').innerText = cidadeComEstado(endereco);
    novoCard.querySelector('.estado-cep').innerText = `CEP ${endereco.cep || ''}`;
    novoCard.querySelector('.edit-endereco').removeAttribute('id');
    novoCard.querySelector('.excluir-endereco').removeAttribute('id');

    novoCard.querySelector('.edit-endereco').addEventListener('click', () => {
        enderecoEditandoId = endereco.id;
        campoNome.value = endereco.complemento || '';
        campoRua.value = endereco.rua || '';
        campoNumero.value = endereco.numero || '';
        campoCidade.value = cidadeComEstado(endereco);
        campoCep.value = endereco.cep || '';
        aparecer_aba_adicionar_endereco.showModal();
    });

    novoCard.querySelector('.excluir-endereco').addEventListener('click', async () => {
        const token = tokenEnderecos();

        if (!token) {
            window.location.href = '../login-page/index.html';
            return;
        }

        const resposta = await fetch(`${enderecosApiUrl}/${endereco.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!resposta.ok) {
            alert('Erro ao remover endereco');
            return;
        }

        await carregarEnderecos();
    });

    lista_enderecos_container.appendChild(novoCard);
}

async function carregarEnderecos() {
    const token = tokenEnderecos();

    if (!token) {
        window.location.href = '../login-page/index.html';
        return;
    }

    const resposta = await fetch(enderecosApiUrl, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!resposta.ok) {
        alert('Erro ao carregar enderecos');
        return;
    }

    const enderecos = await resposta.json();

    lista_enderecos_container.querySelectorAll('.container-infos-endereco:not(#container-infos-endereco)').forEach((card) => {
        card.remove();
    });

    mensagem_vazia.style.display = enderecos.length ? 'none' : 'block';
    enderecos.forEach(renderizarEndereco);
}

botao_adicionar_novo_endereco.addEventListener('click', () => {
    enderecoEditandoId = null;
    limparInputs();
});

campoCep.addEventListener('input', () => {
    campoCep.value = formatarCepEndereco(campoCep.value);
});

campoCep.addEventListener('blur', buscarEnderecoPorCep);

botaoSalva.addEventListener('click', async function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const token = tokenEnderecos();

    if (!token) {
        window.location.href = '../login-page/index.html';
        return;
    }

    const dadosEndereco = {
        complemento: campoNome.value.trim(),
        rua: campoRua.value.trim(),
        numero: campoNumero.value.trim(),
        cidade: campoCidade.value.trim(),
        cep: campoCep.value.trim()
    };

    if (!dadosEndereco.complemento || !dadosEndereco.rua || !dadosEndereco.cidade) {
        alert('Preencha identificacao, rua e cidade!');
        return;
    }

    const url = enderecoEditandoId ? `${enderecosApiUrl}/${enderecoEditandoId}` : enderecosApiUrl;
    const metodo = enderecoEditandoId ? 'PUT' : 'POST';

    const resposta = await fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dadosEndereco)
    });

    if (!resposta.ok) {
        const erro = await resposta.json().catch(() => null);
        alert(erro?.message || 'Erro ao salvar endereco');
        return;
    }

    enderecoEditandoId = null;
    fecharModalEndereco();
    limparInputs();
    await carregarEnderecos();
}, true);

carregarEnderecos();

botaoSalva.addEventListener('click', function() {
    const nomeAddEndereco = campoNome.value;
    const rua = campoRua.value;
    const cidade = campoCidade.value;
    const cepVal = campoCep.value;

    if (nomeAddEndereco && rua) {
        const novoCard = aparecer_infos_endereco.cloneNode(true);

        novoCard.removeAttribute('id');
        novoCard.style.display = "flex";

        novoCard.querySelector('.nomeEndereco').innerText = nomeAddEndereco;
        novoCard.querySelector('.text-endereco').innerText = rua;
        novoCard.querySelector('.estado-cep').innerText = `${cidade} • CEP ${cepVal}`;

        lista_enderecos_container.appendChild(novoCard);

        mensagem_vazia.style.display = "none";
        aparecer_aba_adicionar_endereco.close();
        limparInputs();

        // Lógica de Exclusão do Novo Card
        const excluirEndereco = novoCard.querySelector('.excluir-endereco');
        excluirEndereco.addEventListener('click', function() {
            novoCard.remove();
            
            // Verifica se a lista ficou vazia (considerando o template original se estiver no container)
            if (lista_enderecos_container.children.length === 1) { 
                mensagem_vazia.style.display = "block";
            }
            mostrarConfirmacaoExclusao("Endereço removido.");
        });

    } else {
        alert("Preencha o nome e a rua!");
    }
});

// MUNDANDO TEMA DO SITE

temaClaro.addEventListener('click', function(){
    root.style.setProperty('--bg-site', '');
    root.style.setProperty('--colorText', '');
    root.style.setProperty('--fundo-de-abas', '');
    root.style.setProperty('--colorTextCinza', '');
    root.style.setProperty('--textoPreto', '');
    root.style.colorScheme = 'light';

    localStorage.setItem('modoTema', 'claro')
})

temaEscuro.addEventListener('click', function(){
    root.style.setProperty('--bg-site', '#1C1C1D');
    root.style.setProperty('--colorText', '#252728');
    root.style.setProperty('--fundo-de-abas', '#252728');
    root.style.setProperty('--colorTextCinza', '#A69D95');
    root.style.setProperty('--textoPreto', 'rgba(0, 0, 0, 0.631)');
    root.style.colorScheme = 'dark';


    localStorage.setItem('modoTema', 'escuro');
})



// MUDANDO A COR DOS ICONES E TEXTOS

corItem.forEach(botao => {
    botao.addEventListener('click', function(){
        const corSelecionada = this.getAttribute('data-color');
        const bgInputSelecionado = this.getAttribute('data-bg-input')
       
       if (corSelecionada){
        root.style.setProperty('--cor-destaque', corSelecionada);

        localStorage.setItem('temaCustomizado', corSelecionada);
       }

       if(this.id === 'laranja') root.style.setProperty('--cor-destaque-background-input', '#FCFAF7');
       if(this.id === 'azul') root.style.setProperty('--cor-destaque-background-input', '#8fc7ffff');
       if(this.id === 'verde') root.style.setProperty('--cor-destaque-background-input', '#cdfff1ff');
       if(this.id === 'rosa') root.style.setProperty('--cor-destaque-background-input', '#fdbed2ff');
       if(this.id === 'roxo') root.style.setProperty('--cor-destaque-background-input', '#e0d0fdff');
    })
})

/* ============================================================
   4. INICIALIZAÇÃO
   ============================================================ */
const perfilApiUrl = 'http://localhost:3000/api/usuarios/me';
const perfilToken = localStorage.getItem('alugae_token');
let perfilAtual = null;

const perfilFotoHeader = document.getElementById('fotoPerfilHeader');
const perfilFotoPreview = document.getElementById('fotoPerfilPreview');
const perfilInputFoto = document.getElementById('upload-foto');
const perfilNomeTopo = document.getElementById('nomePessoa');
const perfilDataEntrada = document.querySelector('.text-member span');
const perfilInputNome = document.getElementById('perfilNome');
const perfilInputTelefone = document.getElementById('perfilTelefone');
const perfilInputCidade = document.querySelector('.info-pessoais .cidade input');
const perfilInputCpf = document.getElementById('perfilCpf');
const perfilInputBio = document.querySelector('.info-pessoais .bio textarea');
const perfilBotaoSalvar = document.querySelector('.container-botoes-env .env');
const perfilBotaoCancelar = document.querySelector('.container-botoes-env .cancelar');
const contaInputEmail = document.getElementById('input-pegar-email');
const contaBotaoSalvarEmail = document.getElementById('salvar-email-conta');
const contaInputSenhaAtual = document.getElementById('senha-atual-conta');
const contaInputNovaSenha = document.getElementById('nova-senha-conta');
const contaInputConfirmarSenha = document.getElementById('confirmar-senha-conta');
const contaBotaoAtualizarSenha = document.getElementById('atualizar-senha-conta');
const contaBotaoExcluir = document.getElementById('excluir-conta');

function atualizarImagemPerfil(fotoPerfil) {
    if (!fotoPerfil) return;

    if (perfilFotoHeader) perfilFotoHeader.src = fotoPerfil;
    if (perfilFotoPreview) perfilFotoPreview.src = fotoPerfil;
}

function preencherFormularioPerfil(usuario) {
    perfilAtual = usuario;

    if (perfilNomeTopo) perfilNomeTopo.textContent = usuario.nome || 'Nome da Pessoa';
    if (perfilInputNome) perfilInputNome.value = usuario.nome || '';
    if (perfilInputTelefone) perfilInputTelefone.value = usuario.telefone || '';
    if (perfilInputCidade) perfilInputCidade.value = usuario.cidade || '';
    if (perfilInputCpf) perfilInputCpf.value = usuario.cpf || '';
    if (perfilInputBio) perfilInputBio.value = usuario.bio || '';
    if (contaInputEmail) contaInputEmail.value = usuario.email || '';

    if (perfilDataEntrada && usuario.created_at) {
        perfilDataEntrada.textContent = new Date(usuario.created_at).toLocaleDateString('pt-BR');
    }

    atualizarImagemPerfil(usuario.foto_perfil);
}

async function carregarPerfil() {
    if (!perfilToken) {
        window.location.href = '../login-page/index.html';
        return;
    }

    const resposta = await fetch(perfilApiUrl, {
        headers: {
            Authorization: `Bearer ${perfilToken}`
        }
    });

    if (!resposta.ok) {
        window.location.href = '../login-page/index.html';
        return;
    }

    const usuario = await resposta.json();
    preencherFormularioPerfil(usuario);
    localStorage.setItem('alugae_usuario', JSON.stringify(usuario));
    localStorage.setItem('usuario', JSON.stringify(usuario));
}

async function salvarPerfil(event) {
    event.preventDefault();

    if (!perfilToken) {
        window.location.href = '../login-page/index.html';
        return;
    }

    const formData = new FormData();
    formData.append('nome', perfilInputNome?.value.trim() || '');
    formData.append('telefone', perfilInputTelefone?.value.trim() || '');
    formData.append('cidade', perfilInputCidade?.value.trim() || '');
    formData.append('cpf', perfilInputCpf?.value.trim() || '');
    formData.append('bio', perfilInputBio?.value.trim() || '');

    if (perfilInputFoto?.files[0]) {
        formData.append('foto_perfil', perfilInputFoto.files[0]);
    }

    const resposta = await fetch(perfilApiUrl, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${perfilToken}`
        },
        body: formData
    });

    const dados = await resposta.json().catch(() => null);

    if (!resposta.ok) {
        alert(dados?.message || 'Erro ao salvar perfil');
        return;
    }

    preencherFormularioPerfil(dados.usuario);
    localStorage.setItem('alugae_usuario', JSON.stringify(dados.usuario));
    localStorage.setItem('usuario', JSON.stringify(dados.usuario));
    alert('Perfil atualizado com sucesso');
}

async function salvarEmailConta(event) {
    event.preventDefault();

    if (!perfilToken) {
        window.location.href = '../login-page/index.html';
        return;
    }

    const email = contaInputEmail?.value.trim() || '';

    if (!email) {
        alert('Informe o email');
        return;
    }

    const resposta = await fetch(`${perfilApiUrl}/email`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${perfilToken}`
        },
        body: JSON.stringify({ email })
    });

    const dados = await resposta.json().catch(() => null);

    if (!resposta.ok) {
        alert(dados?.message || 'Erro ao salvar email');
        return;
    }

    preencherFormularioPerfil(dados.usuario);
    localStorage.setItem('alugae_usuario', JSON.stringify(dados.usuario));
    localStorage.setItem('usuario', JSON.stringify(dados.usuario));
    alert('Email atualizado com sucesso');
}

async function atualizarSenhaConta(event) {
    event.preventDefault();

    if (!perfilToken) {
        window.location.href = '../login-page/index.html';
        return;
    }

    const senhaAtual = contaInputSenhaAtual?.value.trim() || '';
    const novaSenha = contaInputNovaSenha?.value.trim() || '';
    const confirmarSenha = contaInputConfirmarSenha?.value.trim() || '';

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
        alert('Preencha todos os campos de senha');
        return;
    }

    if (novaSenha !== confirmarSenha) {
        alert('As senhas nao conferem');
        return;
    }

    const resposta = await fetch(`${perfilApiUrl}/senha`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${perfilToken}`
        },
        body: JSON.stringify({ senhaAtual, novaSenha })
    });

    const dados = await resposta.json().catch(() => null);

    if (!resposta.ok) {
        alert(dados?.message || 'Erro ao atualizar senha');
        return;
    }

    contaInputSenhaAtual.value = '';
    contaInputNovaSenha.value = '';
    contaInputConfirmarSenha.value = '';
    alert(dados?.message || 'Senha atualizada com sucesso');
}

async function excluirContaUsuario(event) {
    event.preventDefault();

    if (!perfilToken) {
        window.location.href = '../login-page/index.html';
        return;
    }

    const confirmar = confirm('Tem certeza que deseja excluir sua conta? Esta acao nao pode ser desfeita.');

    if (!confirmar) {
        return;
    }

    const resposta = await fetch(perfilApiUrl, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${perfilToken}`
        }
    });

    const dados = await resposta.json().catch(() => null);

    if (!resposta.ok) {
        alert(dados?.message || 'Erro ao excluir conta');
        return;
    }

    localStorage.removeItem('alugae_token');
    localStorage.removeItem('alugae_usuario');
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioNome');
    alert(dados?.message || 'Conta excluida com sucesso');
    window.location.href = '../login-page/index.html';
}

if (perfilInputFoto) {
    perfilInputFoto.addEventListener('change', () => {
        const foto = perfilInputFoto.files[0];
        if (foto && perfilFotoPreview) {
            perfilFotoPreview.src = URL.createObjectURL(foto);
        }
    });
}

if (perfilBotaoSalvar) {
    perfilBotaoSalvar.addEventListener('click', salvarPerfil);
}

if (perfilBotaoCancelar) {
    perfilBotaoCancelar.addEventListener('click', (event) => {
        event.preventDefault();
        if (perfilAtual) preencherFormularioPerfil(perfilAtual);
        if (perfilInputFoto) perfilInputFoto.value = '';
    });
}

if (contaBotaoSalvarEmail) {
    contaBotaoSalvarEmail.addEventListener('click', salvarEmailConta);
}

if (contaBotaoAtualizarSenha) {
    contaBotaoAtualizarSenha.addEventListener('click', atualizarSenhaConta);
}

if (contaBotaoExcluir) {
    contaBotaoExcluir.addEventListener('click', excluirContaUsuario);
}

carregarPerfil().catch((error) => {
    console.error('Erro ao carregar perfil:', error);
    alert('Erro ao carregar perfil');
});

botao_ativar_perfil.click();