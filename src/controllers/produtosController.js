const db = require('../config/db');

const cadastrar = (req, res) => {

    const foto = req.file ? req.file.filename : null;

    const {
        titulo,
        descricao,
        preco,
        categoria,
        cidade,
        telefone
    } = req.body;


    const usuario_id = req.usuario.id;

    if (!titulo || !preco || !categoria) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }

    // ✅ AGORA CERTO
    const categoria_id = parseInt(categoria);

    if (isNaN(categoria_id)) {
        return res.status(400).json({ message: 'Categoria inválida' });
    }

    const sql = `
        INSERT INTO produtos 
        (nome, descricao, preco_dia, categoria_id, cidade, usuario_id, foto)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        titulo,
        descricao,
        preco,
        categoria_id,
        cidade,
        usuario_id,
        foto
    ], (err, result) => {
        if (err) {
            console.error('ERRO SQL COMPLETO:', err);
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