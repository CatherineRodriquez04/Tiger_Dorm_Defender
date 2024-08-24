"use client";

import React from 'react';
import TypeEffect from './Components/TypeEffect';


function Header() {
    return (
    // header
    <>
        <div className='flex justify-center items-center h-full w-full mt-[10px]'>
            <div className='bg-[#040506] w-[400px] xl:w-[800px] rounded-xl flex flex-col justify-center items-center'>
                <h1 className="text-center text-accent text-4xl py-10"><TypeEffect /></h1>
            </div>
        </div>
        <div className='mt-3 items-center justify-center text-center'>
            <h1>Geaux Engineering 2024</h1>
        </div>
    </>
    );
}

export default Header;
