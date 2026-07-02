const db = require('../config/db');

const cadastrar = (req, res) => {

    const foto = req.file ? req.file.filename : null;

    const {
    nome,
    titulo,
    descricao,
    preco,
    categoria,
    cidade,
    estado,
    cep,
    bairro,
    logradouro,
    telefone
} = req.body;


    const usuario_id = req.usuario.id;
    const nomeProduto = titulo || nome;

    if (!nomeProduto || !preco || !categoria) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }

    // ✅ AGORA CERTO
    const categoria_id = parseInt(categoria);

    if (isNaN(categoria_id)) {
        return res.status(400).json({ message: 'Categoria inválida' });
    }

    const sql = `
    INSERT INTO produtos 
    (nome, titulo, descricao, preco_dia, categoria_id, cidade, estado, cep, bairro, logradouro, usuario_id, foto)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    db.query(sql, [
    nomeProduto,
    nomeProduto,
    descricao,
    preco,
    categoria_id,
    cidade,
    estado,
    cep,
    bairro,
    logradouro,
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
