export default class Matrix {
  constructor(matrix) {
    this.rows = matrix.length;
    this.cols = matrix[0].length || 0;
    this.matrix = matrix;
  }

  filledSquares() {
    const filled = [];

    this.matrix.forEach((rows, rowIndex) => {
      rows.forEach((value, colIndex) => {
        if (value.length == 0) return;
        const position = { x: colIndex, y: rowIndex };
        filled.push(position);
      });
    });

    return filled;
  }

  add(matrix, startRowIndex, startColIndex) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      for (let colIndex = 0; colIndex < cols; colIndex++) {
        this.matrix[startRowIndex + rowIndex][startColIndex + colIndex] +=
          matrix[rowIndex][colIndex];
      }
    }
  }
}
