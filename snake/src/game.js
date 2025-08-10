export const canvas = document.getElementById("game");
export const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

export const gridSize = 50;
export const cellsX = canvas.width / gridSize;
export const cellsY = canvas.height / gridSize;

const ticks = 7;
export const interval = 1000 / ticks;

export function newGame() {
  const tail = {
    x: 6,
    y: 5,
    direction: "right",
    nextDirection: "right",
    next: null,
  };

  const head = {
    x: 8,
    y: 5,
    direction: "right",
    nextDirection: "right",
    next: {
      x: 7,
      y: 5,
      direction: "right",
      nextDirection: "right",
      next: tail,
    },
  };

  return {
    snake: { head: head, tail: tail },
    apple: { x: -1, y: -1 },
    points: 0,
    status: "running",
  };
}
