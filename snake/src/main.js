import {
  drawApple,
  drawCell,
  drawGameOver,
  drawGrid,
  drawPoints,
  removeGameOver,
} from "./draw";
import { newGame, interval } from "./game";
import { appendToSnake, generateApple, isSnakeBody, isWall } from "./misc";
import "./style.css";

let gameState;

let lastTime = 0;
function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;

  if (deltaTime >= interval) {
    lastTime = timestamp - (deltaTime % interval);

    const snake = gameState.snake;

    if (
      isSnakeBody(snake, snake.head.x, snake.head.y) ||
      isWall(snake.head.x, snake.head.y)
    ) {
      drawGameOver();
      gameState.status = "lost";
      return;
    }

    drawGrid();
    drawApple(gameState.apple);

    let current = snake.head;

    while (current != null) {
      switch (current.direction) {
        case "right":
          current.x++;
          break;
        case "left":
          current.x--;
          break;
        case "up":
          current.y--;
          break;
        case "down":
          current.y++;
      }

      if (current == snake.head) {
        drawCell(current.x, current.y, "#dde5b6");

        if (current.x == gameState.apple.x && current.y == gameState.apple.y) {
          appendToSnake(snake);
          generateApple(gameState);
          gameState.points += 1;
          drawPoints(gameState);
        }
      } else {
        drawCell(current.x, current.y, "#adc178");
      }

      if (current.next != null) {
        current.next.nextDirection = current.direction;
      }
      current.direction = current.nextDirection;

      current = current.next;
    }
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
  if (event.key.startsWith("Arrow")) {
    const snake = gameState.snake;
    const direction = event.key.split("Arrow")[1].toLowerCase();
    snake.head.direction = direction;
    snake.head.nextDirection = direction;
  }

  if (gameState.status == "lost") {
    startGame();
  }
});

export function startGame() {
  gameState = newGame();

  removeGameOver();
  drawPoints(gameState);
  generateApple(gameState);
  requestAnimationFrame(gameLoop);
}

startGame();
