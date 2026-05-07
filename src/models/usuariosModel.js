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

// 🔥 BUSCAR POR ID
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
            created_at
        FROM usuarios
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    criarUsuario,
    buscarPorEmail,
    buscarPorId
};