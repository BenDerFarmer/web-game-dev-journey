import { Game } from "./game";
import "./style.css";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

function resizeCanvas() {
  canvas.width = document.body.clientWidth * (3 / 4);
  canvas.height = document.body.clientHeight;

  new Game(canvas, ctx);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
