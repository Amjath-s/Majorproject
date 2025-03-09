import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to Flask backend

function SpeechGame() {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  // Fetch words from API when component mounts
  useEffect(() => {
    fetch(
    "https://random-word-api.vercel.app/api?words=30&length=4"

    ) // API to get words
      .then((response) => response.json())
      .then((data) => {
        setWords(data);
        setCurrentWord(data[0]); // Set the first word
      })
      .catch((error) => console.error("Error fetching words:", error));
  }, []);

  useEffect(() => {
    socket.on("result", (data) => {
      if (data.correct) {
        setScore(score + 10);
        setMessage("✔ Correct!");
      } else {
        setScore(score - 5);
        setMessage("❌ Try again!");
      }

      // Load the next word
      const nextWord = words[Math.floor(Math.random() * words.length)];
      setCurrentWord(nextWord);
    });
  }, [score, words]);
const startListening = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event) => {
    const userSpeech = event.results[0][0].transcript;
    console.log("You said:", userSpeech);
    socket.emit("check_pronunciation", { word: currentWord, speech: userSpeech });
  };

  recognition.onerror = (event) => {
    console.error("Speech Recognition Error:", event.error);
    alert("Speech recognition error. Please try again.");
  };
};

  return (
    <div>
      <h1>Pronounce the word: {currentWord}</h1>
      <button onClick={startListening}>🎤 Speak</button>
      <p>{message}</p>
      <h2>Score: {score}</h2>
    </div>
  );
}

export default SpeechGame;
