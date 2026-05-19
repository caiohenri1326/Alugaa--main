const root = document.documentElement;

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
            localStorage.setItem('token', data.token);

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