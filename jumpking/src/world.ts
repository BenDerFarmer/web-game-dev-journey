import type { Game } from "./game";
import { GameObject } from "./gameobject";

export class Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}

export class Level {
  lines: Array<Line> = [];
}

export class World extends GameObject {
  currentLevel = 0;
  levels: Array<Level> = [];
  background: string = "";

  constructor(game: Game) {
    super(game);
  }

  update(_: number) {}

  render() {
    this.levels[this.currentLevel].lines.forEach((line) => {
      this.game.ctx.moveTo(line.x1, line.y1);
      this.game.ctx.lineTo(line.x2, line.y2);
      this.game.ctx.stroke();
    });
  }
}

export function createWorld(game: Game) {
  const world = new World(game);
  const level = new Level();

  world.levels.push(level);

  const lines = level.lines;
  lines.push(new Line(200, 600, 600, 600));
  lines.push(new Line(200, 400, 400, 400));

  return world;
}
