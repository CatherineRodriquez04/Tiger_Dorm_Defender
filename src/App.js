"use client";

import React from 'react';
import Header from './Header';
import Mike from './Mike';
import Intro from './Intro';
import Restart from './Restart';
import MainButtons from './Main-Buttons';


function App() {
  return (
    <div className="App w-full h-full">
      {/* restart */}
      <Restart />

      {/* header */}
      <Header />

      {/* Border under Header */}
      <div className="relative">
        <div className="bg-black h-[1px] w-full xl:w-[calc(800px+10rem)] mx-auto mt-4"></div>
      </div>

      <div className="flex flex-col md:flex-row mt-8">
        <div className='xl:flex-[4] order-2 xl:order-1'>
          {/* Mike */}
          <Mike />
        </div>

        {/* Intro */}
        <div className='xl:flex-[6] order-1 xl:order-2'>
          <Intro />
          <MainButtons />
        </div>
      </div>

      {/* Other content */}
    </div>
  );
}

export default App;
