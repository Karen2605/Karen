const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10)
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
    } else {
        console.log('Conexión a la base de datos establecida.');
    }
});

function getBooksByTitle(title, callback) {
    const query = 'SELECT * FROM biblioteca WHERE NOMBRE LIKE ?';
    connection.query(query, [`%${title}%`], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

module.exports = { getBooksByTitle };