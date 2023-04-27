import { TetrisI, TetrisL, TetrisR, TetrisS, TetrisT } from "./Tetris.js";

const nextShapeCanvas = document.getElementById("next-shape-canvas");
export const nextShapeContext = nextShapeCanvas.getContext("2d");

const shapes = [
  () => new TetrisR(),
  () => new TetrisI(),
  () => new TetrisT(),
  () => new TetrisS(),
  () => new TetrisL(),
];

const getRandomShape = () => {
  const randomIndex = Math.floor(Math.random() * shapes.length);
  return shapes[randomIndex]();
};

let currentShape = getRandomShape();
let nextShape = currentShape;

export const getNextShape = () => nextShape;
export const getCurrentShape = () => currentShape;

export const setNextShape = (context = nextShapeContext) => {
  nextShape.unDraw(context, { x: 1, y: 1 });
  currentShape = nextShape;
  nextShape = getRandomShape();
  nextShape.draw(context, { x: 1, y: 1 });
};
