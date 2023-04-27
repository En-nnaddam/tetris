import { FPS } from "./config.js";

let fps = Infinity;

export const resetFps = () => {
  fps = Infinity;
};

export const setFps = (value = FPS) => {
  fps = value;
};

export const getFps = () => fps;
