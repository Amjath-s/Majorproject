import React, { useState } from "react";
import "./Numbercomp.css";

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
      
      // Generate new random numbers after correct answer
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

  return (
    <div className="game-container">
      <h1>Number Comparison Game</h1>
      <p>Score: {score}</p>

      <div className="question">
        <div className="number-pair">
          <span className="number">{num1}</span>
          <span className="text">and</span>
          <span className="number">{num2}</span>
        </div>
      </div>

      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            className="option-button"
            onClick={() => handleOptionClick(option.value)}
          >
            {option.text}
          </button>
        ))}
      </div>

      {message && <div className="popup-message">{message}</div>}
    </div>
  );
}

export default Numbercomp;

