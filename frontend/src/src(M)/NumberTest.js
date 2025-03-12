import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./NumberTest.css";

function NumberTest() {
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const generateRandomNumbers = (count) => {
    return Array.from({ length: count }, () => ({
      value: Math.floor(Math.random() * 100) + 1, // Random number between 1-100
      color: getRandomColor(),
    }));
  };

  const getRandomColor = () => {
    const colors = [
      "#ff9999", "#99ccff", "#ffcc99", "#ccff99", "#ffb3e6",
      "#c2f0c2", "#ffdab3", "#c2d1f0", "#ffcccc", "#c2c2d6",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const [numbers, setNumbers] = useState(generateRandomNumbers(15));

  const oddEvenCriteria = {
    Odd: (num) => num % 2 !== 0,
    Even: (num) => num % 2 === 0,
  };

  const handleDragStart = (event, number) => {
    event.dataTransfer.setData("number", number);
  };

  const handleDrop = (event, criteria) => {
    event.preventDefault();
    const number = parseInt(event.dataTransfer.getData("number"));
    const isCorrect = oddEvenCriteria[criteria](number);

    if (isCorrect) {
      setScore(score + 1);
      setCorrectCount(correctCount + 1);
      setFeedback(`✅ Correct! ${number} is ${criteria}.`);
      setNumbers(numbers.filter((item) => item.value !== number));
    } else {
      setScore(score - 1);
      setWrongCount(wrongCount + 1);
      setFeedback(`❌ Incorrect. ${number} is not ${criteria}.`);
    }

    setTimeout(() => setFeedback(""), 1000);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="game-container">
      <h1>Number Sorting Game</h1>
      <p>Drag the numbers to the correct colored box.</p>
      <p>
        Score: {score} | ✅ Correct Answers: {correctCount} | ❌ Wrong Answers: {wrongCount}
      </p>

      {numbers.length > 0 ? (
        <div className="numbers-container">
          {numbers.map((item, index) => (
            <div
              key={index}
              className="number"
              style={{ backgroundColor: item.color }}
              draggable
              onDragStart={(e) => handleDragStart(e, item.value)}
            >
              {item.value}
            </div>
          ))}
        </div>
      ) : (
        <div className="next-game-container">
          <h2>Game Over!</h2>
          <p>Final Score: {score}</p>
          <p>
            ✅ Correct Answers: {correctCount} | ❌ Wrong Answers: {wrongCount}
          </p>
          <button className="next-game-button" onClick={() => navigate("/game/number-comparison")}>
            Next Game
          </button>
        </div>
      )}

      <div className="boxes-container">
        {["Odd", "Even"].map((criteria, index) => (
          <div
            key={index}
            className={`criteria-box ${criteria.toLowerCase()}-box`}
            onDrop={(e) => handleDrop(e, criteria)}
            onDragOver={handleDragOver}
          >
            Drop numbers that are {criteria}
          </div>
        ))}
      </div>

      {feedback && <div className="feedback-popup">{feedback}</div>}
    </div>
  );
}

export default NumberTest;
