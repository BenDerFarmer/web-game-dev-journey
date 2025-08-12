import { lineRect } from "./collision";
import type { Game } from "./game";
import { GameObject } from "./gameobject";

export class Player extends GameObject {
  x = 200;
  y = 100;

  constructor(game: Game) {
    super(game);
  }

  update(deltaTime: number) {
    if (!lineRect(200, 600, 600, 600, this.x, this.y, 50, 50)) {
      this.y += 500 * deltaTime;
    }

    if (this.game.keys.get("a")) {
      this.x -= 100 * deltaTime;
    }
    if (this.game.keys.get("d")) {
      this.x += 100 * deltaTime;
    }
  }

  render() {
    this.game.ctx.clearRect(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height,
    );

    this.game.ctx.moveTo(200, 600);
    this.game.ctx.lineTo(600, 600);
    this.game.ctx.stroke();

    this.game.ctx.fillStyle = "#f00";
    this.game.ctx.fillRect(this.x, this.y, 50, 50);
  }
}
