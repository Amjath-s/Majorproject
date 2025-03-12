import React, { useState } from 'react';
import './ColourTest.css';

function ColourTest() {
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(''); // State for the pop-up message
  const [showPopup, setShowPopup] = useState(false); // State to control pop-up visibility
  const [feedback, setFeedback] = useState(""); 

  const colors = [
    { name: 'Blue', color: 'blue' },
    { name: 'Red', color: 'red' },
    { name: 'Green', color: 'green' },
    { name: 'Yellow', color: 'yellow' },
  ];

  const handleDragStart = (event, colorName) => {
    event.dataTransfer.setData('colorName', colorName);
  };

  const handleDrop = (event, boxColor) => {
    event.preventDefault();
    const colorName = event.dataTransfer.getData('colorName');

    if (colorName.toLowerCase() === boxColor) {
      setScore(score + 1);
      setFeedback(`✅ Correct!`);
      //provideFeedback('Correct! Great job!');
    } else {
      setScore(score - 1);
      setFeedback(`❌ Incorrect!`);
    //  provideFeedback('Incorrect! Try again.');
    }
    setTimeout(() => setFeedback(""), 1000); 
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

 /* const Feedback = (feedbackMessage) => {
    // Update message and show the pop-up
    setMessage(feedbackMessage);
    setShowPopup(true);

    // Play the voice feedback
    speakFeedback(feedbackMessage);

    // Hide the pop-up after 2 seconds
    setTimeout(() => setShowPopup(false), 2000);
  };*/

 /* const speakFeedback = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.rate = 1; // Adjust the speed of the voice
    speech.pitch = 3; // Adjust the pitch of the voice
    speech.lang = 'en-US'; // Set the language
    window.speechSynthesis.speak(speech);
  };*/

  return (
    <div className="game-container">
      <h1>Color Matching Game</h1>
      <p>Drag each ball to the matching color box. Score: {score}</p>

      {/* Pop-up Message */}
      {showPopup && <div className="popup-message">{message}</div>}

      <div className="balls-container">
        {colors.map((item, index) => (
          <div
            key={index}
            className="ball"
            style={{ backgroundColor: item.color }}
            draggable
            onDragStart={(e) => handleDragStart(e, item.name)}
          >
            {item.name}
          </div>
        ))}
      </div>

      <div className="boxes-container">
        {colors.map((item, index) => (
          <div
            key={index}
            className="color-box"
            style={{ backgroundColor: item.color }}
            onDrop={(e) => handleDrop(e, item.color)}
            onDragOver={handleDragOver}
          >
            Drop {item.name} here
          </div>
        ))}
      </div>
      {feedback && <div className="feedback-popup">{feedback}</div>}
    </div>
  );
}

export default ColourTest;
