const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
<<<<<<< HEAD
    database: 'alugae7'
=======
    database: 'alugaee'
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no banco:', err);
    } else {
        console.log('Conectado ao MySQL 🚀');
    }
});

module.exports = db;