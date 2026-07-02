const db = require('../config/db');

// 🚀 CRIAR USUÁRIO
const criarUsuario = (dados, callback) => {
    const sql = `
        INSERT INTO usuarios
        (
            nome,
            email,
            senha,
            senha_hash
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            dados.nome,
            dados.email,
            dados.senha,
            dados.senha
        ],
        callback
    );
};

// 🔍 BUSCAR POR EMAIL
const buscarPorEmail = (email, callback) => {
    const sql = `
        SELECT
            id,
            nome,
            email,
            senha,
            telefone,
            cidade,
            bio,
            foto_perfil,
            created_at
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
            cpf,
            bio,
            foto_perfil,
            COALESCE(created_at, data_criacao) AS created_at
        FROM usuarios
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};

const atualizarPerfil = (id, dados, callback) => {
    const sql = `
        UPDATE usuarios
        SET
            nome = ?,
            telefone = ?,
            cidade = ?,
            cpf = ?,
            bio = ?,
            biografia = ?,
            foto_perfil = COALESCE(?, foto_perfil)
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            dados.nome,
            dados.telefone,
            dados.cidade,
            dados.cpf,
            dados.bio,
            dados.bio,
            dados.foto_perfil,
            id
        ],
        callback
    );
};

const atualizarEmail = (id, email, callback) => {
    const sql = `
        UPDATE usuarios
        SET email = ?
        WHERE id = ?
    `;

    db.query(sql, [email, id], callback);
};

const atualizarSenha = (id, senhaHash, callback) => {
    const sql = `
        UPDATE usuarios
        SET
            senha = ?,
            senha_hash = ?
        WHERE id = ?
    `;

    db.query(sql, [senhaHash, senhaHash, id], callback);
};

const excluirConta = (id, callback) => {
    const sql = `
        DELETE FROM usuarios
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    criarUsuario,
    buscarPorEmail,
    buscarPorId,
    atualizarPerfil,
    atualizarEmail,
    atualizarSenha,
    excluirConta
};
