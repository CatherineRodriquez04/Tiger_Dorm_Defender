import React from 'react';
import axios from 'axios';

const Restart = () => {
    const handleReset = async () => {
        try {
            await axios.delete('http://localhost:5000/reset');
            alert('Table cleared successfully');
        } catch (error) {
            console.error('Error clearing table:', error);
            alert('Failed to clear table');
        }
    };

    return (
        <div className='flex p-2'>
            <button
                className='bg-gray-500 text-white px-4 py-2 rounded hover:scale-105'
                onClick={handleReset}
            >
                New Semester
            </button>
        </div>
    );
};

export default Restart;