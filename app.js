import { ctx } from "./canvas.js";
import {
  SQUARES_X,
  INITIAL_MATRIX,
  generateInitialMatrix,
  CANVAS_WIDTH,
  CANAVS_HEIGHT,
} from "./config.js";
import Field from "./Field.js";
import { getFps } from "./fps.js";
import { handleGameState, gameState } from "./gameState.js";
import {
  getCurrentShape,
  getNextShape,
  nextShapeContext,
  setNextShape,
} from "./shape.js";

const gameOver = document.getElementById("game-over");

const field = new Field(INITIAL_MATRIX);
let gameFrames = 1;

getNextShape().draw(nextShapeContext, { x: 1, y: 1 });

const isGameOver = (field, shape) => field[0][shape.position.x].length > 0;

gameState.onclick = handleGameState;

const restart = document.getElementById("restart");
const restartGame = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANAVS_HEIGHT);
  field.matrix = generateInitialMatrix();
  setNextShape();
  gameState.textContent = "START";
  gameState.click();
  if (gameOver.style.display != "none") gameOver.style.display = "none";
};

restart.addEventListener("click", restartGame);

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      if (
        getCurrentShape().position.y >= 0 &&
        getCurrentShape()
          .filledSquares()
          .every(
            ({ x, y }) =>
              getCurrentShape().position.x - 1 + x in
                field.matrix[getCurrentShape().position.y + y] &&
              field.matrix[getCurrentShape().position.y + y][
                getCurrentShape().position.x - 1 + x
              ].length == 0
          )
      ) {
        getCurrentShape().moveLeft();
      }
      break;
    case "ArrowRight":
      if (
        getCurrentShape().position.y >= 0 &&
        getCurrentShape()
          .filledSquares()
          .every(
            ({ x, y }) =>
              getCurrentShape().position.x + x + 1 in
                field.matrix[getCurrentShape().position.y + y] &&
              field.matrix[getCurrentShape().position.y + y][
                getCurrentShape().position.x + x + 1
              ].length == 0
          )
      ) {
        getCurrentShape().moveRight();
      }
      break;
    case "ArrowDown":
      if (
        getCurrentShape()
          .filledSquares()
          .every(
            ({ x, y }) =>
              getCurrentShape().position.y + 1 + y in field.matrix &&
              field.matrix[getCurrentShape().position.y + 1 + y][
                getCurrentShape().position.x + x
              ].length == 0
          )
      )
        getCurrentShape().moveDown();
      break;
    case "1":
      if (getCurrentShape().rows + getCurrentShape().position.x > SQUARES_X) {
        getCurrentShape().moveLeft(
          getCurrentShape().rows + getCurrentShape().position.x - SQUARES_X
        );
        getCurrentShape().turnLeft();
      } else if (
        getCurrentShape().position.y >= 0 &&
        getCurrentShape()
          .filledSquares()
          .every(
            ({ x, y }) =>
              field.matrix[getCurrentShape().position.y + y][
                getCurrentShape().position.x + x + 1
              ].length == 0
          )
      )
        getCurrentShape().turnLeft();
      break;
    case "2":
      if (getCurrentShape().rows + getCurrentShape().position.x > SQUARES_X) {
        getCurrentShape().moveLeft(
          getCurrentShape().rows + getCurrentShape().position.x - SQUARES_X
        );
        getCurrentShape().turnRight();
      } else if (
        getCurrentShape().position.y >= 0 &&
        getCurrentShape()
          .filledSquares()
          .every(
            ({ x, y }) =>
              field.matrix[getCurrentShape().position.y + y][
                getCurrentShape().position.x + x + 1
              ].length == 0
          )
      )
        getCurrentShape().turnRight();
      break;
    default:
      return;
  }
});

const animate = () => {
  if (!isGameOver(field.matrix, getCurrentShape())) {
    if (gameFrames % getFps() == 0) {
      if (
        getCurrentShape()
          .filledSquares()
          .every(({ x, y }) => {
            return (
              getCurrentShape().position.y + 1 + y in field.matrix &&
              field.matrix[getCurrentShape().position.y + 1 + y][
                getCurrentShape().position.x + x
              ].length == 0
            );
          })
      ) {
        getCurrentShape().moveDown();
      } else {
        field.add(
          getCurrentShape().matrix,
          getCurrentShape().position.y,
          getCurrentShape().position.x
        );
        field.removeFilledRows();
        field.unDraw();
        field.draw();
        setNextShape();
      }
    }
  } else {
    gameOver.style.display = "block";
  }
  gameFrames++;
  requestAnimationFrame(animate);
};

animate();
