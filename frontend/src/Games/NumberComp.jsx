import React, { useState } from "react";

function Numbercomp() {
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());

  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  }

  const options = [
    { text: `${num1} is greater than ${num2}`, value: ">" },
    { text: `${num1} is less than ${num2}`, value: "<" },
    { text: `${num1} is equal to ${num2}`, value: "=" },
  ];

  const correctAnswer = num1 > num2 ? ">" : num1 < num2 ? "<" : "=";

  const handleOptionClick = (selectedOption) => {
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
      setMessage("✅ Correct!");

      setTimeout(() => {
        setMessage("");
        setNum1(generateRandomNumber());
        setNum2(generateRandomNumber());
      }, 1500);
    } else {
      setScore(score - 1);
      setMessage("❌ Incorrect!");

      setTimeout(() => {
        setMessage("");
      }, 1500);
    }
  };

  const styles = {
    gameContainer: {
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    },
    question: {
      fontSize: "24px",
      margin: "20px 0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    number: {
      fontWeight: "bold",
      margin: "0 5px",
      fontSize: "28px",
      color: "black",
    },
    optionsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
    },
    optionButton: {
      padding: "12px 20px",
      fontSize: "18px",
      border: "none",
      backgroundColor: "#4caf50",
      color: "white",
      cursor: "pointer",
      borderRadius: "5px",
      transition: "0.3s",
      width: "250px",
      textAlign: "center",
    },
    optionButtonHover: { backgroundColor: "#45a049" },
    popupMessage: { fontSize: "20px", marginTop: "15px", fontWeight: "bold" },
    text: { fontSize: "24px", fontWeight: "bold" },
    correct: { color: "green" },
    incorrect: { color: "red" },
  };

  return (
    <div style={styles.gameContainer}>
      <h1>Number Comparison Game</h1>
      <p>Score: {score}</p>

      <div style={styles.question}>
        <div>
          <span style={styles.number}>{num1}</span>
          <span style={styles.text}>and</span>
          <span style={styles.number}>{num2}</span>
        </div>
      </div>

      <div style={styles.optionsContainer}>
        {options.map((option, index) => (
          <button
            key={index}
            style={styles.optionButton}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.text}
          </button>
        ))}
      </div>

      {message && (
        <div style={message.includes("✅") ? styles.correct : styles.incorrect}>
          {message}
        </div>
      )}
    </div>
  );
}

export default Numbercomp;
