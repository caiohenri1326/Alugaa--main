const usuariosModel = require('../models/usuariosModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// cadastro (já feito)
const cadastrar = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    try {
        // criptografar senha
        const senhaHash = await bcrypt.hash(senha, 10);

        usuariosModel.criarUsuario(
            { nome, email, senha: senhaHash },
            (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({ message: 'Email já cadastrado' });
                    }
                    return res.status(500).json({ message: 'Erro ao cadastrar' });
                }

                res.status(201).json({
                    message: 'Usuário criado com sucesso 🔐'
                });
            }
        );
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criptografar senha' });
    }
};

// LOGIN
const login = (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    usuariosModel.buscarPorEmail(email, async (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro no servidor' });

        if (result.length === 0) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const usuario = result[0];

        // comparar senha criptografada
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        const token = require('jsonwebtoken').sign(
            { id: usuario.id, email: usuario.email },
            'segredo',
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Login realizado com sucesso 🔐',
            token
        });
    });
};
module.exports = {
    cadastrar,
    login
};