import { resetFps, setFps } from "./fps.js";
import { getCurrentShape, getNextShape, setNextShape } from "./shape.js";

export const gameState = document.getElementById("game-state");

const startGame = () => {
  if (getCurrentShape() === getNextShape()) setNextShape();

  setFps();
  gameState.textContent = "PAUSE";
};

const pauseGame = () => {
  resetFps();
  gameState.textContent = "START";
};

export const handleGameState = () => {
  switch (gameState.textContent) {
    case "START":
      return startGame();
    case "PAUSE":
      return pauseGame();
    default:
      console.error("Unknown game state");
      return;
  }
};

gameState.onclick = handleGameState;
