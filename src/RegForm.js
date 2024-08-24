import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        dorm_number: '',
        student_name: '',
        lsuid: '',
        passcode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', formData);

            // Ensure the response contains 'message'
            if (response.data && response.data.message) {
                alert(response.data.message);
                onClose(); // Close the popup on successful registration
            } else {
                alert('Unexpected response format');
            }
        } catch (error) {
            // Handle errors gracefully
            const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
            alert(errorMessage);
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        name="dorm_number" 
                        value={formData.dorm_number} 
                        onChange={handleChange} 
                        placeholder="Dorm Number" 
                        required 
                    />
                    <input 
                        name="student_name" 
                        value={formData.student_name} 
                        onChange={handleChange} 
                        placeholder="Student Name" 
                        required 
                    />
                    <input 
                        name="lsuid" 
                        value={formData.lsuid} 
                        onChange={handleChange} 
                        placeholder="LSUID" 
                        required 
                    />
                    <input 
                        name="passcode" 
                        value={formData.passcode} 
                        onChange={handleChange} 
                        type="password" 
                        placeholder="Passcode" 
                        required 
                    />
                    <button type="submit">Register</button>
                    <button type="button" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;