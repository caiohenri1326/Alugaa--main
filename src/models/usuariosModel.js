const db = require('../config/db');

// criar usuário
const criarUsuario = (dados, callback) => {
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [dados.nome, dados.email, dados.senha], callback);
};

// buscar por email
const buscarPorEmail = (email, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(sql, [email], callback);
};

module.exports = {
    criarUsuario,
    buscarPorEmail
};