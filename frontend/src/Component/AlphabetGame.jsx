import React, { useState, useEffect } from "react";

const AlphabetGame = () => {
  const allAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // Alphabet Array

  // Shuffle function to randomize the order of alphabets
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const [alphabets, setAlphabets] = useState(shuffleArray([...allAlphabets]));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Say the letter shown!");

  useEffect(() => {
    if (currentIndex < alphabets.length) {
      recognizeSpeech(); // Start speech recognition when component mounts or index changes
    }
  }, [currentIndex]);

  // Speech Recognition Function
  const recognizeSpeech = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // Set language
    recognition.start();

    recognition.onresult = (event) => {
      const spokenLetter = event.results[0][0].transcript.toUpperCase().trim();
      const correctLetter = alphabets[currentIndex];

      if (spokenLetter === correctLetter) {
        setMessage(`✅ Correct! You said "${spokenLetter}"`);
        setScore(score + 1);
      } else {
        setMessage(`❌ Incorrect! You said "${spokenLetter}"`);
      }

      setTimeout(() => {
        if (currentIndex < alphabets.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setMessage(`Game Over! Your Final Score: ${score}`);
        }
      }, 1000);
    };

    recognition.onerror = (event) => {
      setMessage("⚠️ Speech recognition error! Try again.");
    };
  };

  return (
    <div style={styles.container}>
      <h1>Alphabet Pronunciation Game</h1>
      {currentIndex < alphabets.length ? (
        <>
          <h2 style={styles.alphabet}>{alphabets[currentIndex]}</h2>
          <p>{message}</p>
          <h3>Score: {score}</h3>
        </>
      ) : (
        <h2>🎉 Game Over! Final Score: {score}</h2>
      )}
    </div>
  );
};

// Simple Styling
const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  alphabet: {
    fontSize: "50px",
    fontWeight: "bold",
    color: "#4CAF50",
  },
};

export default AlphabetGame;
