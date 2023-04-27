import { ctx } from "./canvas.js";
import {
  BACKGROUND_COLOR,
  CANAVS_HEIGHT,
  CANVAS_WIDTH,
  SQUARES_X,
  SQUARE_SIZE,
} from "./config.js";
import Matrix from "./Matrix.js";
import { setScore } from "./score.js";

export default class Field extends Matrix {
  constructor(matrix) {
    super(matrix);
  }

  draw() {
    this.matrix.forEach((row, rowIndex) =>
      row.forEach((value, colIndex) => {
        if (value.length == 0) return;
        ctx.fillStyle = value;
        ctx.fillRect(
          colIndex * SQUARE_SIZE,
          rowIndex * SQUARE_SIZE,
          SQUARE_SIZE,
          SQUARE_SIZE
        );
        ctx.strokeRect(
          colIndex * SQUARE_SIZE,
          rowIndex * SQUARE_SIZE,
          SQUARE_SIZE,
          SQUARE_SIZE
        );
        ctx.strokeStyle = BACKGROUND_COLOR;
        ctx.lineWidth = 2;
      })
    );
  }

  unDraw(x = 0, y = 0, w = CANVAS_WIDTH, h = CANAVS_HEIGHT) {
    ctx.clearRect(x, y, w, h);
  }

  removeFilledRows() {
    const rowsToRemove = [];
    this.matrix.forEach((row, rowIndex) => {
      if (row.every((value) => value.length > 0)) rowsToRemove.push(rowIndex);
    });

    const newMatrix = this.matrix.filter(
      (row, rowIndex) => !rowsToRemove.includes(rowIndex)
    );

    const zeros = Array(rowsToRemove.length)
      .fill("")
      .map((row) => Array(SQUARES_X).fill(""));

    setScore(rowsToRemove.length * 100);
    this.matrix = [...zeros, ...newMatrix];
  }
}
