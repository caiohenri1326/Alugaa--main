// var root = document.documentElement;

window.onload = function() {
    // Recupera valor salvo no localStorage
    const corSelecionada = localStorage.getItem('temaCustomizado');
    root.style.setProperty('--cor-destaque', corSelecionada);


    const temaSalvo = localStorage.getItem('modoTema')

    if(temaSalvo === 'escuro'){
        root.style.setProperty('--bg-site', '#1C1C1D');
        root.style.setProperty('--colorText', '#252728');
        root.style.setProperty('--fundo-de-abas', '#252728');
        root.style.setProperty('--colorTextCinza', '#A0A0A0');
        root.style.setProperty('--textoPreto', 'rgba(0, 0, 0, 0.631)');
        root.style.colorScheme = 'dark';
    }
}

const MostrarSenha = document.getElementById('eye-password');
const InputSenha = document.getElementById('senha');

// Desenho do Olho Aberto do Bootstrap
const svgOlhoAberto = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/></svg>`;

// Desenho do Olho Cortado do Bootstrap
const svgOlhoCortado = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/><path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/></svg>`;

// Inicializa a div com o olho aberto
MostrarSenha.innerHTML = svgOlhoAberto;

MostrarSenha.addEventListener('click', function(){
    if (InputSenha.type === "password") {
        InputSenha.type = "text";
        MostrarSenha.innerHTML = svgOlhoCortado; // Força o desenho do olho cortado
    } else {
        InputSenha.type = "password";
        MostrarSenha.innerHTML = svgOlhoAberto; // Força o desenho do olho aberto
    }
});


document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('formLogin');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        try {
            const res = await fetch('http://localhost:3000/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            // 🔐 salva token
            localStorage.setItem('alugae_token', data.token);

            // 🔥 salva usuário
            localStorage.setItem('usuario', JSON.stringify(data.usuario));

            // 🔥 salva ID separado (opcional mas útil)
            localStorage.setItem('usuarioId', data.usuario.id);

            // 🔥 salva nome separado
            localStorage.setItem('usuarioNome', data.usuario.nome);

            alert('Login realizado com sucesso 🔐');

            window.location.href = "../homepage/index.html";

        } catch (error) {
            console.error(error);
            alert('Erro ao fazer login');
        }
    });

});
