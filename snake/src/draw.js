import { gridSize, ctx, cellsX, cellsY } from "./game";

export function drawGrid() {
  for (let x = 0; x <= cellsX; x++) {
    for (let y = 0; y <= cellsY; y++) {
      ctx.fillStyle = (x + y) % 2 == 0 ? "#a98467" : "#6c584c";

      ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }
}

export function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

export function drawApple(apple) {
  drawCell(apple.x, apple.y, "#ef476f");
}

const pointsElement = document.getElementById("points");

export function drawPoints(gamestate) {
  pointsElement.innerText = "Points: " + gamestate.points;
}

const overlay = document.getElementById("overlay");

export function drawGameOver() {
  overlay.innerHTML = `
    <h1>Game Over</h1>
    <h2>Press any Key to continue</h2>
  `;
}

export function removeGameOver() {
  overlay.innerText = "";
}
