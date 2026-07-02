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
                 if (err) {
                console.error('ERRO COMPLETO:', err);

                return res.status(400).json({
                    message: err.message,
                    code: err.code
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
                foto_perfil: usuario.foto_perfil,
                created_at: usuario.created_at
            }

        });

    });

};

// 👤 PERFIL USUÁRIO LOGADO
const buscarPerfil = (req, res) => {

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

const atualizarPerfil = (req, res) => {
    const usuarioId = req.usuario.id;
    const fotoPerfil = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null;

    const dados = {
        nome: req.body.nome || null,
        telefone: req.body.telefone || null,
        cidade: req.body.cidade || null,
        cpf: req.body.cpf || null,
        bio: req.body.bio || null,
        foto_perfil: fotoPerfil
    };

    if (!dados.nome) {
        return res.status(400).json({
            message: 'Nome obrigatorio'
        });
    }

    usuariosModel.atualizarPerfil(usuarioId, dados, (err) => {
        if (err) {
            console.error('ERRO ATUALIZAR PERFIL:', err);
            return res.status(500).json({
                message: 'Erro ao atualizar perfil'
            });
        }

        usuariosModel.buscarPorId(usuarioId, (erroBusca, result) => {
            if (erroBusca) {
                console.error('ERRO BUSCAR PERFIL ATUALIZADO:', erroBusca);
                return res.status(500).json({
                    message: 'Perfil atualizado, mas nao foi possivel recarregar os dados'
                });
            }

            res.json({
                message: 'Perfil atualizado com sucesso',
                usuario: result[0]
            });
        });
    });
};

const atualizarEmail = (req, res) => {
    const usuarioId = req.usuario.id;
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: 'Email obrigatorio'
        });
    }

    usuariosModel.atualizarEmail(usuarioId, email, (err) => {
        if (err) {
            console.error('ERRO ATUALIZAR EMAIL:', err);

            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({
                    message: 'Email ja cadastrado'
                });
            }

            return res.status(500).json({
                message: 'Erro ao atualizar email'
            });
        }

        usuariosModel.buscarPorId(usuarioId, (erroBusca, result) => {
            if (erroBusca) {
                console.error('ERRO BUSCAR USUARIO ATUALIZADO:', erroBusca);
                return res.status(500).json({
                    message: 'Email atualizado, mas nao foi possivel recarregar os dados'
                });
            }

            res.json({
                message: 'Email atualizado com sucesso',
                usuario: result[0]
            });
        });
    });
};

const atualizarSenha = (req, res) => {
    const usuarioId = req.usuario.id;
    const { senhaAtual, novaSenha } = req.body;

    if (!senhaAtual || !novaSenha) {
        return res.status(400).json({
            message: 'Preencha a senha atual e a nova senha'
        });
    }

    usuariosModel.buscarPorId(usuarioId, (err, result) => {
        if (err) {
            console.error('ERRO BUSCAR USUARIO SENHA:', err);
            return res.status(500).json({
                message: 'Erro ao buscar usuario'
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Usuario nao encontrado'
            });
        }

        usuariosModel.buscarPorEmail(result[0].email, async (erroEmail, usuarios) => {
            if (erroEmail) {
                console.error('ERRO BUSCAR EMAIL SENHA:', erroEmail);
                return res.status(500).json({
                    message: 'Erro ao validar senha'
                });
            }

            if (usuarios.length === 0) {
                return res.status(404).json({
                    message: 'Usuario nao encontrado'
                });
            }

            const usuario = usuarios[0];
            let senhaValida = false;

            try {
                senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
            } catch (erroSenha) {
                console.error('ERRO COMPARAR SENHA:', erroSenha);
            }

            if (!senhaValida) {
                return res.status(400).json({
                    message: 'Senha atual incorreta'
                });
            }

            const senhaHash = await bcrypt.hash(novaSenha, 10);

            usuariosModel.atualizarSenha(usuarioId, senhaHash, (erroAtualizar) => {
                if (erroAtualizar) {
                    console.error('ERRO ATUALIZAR SENHA:', erroAtualizar);
                    return res.status(500).json({
                        message: 'Erro ao atualizar senha'
                    });
                }

                res.json({
                    message: 'Senha atualizada com sucesso'
                });
            });
        });
    });
};

const excluirConta = (req, res) => {
    const usuarioId = req.usuario.id;

    usuariosModel.excluirConta(usuarioId, (err) => {
        if (err) {
            console.error('ERRO EXCLUIR CONTA:', err);
            return res.status(500).json({
                message: 'Erro ao excluir conta'
            });
        }

        res.json({
            message: 'Conta excluida com sucesso'
        });
    });
};

module.exports = {
    cadastrar,
    login,
    buscarPerfil,
    atualizarPerfil,
    atualizarEmail,
    atualizarSenha,
    excluirConta
};
