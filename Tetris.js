import Matrix from "./Matrix.js";
import { ctx } from "./canvas.js";
import {
  BACKGROUND_COLOR,
  SQUARES_X,
  SQUARE_SIZE,
  STARTER_X_POSITION,
  STARTER_Y_POSITION,
} from "./config.js";

class Tetris extends Matrix {
  constructor(template, color) {
    super(template);
    this.color = color;
    this.matrix = this.matrix.map((row) =>
      row.map((value) => (value == 1 ? this.color : value))
    );
    this.width = this.cols * SQUARE_SIZE;
    this.height = this.rows * SQUARE_SIZE;
    this.position = {
      x: STARTER_X_POSITION,
      y: STARTER_Y_POSITION,
    };
  }

  copy() {
    return new Tetris(this.matrix, this.color);
  }

  draw(context = ctx, { x, y } = this.position) {
    this.matrix.forEach((cols, colIndex) =>
      cols.forEach((value, rowIndex) => {
        if (value.length == 0) return;
        const positionX = (x + rowIndex) * SQUARE_SIZE;
        const positionY = (y + colIndex) * SQUARE_SIZE;

        context.fillStyle = this.color;
        context.fillRect(positionX, positionY, SQUARE_SIZE, SQUARE_SIZE);
        context.strokeStyle = BACKGROUND_COLOR;
        context.lineWidth = 2;
        context.strokeRect(positionX, positionY, SQUARE_SIZE, SQUARE_SIZE);
      })
    );
  }

  unDraw(context = ctx, { x, y } = this.position) {
    this.matrix.forEach((cols, colIndex) =>
      cols.forEach((value, rowIndex) => {
        if (value.length == 0) return;
        context.clearRect(
          (x + rowIndex) * SQUARE_SIZE,
          (y + colIndex) * SQUARE_SIZE,
          SQUARE_SIZE,
          SQUARE_SIZE
        );
      })
    );
  }

  onMatrixChange() {
    this.rows = this.matrix.length;
    this.cols = this.matrix[0].length;
    this.width = this.cols * SQUARE_SIZE;
    this.height = this.rows * SQUARE_SIZE;
  }

  turnLeft() {
    const rotatedMatrix = [];
    for (let rowIndex = this.matrix[0].length - 1; rowIndex >= 0; rowIndex--) {
      const newRow = [];
      for (let colIndex = 0; colIndex < this.matrix.length; colIndex++) {
        newRow.push(this.matrix[colIndex][rowIndex]);
      }
      rotatedMatrix.push(newRow);
    }

    this.unDraw();
    this.matrix = rotatedMatrix;
    this.onMatrixChange();
    this.draw();
    return this;
  }

  turnRight() {
    const rotatedMatrix = [];
    for (let rowIndex = 0; rowIndex < this.matrix[0].length; rowIndex++) {
      const newRow = [];
      for (let colIndex = this.matrix.length - 1; colIndex >= 0; colIndex--) {
        newRow.push(this.matrix[colIndex][rowIndex]);
      }
      rotatedMatrix.push(newRow);
    }

    this.unDraw();
    this.matrix = rotatedMatrix;
    this.onMatrixChange();
    this.draw();
    return this;
  }

  moveLeft(step = 1) {
    this.unDraw();
    if (this.position.x > 0) this.position.x -= step;
    this.draw();
  }
  moveRight(step = 1) {
    this.unDraw();
    if (this.position.x + this.cols < SQUARES_X) this.position.x += step;
    this.draw();
  }
  moveDown(step = 1) {
    this.unDraw();
    this.position.y += step;
    this.draw();
  }
}

class TetrisR extends Tetris {
  constructor() {
    super(
      [
        [1, 1],
        [1, 1],
      ],
      "#efada9"
    );
  }

  turnLeft() {
    return this;
  }

  turnRight() {
    return this;
  }
}
class TetrisT extends Tetris {
  constructor() {
    super(
      [
        ["", 1, ""],
        [1, 1, 1],
      ],
      "#78c0a8"
    );
  }
}
class TetrisS extends Tetris {
  constructor() {
    super(
      [
        [1, ""],
        [1, 1],
        ["", 1],
      ],
      "#f07819"
    );
  }
}
class TetrisL extends Tetris {
  constructor() {
    super(
      [
        [1, ""],
        [1, ""],
        [1, 1],
      ],
      "#fcebb7"
    );
  }
}
class TetrisI extends Tetris {
  constructor() {
    super([[1], [1], [1], [1]], "#f0a830");
  }
}

export { Tetris, TetrisI, TetrisL, TetrisR, TetrisS, TetrisT };
