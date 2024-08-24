import React, { useState } from 'react';

function LoginForm({ onClose }) {
    const [dormNumber, setDormNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dorm_number: dormNumber, password }),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Login successful');
                onClose(); // Close popup on success
            } else {
                alert(result.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };

    return (
        <div className='popup'>
            <div className='popup-content'>
                <span className='close-btn' onClick={onClose}>&times;</span>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='dorm-number'>Dorm Number:</label>
                    <input
                        type='text'
                        id='dorm-number'
                        value={dormNumber}
                        onChange={(e) => setDormNumber(e.target.value)}
                        required
                    />
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
