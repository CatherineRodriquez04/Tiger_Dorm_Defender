"use client";
import React, { useState, useEffect } from 'react';

const TypeEffect = ({
    text = 'Tiger Dorm Defender',
    typeSpeed = 120,
    backSpeed = 100,
    pauseTime = 1200,
    backspaceTo = -18 // Default to second-to-last letter
  }) => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [typingPhase, setTypingPhase] = useState('typing'); // New state to track typing phase
  
    useEffect(() => {
      const handleType = () => {
        const currentText = text;
        const backspacePoint = Math.max(currentText.length + backspaceTo, 0); // Ensure non-negative length
  
        if (typingPhase === 'typing') {
          if (displayText === currentText) {
            // Pause for a while before starting to delete
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              setIsDeleting(true);
              setTypingPhase('backspacing');
            }, pauseTime);
          } else {
            // Type out the text
            setDisplayText(currentText.substring(0, displayText.length + 1));
          }
        } else if (typingPhase === 'backspacing') {
          if (isDeleting && displayText.length <= backspacePoint) {
            // After backspacing to the desired point, start typing again
            setIsDeleting(false);
            setTypingPhase('typing');
          } else {
            // Backspace text
            setDisplayText(currentText.substring(0, displayText.length - 1));
          }
        }
      };
  
      const timer = setInterval(handleType, isDeleting ? backSpeed : typeSpeed);
      return () => clearInterval(timer);
    }, [displayText, isDeleting, isPaused, typingPhase, text, typeSpeed, backSpeed, pauseTime, backspaceTo]);
  
    return (
      <div className="typewriter text-accent"> {/* Added the text-accent class */}
        <span>{displayText}</span>
      </div>
    );
  };
  
export default TypeEffect;
