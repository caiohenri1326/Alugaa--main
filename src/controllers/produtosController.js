const db = require('../config/db');

const cadastrar = (req, res) => {

    const foto = req.file ? req.file.filename : null;

    const {
<<<<<<< HEAD
    nome,
=======
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
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
<<<<<<< HEAD
    const nomeProduto = titulo || nome;

    if (!nomeProduto || !preco || !categoria) {
=======

    if (!titulo || !preco || !categoria) {
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
        return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }

    // ✅ AGORA CERTO
    const categoria_id = parseInt(categoria);

    if (isNaN(categoria_id)) {
        return res.status(400).json({ message: 'Categoria inválida' });
    }

    const sql = `
    INSERT INTO produtos 
<<<<<<< HEAD
    (nome, titulo, descricao, preco_dia, categoria_id, cidade, estado, cep, bairro, logradouro, usuario_id, foto)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    db.query(sql, [
    nomeProduto,
    nomeProduto,
=======
    (nome, descricao, preco_dia, categoria_id, cidade, estado, cep, bairro, logradouro, usuario_id, foto)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    db.query(sql, [
    titulo,
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
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
<<<<<<< HEAD
};
=======
};
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
