// Summary.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Test1.css'; // Style each game box with this CSS file

function Test1() {
  const navigate = useNavigate();

  const games = [
    { name: "Colour Test", path: "/game/colour" },
    { name: "Number Recognition", path: "/game/number" },
    { name: "Math Puzzle", path: "/game/math" },
    { name: "Logical Reasoning", path: "/game/logical" }
  ];

  return (
    <div className="summary-container">
      <h1>Select a Game</h1>
      <div className="game-boxes">
        {games.map((game, index) => (
          <div
            key={index}
            className="game-box"
            onClick={() => navigate(game.path)}
          >
            {game.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Test1;

