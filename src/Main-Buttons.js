import { useState } from 'react';
import RegisterForm from './RegForm'; // Ensure you have a RegisterForm component
import LoginForm from './LoginForm'; // Ensure you have a LoginForm component

function MainButtons() {
    const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

    const handleRegisterClick = () => {
        setIsRegisterPopupOpen(true);
    };

    const handleLoginClick = () => {
        setIsLoginPopupOpen(true);
    };

    const handleCloseRegisterPopup = () => {
        setIsRegisterPopupOpen(false);
    };

    const handleCloseLoginPopup = () => {
        setIsLoginPopupOpen(false);
    };

    return (
        <div className='flex items-center justify-center w-[475px] xl:w-[700px]'>
            <div className='text-center p-10 space-x-6'>
                <button
                    className='bg-accent text-white px-4 py-2 rounded hover:scale-105'
                    onClick={handleRegisterClick}
                >
                    Register
                </button>
                <button
                    className='bg-accent text-white px-4 py-2 rounded hover:scale-105'
                    onClick={handleLoginClick}
                >
                    Select Dorm
                </button>
            </div>
            {isRegisterPopupOpen && <RegisterForm onClose={handleCloseRegisterPopup} />}
            {isLoginPopupOpen && <LoginForm onClose={handleCloseLoginPopup} />}
        </div>
    );
}

export default MainButtons;