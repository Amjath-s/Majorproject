import React, { useState } from "react";

function ColourTest() {
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const colors = [
    { name: "Blue", color: "blue" },
    { name: "Red", color: "red" },
    { name: "Green", color: "green" },
    { name: "Yellow", color: "yellow" },
  ];

  const handleDragStart = (event, colorName) => {
    event.dataTransfer.setData("colorName", colorName);
  };

  const handleDrop = (event, boxColor) => {
    event.preventDefault();
    const colorName = event.dataTransfer.getData("colorName");

    if (colorName.toLowerCase() === boxColor) {
      setScore(score + 1);
      setFeedback(`✅ Correct!`);
    } else {
      setScore(score - 1);
      setFeedback(`❌ Incorrect!`);
    }
    setTimeout(() => setFeedback(""), 1000);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const containerStyle = {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    margin: "20px",
  };

  const itemContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    margin: "20px 0",
  };

  const ballStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    cursor: "grab",
    userSelect: "none",
  };

  const boxStyle = {
    width: "80px",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #333",
    color: "white",
    fontWeight: "bold",
  };

  const feedbackStyle = {
    position: "fixed",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    borderRadius: "10px",
    backgroundColor: feedback.includes("✅") ? "#4caf50" : "#f44336",
    color: "white",
  };

  return (
    <div style={containerStyle}>
      <h1>Color Matching Game</h1>
      <p>Drag each ball to the matching color box. Score: {score}</p>

      <div style={itemContainerStyle}>
        {colors.map((item, index) => (
          <div
            key={index}
            style={{ ...ballStyle, backgroundColor: item.color }}
            draggable
            onDragStart={(e) => handleDragStart(e, item.name)}
          >
            {item.name}
          </div>
        ))}
      </div>

      <div style={itemContainerStyle}>
        {colors.map((item, index) => (
          <div
            key={index}
            style={{ ...boxStyle, backgroundColor: item.color }}
            onDrop={(e) => handleDrop(e, item.color)}
            onDragOver={handleDragOver}
          >
            Drop {item.name} here
          </div>
        ))}
      </div>
      {feedback && <div style={feedbackStyle}>{feedback}</div>}
    </div>
  );
}

export default ColourTest;
