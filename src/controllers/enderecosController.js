    const enderecosModel = require('../models/enderecosModel');

    // 🚀 CRIAR ENDEREÇO
    const criarEndereco = (req, res) => {

        const usuario_id = req.usuario.id;

        const {
            nome_endereco,
            cep,
            estado,
            cidade,
            bairro,
            logradouro,
            numero,
            complemento
        } = req.body;

        if (!nome_endereco || !cep) {
            return res.status(400).json({
                message: 'Preencha os campos obrigatórios'
            });
        }

        enderecosModel.criarEndereco(
            {
                usuario_id,
                nome_endereco,
                cep,
                estado,
                cidade,
                bairro,
                logradouro,
                numero,
                complemento
            },
            (err, result) => {

                if (err) {

                    console.error(err);

                    return res.status(500).json({
                        message: 'Erro ao criar endereço'
                    });
                }

                res.status(201).json({
                    message: 'Endereço criado com sucesso'
                });

            }
        );
    };

    // 🔍 LISTAR ENDEREÇOS
    const listarEnderecos = (req, res) => {

        const usuario_id = req.usuario.id;

        enderecosModel.listarEnderecos(
            usuario_id,
            (err, result) => {

                if (err) {

                    console.error(err);

                    return res.status(500).json({
                        message: 'Erro ao buscar endereços'
                    });
                }

                res.json(result);

            }
        );
    };

    // ❌ EXCLUIR ENDEREÇO
    const excluirEndereco = (req, res) => {

        const usuario_id = req.usuario.id;

        const id = req.params.id;

        enderecosModel.excluirEndereco(
            id,
            usuario_id,
            (err, result) => {

                if (err) {

                    console.error(err);

                    return res.status(500).json({
                        message: 'Erro ao excluir endereço'
                    });
                }

                res.json({
                    message: 'Endereço removido'
                });

            }
        );
    };

    module.exports = {
        criarEndereco,
        listarEnderecos,
        excluirEndereco
    };