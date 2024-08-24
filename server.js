const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'K@rl2024',
    database: 'dorm_defender'
});

connection.connect();

// register endpoint
app.post('/register', (req, res) => {
    const { dorm_number, student_name, lsuid, passcode } = req.body;
    const query = 'INSERT INTO residents (dorm_number, student_name, lsuid, passcode) VALUES (?, ?, ?, ?)';

    connection.query(query, [dorm_number, student_name, lsuid, passcode], (err, results) => {
        if (err) {
            console.error('Database error:', err); // Log detailed error information
            return res.status(500).json({ error: 'LSU ID Already Registered.' });
        }
        res.status(200).json({ message: 'Registration successful' });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { dorm_number, password } = req.body;
    const query = 'SELECT * FROM residents WHERE dorm_number = ? AND passcode = ?';

    connection.query(query, [dorm_number, password], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid dorm number or password' });
        }
    });
});

// Clear table endpoint
app.delete('/reset', (req, res) => {
    const query = 'DELETE FROM residents'; // Clears all rows in the table

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'System failed reset semester' });
        }
        res.status(200).json({ message: 'Ready for a new semester!' });
    });
});


app.listen(5000, () => console.log('Server running on port 5000'));