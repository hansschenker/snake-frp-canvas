import { COLS, ROWS, CELL_SIZE, GAP_SIZE } from "./constants";
import { Position, Game } from "./types";

export const CANVAS_WIDTH = COLS * (CELL_SIZE + GAP_SIZE);
export const CANVAS_HEIGHT = ROWS * (CELL_SIZE + GAP_SIZE);

export function createCanvasElement(): CanvasRenderingContext2D {
  //const canvas = document.createElement("canvas");
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  canvas.style.width = CANVAS_WIDTH + "px";
  canvas.style.height = CANVAS_HEIGHT + "px";
  canvas.style.backgroundColor = "#efefef";

  return ctx!;
}

export function render(ctx: CanvasRenderingContext2D, game: Game) {
  renderBackground(ctx, game.score);
  renderSnake(ctx, game.snake);
  renderApples(ctx, game.apples);
}

export function renderBackground(ctx: CanvasRenderingContext2D, score: number) {
  ctx.fillStyle = "rgba( 251, 251, 251, .7 )";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (!score) return;
  ctx.font = "24px serif";
  ctx.fillStyle = "green";
  ctx.fillText(`${score}`, 24, 24);
}

export function renderSnake(ctx: CanvasRenderingContext2D, snake: Position[]) {
  snake.forEach((segment, i) => paintCell(ctx, segment, getSegmentColor(i)));
}

export function renderApples(ctx, apples) {
  apples.forEach((point) => {
    paintCell(ctx, point, "red");
  });
}

export function paintCell(ctx: CanvasRenderingContext2D, point, color) {
  const x = point.x * (CELL_SIZE + GAP_SIZE);
  const y = point.y * (CELL_SIZE + GAP_SIZE);

  ctx.fillStyle = color;
  ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}

export function getSegmentColor(index) {
  const color = `#366bf3`;
  return index === 0 ? "black" : color;
}
