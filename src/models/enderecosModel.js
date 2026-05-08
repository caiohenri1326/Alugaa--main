const db = require('../config/db');

// 🚀 CRIAR ENDEREÇO
const criarEndereco = (dados, callback) => {

    const sql = `
        INSERT INTO enderecos
        (
            usuario_id,
            nome_endereco,
            cep,
            estado,
            cidade,
            bairro,
            logradouro,
            numero,
            complemento
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            dados.usuario_id,
            dados.nome_endereco,
            dados.cep,
            dados.estado,
            dados.cidade,
            dados.bairro,
            dados.logradouro,
            dados.numero,
            dados.complemento
        ],
        callback
    );
};

// 🔍 LISTAR ENDEREÇOS DO USUÁRIO
const listarEnderecos = (usuario_id, callback) => {

    const sql = `
        SELECT *
        FROM enderecos
        WHERE usuario_id = ?
        ORDER BY id DESC
    `;

    db.query(sql, [usuario_id], callback);
};

// ❌ EXCLUIR ENDEREÇO
const excluirEndereco = (id, usuario_id, callback) => {

    const sql = `
        DELETE FROM enderecos
        WHERE id = ?
        AND usuario_id = ?
    `;

    db.query(sql, [id, usuario_id], callback);
};

module.exports = {
    criarEndereco,
    listarEnderecos,
    excluirEndereco
};