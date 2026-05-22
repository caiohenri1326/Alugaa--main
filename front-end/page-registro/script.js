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

    const form = document.querySelector('.form-registro');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.querySelector('.nome').value.trim();
        const email = document.querySelector('.email').value.trim();
        const senha = document.querySelector('.senha').value;
        const senha2 = document.querySelector('.senha2').value;

        // 🚨 validações
        if (!nome || !email || !senha || !senha2) {
            alert('Preencha todos os campos!');
            return;
        }

        if (senha.length < 6) {
            alert('A senha precisa ter no mínimo 6 caracteres');
            return;
        }

        if (senha !== senha2) {
            alert('As senhas não coincidem');
            return;
        }

        try {

            const res = await fetch('http://localhost:3000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || 'Erro ao criar conta');
                return;
            }

            alert('Conta criada com sucesso 🚀');

            window.location.href = '../login-page/index.html';

        } catch (error) {
            console.error(error);
            alert('Erro no servidor');
        }
    });

});