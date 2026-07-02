const enderecosModel = require('../models/enderecosModel');

const separarCidadeEstado = (valor = '') => {
    const partes = valor.split(',').map((parte) => parte.trim()).filter(Boolean);

    return {
        cidade: partes[0] || null,
        estado: partes[1] || null
    };
};

const montarDadosEndereco = (body) => {
    const cidadeEstado = separarCidadeEstado(body.cidade);

    return {
        cep: body.cep || null,
        estado: body.estado || cidadeEstado.estado,
        cidade: cidadeEstado.cidade,
        bairro: body.bairro || null,
        rua: body.rua || null,
        numero: body.numero || null,
        complemento: body.complemento || null
    };
};

const listar = (req, res) => {
    enderecosModel.listarPorUsuario(req.usuario.id, (err, result) => {
        if (err) {
            console.error('ERRO LISTAR ENDERECOS:', err);
            return res.status(500).json({ message: 'Erro ao listar enderecos' });
        }

        res.json(result);
    });
};

const criar = (req, res) => {
    const dados = montarDadosEndereco(req.body);

    if (!dados.rua || !dados.cidade) {
        return res.status(400).json({ message: 'Rua e cidade sao obrigatorias' });
    }

    enderecosModel.criar(req.usuario.id, dados, (err, result) => {
        if (err) {
            console.error('ERRO CRIAR ENDERECO:', err);
            return res.status(500).json({ message: 'Erro ao criar endereco' });
        }

        res.status(201).json({
            message: 'Endereco criado com sucesso',
            id: result.insertId
        });
    });
};

const atualizar = (req, res) => {
    const dados = montarDadosEndereco(req.body);

    if (!dados.rua || !dados.cidade) {
        return res.status(400).json({ message: 'Rua e cidade sao obrigatorias' });
    }

    enderecosModel.atualizar(req.params.id, req.usuario.id, dados, (err, result) => {
        if (err) {
            console.error('ERRO ATUALIZAR ENDERECO:', err);
            return res.status(500).json({ message: 'Erro ao atualizar endereco' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Endereco nao encontrado' });
        }

        res.json({ message: 'Endereco atualizado com sucesso' });
    });
};

const remover = (req, res) => {
    enderecosModel.remover(req.params.id, req.usuario.id, (err, result) => {
        if (err) {
            console.error('ERRO REMOVER ENDERECO:', err);
            return res.status(500).json({ message: 'Erro ao remover endereco' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Endereco nao encontrado' });
        }

        res.json({ message: 'Endereco removido com sucesso' });
    });
};

module.exports = {
    listar,
    criar,
    atualizar,
    remover
};
