const db = require('../config/db');

const cadastrar = (req, res) => {
    const {
        titulo,
        descricao,
        preco,
        categoria,
        cidade,
        telefone
    } = req.body;

    const usuario_id = req.usuario.id; // vem do token

    if (!titulo || !preco || !categoria) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }

    const sql = `
        INSERT INTO produtos 
        (nome, descricao, preco_dia, categoria_id, cidade, estado, usuario_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        titulo,
        descricao,
        preco,
        categoria, // depois a gente pode mapear melhor
        cidade,
        telefone, // usando como "estado" por enquanto
        usuario_id
    ], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao cadastrar produto' });
        }

        res.status(201).json({
            message: 'Produto cadastrado com sucesso 🚀',
            produtoId: result.insertId
        });
    });
};

module.exports = {
    cadastrar
};