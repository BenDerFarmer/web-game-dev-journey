import { cellsX, cellsY } from "./game";

export function isSnakeBody(snake, x, y) {
  let current = snake.head.next;
  while (current != null) {
    if (current.x == x && current.y == y) {
      return true;
    }

    current = current.next;
  }
  return false;
}

export function appendToSnake(snake) {
  const tailDirection = snake.tail.direction;
  const next = {
    x:
      tailDirection == "right"
        ? snake.tail.x - 1
        : tailDirection == "left"
          ? snake.tail.x + 1
          : snake.tail.x,
    y:
      tailDirection == "down"
        ? snake.tail.y - 1
        : tailDirection == "up"
          ? snake.tail.y + 1
          : snake.tail.y,
    direction: tailDirection,
    nextDirection: snake.tail.nextDirection,
    next: null,
  };
  snake.tail.next = next;
  snake.tail = next;
}

export function isWall(x, y) {
  return x < 0 || y < 0 || x >= cellsX || y >= cellsY;
}

export function generateApple(gamestate) {
  let x = (Math.random() * cellsX) | 0;
  let y = (Math.random() * cellsY) | 0;

  const snake = gamestate.snake;

  if (isSnakeBody(snake) || (snake.head.x == x && snake.head.y == y)) {
    generateApple(gamestate);
    return;
  }

  gamestate.apple.x = x;
  gamestate.apple.y = y;
}
