const db = require('../config/db');

// 🚀 CRIAR USUÁRIO
const criarUsuario = (dados, callback) => {

    const sql = `
        INSERT INTO usuarios
        (
            nome,
            email,
            senha
        )
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            dados.nome,
            dados.email,
            dados.senha
        ],
        callback
    );
};

// 🔍 BUSCAR POR EMAIL
const buscarPorEmail = (email, callback) => {

    const sql = `
        SELECT *
        FROM usuarios
        WHERE email = ?
    `;

    db.query(sql, [email], callback);
};

// 👤 BUSCAR POR ID
const buscarPorId = (id, callback) => {

    const sql = `
        SELECT
            id,
            nome,
            email,
            telefone,
            cidade,
            bio,
            foto_perfil,
            cpf,
            rg,
            criado_em
        FROM usuarios
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};

// ✏️ ATUALIZAR PERFIL
const atualizarPerfil = (
    id,
    dados,
    callback
) => {

    const sql = `
        UPDATE usuarios
        SET
            nome = ?,
            telefone = ?,
            cidade = ?,
            bio = ?,
            cpf = ?,
            rg = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            dados.nome,
            dados.telefone,
            dados.cidade,
            dados.bio,
            dados.cpf,
            dados.rg,
            id
        ],
        callback
    );
};

module.exports = {
    criarUsuario,
    buscarPorEmail,
    buscarPorId,
    atualizarPerfil
};  