import { lineRect } from "./collision";
import type { Game } from "./game";
import { GameObject } from "./gameobject";
import { Vector2 } from "./misc";

export class Player extends GameObject {
  pos = new Vector2(200, 500);
  velocity = new Vector2(0, 0);

  initalPos = this.pos;
  initalVelocity = this.velocity;

  time = 0;
  hasJumped = false;
  speed = 300;
  jumpChangeTime = 0;

  constructor(game: Game) {
    super(game);
  }

  isOnGround(): boolean {
    for (const line of this.game.world.levels[this.game.world.currentLevel]
      .lines) {
      if (
        lineRect(
          line.x1,
          line.y1,
          line.x2,
          line.y2,
          this.pos.x,
          this.pos.y,
          50,
          50,
        )
      ) {
        return true;
      }
    }
    return false;
  }

  KinematicEquation(
    acceleration: number,
    velocity: number,
    pos: number,
    time: number,
  ): number {
    return 0.5 * acceleration * time * time + velocity * time + pos;
  }

  update(deltaTime: number) {
    if (this.isOnGround()) {
      // this.pos.y += 500 * deltaTime;
      this.hasJumped = false;
    }
    if (this.game.keys.get(" ")) {
      this.hasJumped = true;

      this.initalPos = this.pos;
      this.initalVelocity = new Vector2(
        Math.cos((-80 * Math.PI) / 180) * 20,
        Math.sin((-80 * Math.PI) / 180) * 20,
      );
    }

    console.log(this.hasJumped, this.time);
    if (this.hasJumped) {
      this.time += deltaTime;

      this.pos.x = this.KinematicEquation(
        0,
        this.initalVelocity.x,
        this.initalPos.x,
        this.time,
      );
      this.pos.y = this.KinematicEquation(
        20,
        this.initalVelocity.y,
        this.initalPos.y,
        this.time,
      );
    }

    if (this.game.keys.get("a")) {
      this.pos.x -= this.speed * deltaTime;
    }
    if (this.game.keys.get("d")) {
      this.pos.x += this.speed * deltaTime;
    }
  }

  render() {
    this.game.ctx.clearRect(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height,
    );

    this.game.ctx.fillStyle = "#f00";
    this.game.ctx.fillRect(this.pos.x, this.pos.y, 50, 50);
  }
}
