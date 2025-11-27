// TypewriterEffect.jsx
import React, { useState, useEffect } from 'react';

// Define the speeds for the animation
const TYPING_SPEED = 150; // ms per character
const DELETING_SPEED = 75; // ms per character
const WORD_PAUSE = 1500; // ms pause after word is fully typed

const TypewriterEffect = ({ words = [] }) => {
    // State to manage the animation logic
    const [wordIndex, setWordIndex] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        // Guard clause: Do nothing if no words are passed
        if (words.length === 0) return;

        // Get the current word from the props array
        const currentWord = words[wordIndex % words.length];
        let timeout;

        if (isDeleting) {
            // --- DELETING LOGIC ---
            timeout = setTimeout(() => {
                // Remove one character at a time
                setTypedText(currentWord.substring(0, typedText.length - 1));
            }, DELETING_SPEED);

            // If the text is fully deleted, stop deleting and move to the next word
            if (typedText === '') {
                setIsDeleting(false);
                setWordIndex((prevIndex) => prevIndex + 1);
            }

        } else {
            // --- TYPING LOGIC ---
            timeout = setTimeout(() => {
                // Add one character at a time
                setTypedText(currentWord.substring(0, typedText.length + 1));
            }, TYPING_SPEED);

            // If the word is fully typed, pause, then switch to deleting mode
            if (typedText === currentWord) {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, WORD_PAUSE);
            }
        }

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeout);
        
    // Dependency array: re-run the effect whenever these values change
    }, [wordIndex, typedText, isDeleting, words]);

    return (
        // The display component
        <span className="font-regular text-[#006aff] ml-2">
            {typedText}
            {/* Blinking cursor effect */}
            <span className="typing-cursor">|</span> 
        </span>
    );
};

export default TypewriterEffect;