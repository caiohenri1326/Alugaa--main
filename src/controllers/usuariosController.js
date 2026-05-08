const usuariosModel = require('../models/usuariosModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 🚀 CADASTRO
const cadastrar = async (req, res) => {

    const { nome, email, senha } = req.body;

    // 🛑 validação
    if (!nome || !email || !senha) {
        return res.status(400).json({
            message: 'Preencha todos os campos'
        });
    }

    try {

        // 🔐 criptografa senha
        const senhaHash = await bcrypt.hash(senha, 10);

        usuariosModel.criarUsuario(
            {
                nome,
                email,
                senha: senhaHash
            },
            (err, result) => {

                if (err) {

                    // 🚨 email duplicado
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({
                            message: 'Email já cadastrado'
                        });
                    }

                    console.error('ERRO CADASTRO:', err);

                    return res.status(500).json({
                        message: 'Erro ao cadastrar usuário'
                    });
                }

                // ✅ sucesso
                res.status(201).json({
                    message: 'Usuário criado com sucesso 🔐'
                });

            }
        );

    } catch (error) {

        console.error('ERRO HASH:', error);

        res.status(500).json({
            message: 'Erro ao criptografar senha'
        });

    }
};

// 🔑 LOGIN
const login = (req, res) => {

    const { email, senha } = req.body;

    // 🛑 validação
    if (!email || !senha) {
        return res.status(400).json({
            message: 'Preencha todos os campos'
        });
    }

    usuariosModel.buscarPorEmail(email, async (err, result) => {

        if (err) {

            console.error('ERRO LOGIN:', err);

            return res.status(500).json({
                message: 'Erro no servidor'
            });
        }

        // 🚨 usuário não encontrado
        if (result.length === 0) {
            return res.status(400).json({
                message: 'Usuário não encontrado'
            });
        }

        const usuario = result[0];

        // 🔐 compara senha
        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        );

        // 🚨 senha inválida
        if (!senhaValida) {
            return res.status(400).json({
                message: 'Senha incorreta'
            });
        }

        // 🎟️ TOKEN JWT
        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email
            },
            'segredo',
            {
                expiresIn: '1d'
            }
        );

        // ✅ resposta login
        res.json({

            message: 'Login realizado com sucesso 🔐',

            token,

            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                telefone: usuario.telefone,
                cidade: usuario.cidade,
                bio: usuario.bio,
                cpf: usuario.cpf,
                rg: usuario.rg,
                foto_perfil: usuario.foto_perfil,
                created_at: usuario.criado_em
            }

        });

    });

};

// 👤 USUÁRIO LOGADO
const buscarUsuarioLogado = (req, res) => {

    // 🔥 id vem do token JWT
    const usuarioId = req.usuario.id;

    usuariosModel.buscarPorId(usuarioId, (err, result) => {

        if (err) {

            console.error('ERRO PERFIL:', err);

            return res.status(500).json({
                message: 'Erro ao buscar usuário'
            });
        }

        // 🚨 usuário não encontrado
        if (result.length === 0) {
            return res.status(404).json({
                message: 'Usuário não encontrado'
            });
        }

        // ✅ retorna usuário
        res.json(result[0]);

    });

};

// ✏️ ATUALIZAR PERFIL
const atualizarPerfil = (req, res) => {

    const usuarioId = req.usuario.id;

    const {
        nome,
        telefone,
        cidade,
        cpf,
        rg,
        bio
    } = req.body;

    usuariosModel.atualizarPerfil(

        usuarioId,

        {
            nome,
            telefone,
            cidade,
            cpf,
            rg,
            bio
        },

        (err, result) => {

            if (err) {

                console.error('ERRO UPDATE:', err);

                return res.status(500).json({
                    message: 'Erro ao atualizar perfil'
                });

            }

            res.json({
                message: 'Perfil atualizado com sucesso 🚀'
            });

        }

    );

};

module.exports = {
    cadastrar,
    login,
    buscarUsuarioLogado,
    atualizarPerfil
};