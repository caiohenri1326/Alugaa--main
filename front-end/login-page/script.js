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

            localStorage.setItem('token', data.token);

            alert('Login realizado com sucesso 🔐');

            window.location.href = "../homepage/index.html";

        } catch (error) {
            console.error(error);
            alert('Erro ao fazer login');
        }
    });

});