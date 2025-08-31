export class Editor {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  gridSize = 20;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.draw();
  }

  draw() {
    for (let i = 0; i < this.canvas.width / this.gridSize; i++) {
      for (let j = 0; j < this.canvas.height / this.gridSize; j++) {
        this.ctx.fillStyle = "#f00";
        this.ctx.fillRect(
          i * this.gridSize + this.gridSize * 0.5,
          j * this.gridSize + this.gridSize * 0.5,
          5,
          5,
        );
      }
    }

    this.ctx.fillRect(200, 200, 200, 200);
  }
}
