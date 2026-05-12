document.addEventListener('DOMContentLoaded', () => {

    const form =
        document.querySelector('.form-registro');

    // 🔥 TOAST
    function mostrarToast(mensagem) {

        const toast =
            document.getElementById('toast-register');

        const texto =
            document.getElementById('toast-register-text');

        texto.innerText = mensagem;

        toast.classList.add('mostrar');

        setTimeout(() => {

            toast.classList.remove('mostrar');

        }, 3000);

    }

    // 🚀 SUBMIT
    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        const nome =
            document.querySelector('.nome').value.trim();

        const email =
            document.querySelector('.email').value.trim();

        const senha =
            document.querySelector('.senha').value;

        const senha2 =
            document.querySelector('.senha2').value;

        // 🚨 validações
        if (!nome || !email || !senha || !senha2) {

            mostrarToast(
                'Preencha todos os campos!'
            );

            return;
        }

        if (senha.length < 6) {

            mostrarToast(
                'A senha precisa ter no mínimo 6 caracteres'
            );

            return;
        }

        if (senha !== senha2) {

            mostrarToast(
                'As senhas não coincidem'
            );

            return;
        }

        try {

            const res = await fetch(
                'http://localhost:3000/api/usuarios',
                {

                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        nome,
                        email,
                        senha
                    })

                }
            );

            const data = await res.json();

            if (!res.ok) {

                mostrarToast(
                    data.message ||
                    'Erro ao criar conta'
                );

                return;
            }

            mostrarToast(
                'Conta criada com sucesso 🚀'
            );

            setTimeout(() => {

                window.location.href =
                    '../login-page/index.html';

            }, 2000);

        } catch (error) {

            console.error(error);

            mostrarToast(
                'Erro no servidor'
            );

        }

    });

});