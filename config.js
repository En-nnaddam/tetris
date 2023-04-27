export const SQUARES_Y = 20;
export const SQUARES_X = 10;

export const generateInitialMatrix = () => {
  const arr = new Array(SQUARES_Y).fill("");
  return arr.map(() => Array(SQUARES_X).fill(""));
};

export const CANVAS_WIDTH = 200;
export const CANAVS_HEIGHT = 400;
export const SQUARE_SIZE = CANVAS_WIDTH / SQUARES_X;
export const INITIAL_MATRIX = generateInitialMatrix();
export const BACKGROUND_COLOR = "#411624";
export const STARTER_X_POSITION = 4;
export const STARTER_Y_POSITION = -1;
export const FPS = 30;
