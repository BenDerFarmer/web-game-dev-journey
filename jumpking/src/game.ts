import { Player } from "./player";
import { createWorld } from "./world";

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  keys = new Map<string, boolean>();
  private frameCount: number = 0;
  private lastTime: number = 0;

  player = new Player(this);
  world = createWorld(this);

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;

    window.addEventListener("keydown", (event) => {
      this.keys.set(event.key, true);
    });

    window.addEventListener("keyup", (event) => {
      this.keys.set(event.key, false);
    });

    this.frame();
  }

  private update(deltaTime: number) {
    this.player.update(deltaTime);
  }

  private render() {
    this.player.render();
    this.world.render();
  }

  private frame = (currentTime: number = 0) => {
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();
    this.frameCount++;
    requestAnimationFrame(this.frame);
  };
}
