const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // verificar se tem token
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    // formato: Bearer TOKEN
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'segredo');

        // salva dados do usuário na requisição
        req.usuario = decoded;

        next(); // continua a rota
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = verificarToken;