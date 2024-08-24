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

// Register endpoint
app.post('/register', (req, res) => {
    const { dorm_number, student_name, lsuid, passcode } = req.body;
    const query = 'INSERT INTO residents (dorm_number, student_name, lsuid, passcode) VALUES (?, ?, ?, ?)';

    connection.query(query, [dorm_number, student_name, lsuid, passcode], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Registration successful' });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { dorm_number, lsuid, passcode } = req.body;
    const query = 'SELECT id, passcode, failed_attempts, last_attempt FROM residents WHERE dorm_number = ? AND lsuid = ?';
    
    connection.query(query, [dorm_number, lsuid], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid dorm number or LSUID' });
        }

        const resident = results[0];
        const currentTime = new Date();
        const lastAttempt = new Date(resident.last_attempt);
        const failedAttempts = resident.failed_attempts;
        
        // Check if the last attempt was within a specific time window
        if (failedAttempts >= 3 && (currentTime - lastAttempt) < 15 * 60 * 1000) {
            return res.status(403).json({ error: 'Account locked. Try again later.' });
        }

        // Verify passcode
        if (passcode !== resident.passcode) {
            // Increment failed attempts and update timestamp
            const updateQuery = 'UPDATE residents SET failed_attempts = failed_attempts + 1, last_attempt = ? WHERE id = ?';
            connection.query(updateQuery, [currentTime, resident.id], (updateErr) => {
                if (updateErr) {
                    console.error('Update error:', updateErr);
                    return res.status(500).json({ error: 'Database error' });
                }
                return res.status(400).json({ error: 'Invalid passcode', attemptsLeft: 3 - (failedAttempts + 1) });
            });
        } else {
            // Reset failed attempts and update timestamp on successful login
            const resetQuery = 'UPDATE residents SET failed_attempts = 0, last_attempt = ? WHERE id = ?';
            connection.query(resetQuery, [currentTime, resident.id], (resetErr) => {
                if (resetErr) {
                    console.error('Reset error:', resetErr);
                    return res.status(500).json({ error: 'Database error' });
                }
                return res.status(200).json({ message: 'Login successful' });
            });
        }
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));