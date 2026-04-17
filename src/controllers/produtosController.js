const db = require('../config/db');

// CADASTRAR PRODUTO
const cadastrar = (req, res) => {
    const {
        nome,
        descricao,
        preco_dia,
        categoria_id,
        cidade,
        estado,
        usuario_id
    } = req.body;

    if (!nome || !preco_dia || !categoria_id || !usuario_id) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }

    const sql = `
        INSERT INTO produtos 
        (nome, descricao, preco_dia, categoria_id, cidade, estado, usuario_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        nome,
        descricao,
        preco_dia,
        categoria_id,
        cidade,
        estado,
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

// LISTAR PRODUTOS
const listar = (req, res) => {
    const sql = `
        SELECT 
            p.*, 
            c.nome AS categoria,
            u.nome AS dono
        FROM produtos p
        JOIN categorias c ON p.categoria_id = c.id
        JOIN usuarios u ON p.usuario_id = u.id
        ORDER BY p.id DESC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar produtos' });
        }

        res.json(result);
    });
};

module.exports = {
    cadastrar,
    listar
};