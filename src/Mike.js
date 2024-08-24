"use client";

import React from 'react';
import Tiger from './assets/Mike.png';


function Mike() {
    return (
    // Mike Image
    <div className='flex relative xl:left-[100px] justify-center items-center h-full w-full mt-[20px] xl:mt-[0px]'>
        <div>
            <img src={Tiger} className="w-[300px] h-[475px]" alt="Mike The Tiger" />
        </div>
    </div>
    );
}

export default Mike;