
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('formLogin');

    function mostrarToast(mensagem) {

            const toast =
                document.getElementById('toast-login');

            const texto =
                document.getElementById('toast-text');

            texto.innerText = mensagem;

            toast.classList.add('mostrar');

            setTimeout(() => {

                toast.classList.remove('mostrar');

            }, 3000);

        }

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

        mostrarToast('Login realizado com sucesso 🚀');

        setTimeout(() => {

            window.location.href =
                "../homepage/index.html";

        }, 200);

        } catch (error) {
            console.error(error);
            alert('Erro ao fazer login');
        }
    });

});