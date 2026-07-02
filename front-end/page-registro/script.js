document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
=======

>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
    const form = document.querySelector('.form-registro');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

<<<<<<< HEAD
        const nome = form.querySelector('input.nome').value.trim();
        const email = form.querySelector('input.email').value.trim();
        const senha = form.querySelector('input.senha').value;
        const senha2 = form.querySelector('input.senha2').value;

=======
        const nome = document.querySelector('.nome').value.trim();
        const email = document.querySelector('.email').value.trim();
        const senha = document.querySelector('.senha').value;
        const senha2 = document.querySelector('.senha2').value;

        // 🚨 validações
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
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
<<<<<<< HEAD
=======

>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
            const res = await fetch('http://localhost:3000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
<<<<<<< HEAD
                body: JSON.stringify({ nome, email, senha })
=======
                body: JSON.stringify({
                    nome,
                    email,
                    senha
                })
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || 'Erro ao criar conta');
                return;
            }

            alert('Conta criada com sucesso 🚀');
<<<<<<< HEAD
=======

>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
            window.location.href = '../login-page/index.html';

        } catch (error) {
            console.error(error);
            alert('Erro no servidor');
        }
    });
<<<<<<< HEAD
=======

>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
});