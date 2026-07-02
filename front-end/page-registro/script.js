document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-registro');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = form.querySelector('input.nome').value.trim();
        const email = form.querySelector('input.email').value.trim();
        const senha = form.querySelector('input.senha').value;
        const senha2 = form.querySelector('input.senha2').value;

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
                body: JSON.stringify({ nome, email, senha })
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