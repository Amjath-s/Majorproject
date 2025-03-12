import React, { useState } from "react";
import NumberTest from "./NumberTest";
import NumberComparisonGame from "./NumberComparisonGame";

function GameContainer() {
  const [gameStep, setGameStep] = useState(1);

  const handleNextGame = () => {
    setGameStep(2); // Move to the next game
  };

  return (
    <div>
      {gameStep === 1 && <NumberTest onNextGame={handleNextGame} />}
      {gameStep === 2 && <NumberComparisonGame />}
    </div>
  );
}

export default GameContainer;
