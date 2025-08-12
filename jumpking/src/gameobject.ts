import type { Game } from "./game";

export class GameObject {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  update(deltaTime: number) {}
  render() {}
}
