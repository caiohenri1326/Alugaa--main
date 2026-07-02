const db = require('../config/db');

// 🚀 CRIAR USUÁRIO
const criarUsuario = (dados, callback) => {
<<<<<<< HEAD
=======

>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
    const sql = `
        INSERT INTO usuarios
        (
            nome,
            email,
<<<<<<< HEAD
            senha,
            senha_hash
        )
        VALUES (?, ?, ?, ?)
=======
            senha
        )
        VALUES (?, ?, ?)
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
    `;

    db.query(
        sql,
        [
            dados.nome,
            dados.email,
<<<<<<< HEAD
            dados.senha,
=======
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
            dados.senha
        ],
        callback
    );
};

// 🔍 BUSCAR POR EMAIL
const buscarPorEmail = (email, callback) => {
<<<<<<< HEAD
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
=======

    const sql = `
        SELECT *
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
        FROM usuarios
        WHERE email = ?
    `;

    db.query(sql, [email], callback);
};

// 🔥 BUSCAR POR ID
const buscarPorId = (id, callback) => {
<<<<<<< HEAD
=======

>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
    const sql = `
        SELECT
            id,
            nome,
            email,
            telefone,
            cidade,
<<<<<<< HEAD
            cpf,
            bio,
            foto_perfil,
            COALESCE(created_at, data_criacao) AS created_at
=======
            bio,
            foto_perfil,
            created_at
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
        FROM usuarios
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};

<<<<<<< HEAD
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
=======
module.exports = {
    criarUsuario,
    buscarPorEmail,
    buscarPorId
};
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
