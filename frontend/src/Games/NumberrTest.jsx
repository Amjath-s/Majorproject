import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NumberTest() {
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const generateRandomNumbers = (count) => {
    return Array.from({ length: count }, () => ({
      value: Math.floor(Math.random() * 100) + 1,
      color: getRandomColor(),
    }));
  };

  const getRandomColor = () => {
    const colors = [
      "#ff9999",
      "#99ccff",
      "#ffcc99",
      "#ccff99",
      "#ffb3e6",
      "#c2f0c2",
      "#ffdab3",
      "#c2d1f0",
      "#ffcccc",
      "#c2c2d6",
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
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f0f8ff",
      }}
    >
      <h1>Number Sorting Game</h1>
      <p>Drag the numbers to the correct colored box.</p>
      <p>
        Score: {score} | ✅ Correct Answers: {correctCount} | ❌ Wrong Answers:{" "}
        {wrongCount}
      </p>

      {numbers.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            margin: "20px 0",
          }}
        >
          {numbers.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: item.color,
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "black",
                cursor: "grab",
                transition: "transform 0.2s ease",
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, item.value)}
            >
              {item.value}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>Game Over!</h2>
          <p>Final Score: {score}</p>
          <p>
            ✅ Correct Answers: {correctCount} | ❌ Wrong Answers: {wrongCount}
          </p>
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#2a9df4",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              color: "#fff",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
            onClick={() => navigate("/game/number-comparison")}
          >
            Next Game
          </button>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {["Odd", "Even"].map((criteria, index) => (
          <div
            key={index}
            style={{
              width: "150px",
              height: "150px",
              border: "2px dashed #000",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#333",
              transition: "background-color 0.3s ease, transform 0.3s ease",
            }}
            onDrop={(e) => handleDrop(e, criteria)}
            onDragOver={handleDragOver}
          >
            Drop numbers that are {criteria}
          </div>
        ))}
      </div>

      {feedback && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px 40px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "3px solid #2a9df4",
            borderRadius: "20px",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#333",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
            zIndex: 10,
          }}
        >
          {feedback}
        </div>
      )}
    </div>
  );
}

export default NumberTest;
