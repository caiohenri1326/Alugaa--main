const db = require('../config/db');

const listarPorUsuario = (usuarioId, callback) => {
    const sql = `
        SELECT id, usuario_id, cep, estado, cidade, bairro, rua, numero, complemento
        FROM enderecos
        WHERE usuario_id = ?
        ORDER BY id DESC
    `;

    db.query(sql, [usuarioId], callback);
};

const criar = (usuarioId, dados, callback) => {
    const sql = `
        INSERT INTO enderecos
        (usuario_id, cep, estado, cidade, bairro, rua, numero, complemento)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            usuarioId,
            dados.cep,
            dados.estado,
            dados.cidade,
            dados.bairro,
            dados.rua,
            dados.numero,
            dados.complemento
        ],
        callback
    );
};

const atualizar = (id, usuarioId, dados, callback) => {
    const sql = `
        UPDATE enderecos
        SET cep = ?, estado = ?, cidade = ?, bairro = ?, rua = ?, numero = ?, complemento = ?
        WHERE id = ? AND usuario_id = ?
    `;

    db.query(
        sql,
        [
            dados.cep,
            dados.estado,
            dados.cidade,
            dados.bairro,
            dados.rua,
            dados.numero,
            dados.complemento,
            id,
            usuarioId
        ],
        callback
    );
};

const remover = (id, usuarioId, callback) => {
    const sql = `
        DELETE FROM enderecos
        WHERE id = ? AND usuario_id = ?
    `;

    db.query(sql, [id, usuarioId], callback);
};

module.exports = {
    listarPorUsuario,
    criar,
    atualizar,
    remover
};
