export const score = document.getElementById("score");
export const setScore = (value) =>
  (score.textContent = +score.textContent + value);
