const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Create a MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123',
    database: process.env.DB_NAME || 'libros',
    port: process.env.DB_PORT || 3306
});

connection.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida.');
});

// Route to serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to search books
app.get('/books', (req, res) => {
    const title = req.query.title;
    if (!title) {
        return res.status(400).json({ error: 'Title query parameter is required' });
    }

    const query = 'SELECT * FROM biblioteca WHERE NOMBRE LIKE ?';
    connection.query(query, [`%${title}%`], (err, results) => {
        if (err) {
            console.error('Error al buscar libros:', err);
            return res.status(500).json({ error: 'Error al buscar libros' });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});





