import { COLS, ROWS, CELL_SIZE, GAP_SIZE } from './constants';

export const CANVAS_WIDTH = COLS * (CELL_SIZE + GAP_SIZE);
export const CANVAS_HEIGHT = ROWS * (CELL_SIZE + GAP_SIZE);

export function createCanvasElement() {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  return canvas;
}

export function render(ctx, {snake, score, apples}) {
  renderBackground(ctx, score);
  renderSnake(ctx, snake);
  renderApples(ctx, apples);
}

export function renderBackground(ctx, score) {
  ctx.fillStyle = 'rgba( 251, 251, 251, .7 )';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (!score) return;
  ctx.font = '24px serif';
  ctx.fillStyle = 'green';
  ctx.fillText(`${score}`, 24, 24);
}

export function renderSnake(ctx, snake) {
  snake.forEach(
    (segment, i) => paintCell(ctx, segment, getSegmentColor(i))
  );
}

export function renderApples(ctx, apples) {
  apples.forEach(point => {
    paintCell(ctx, point, 'red');
  });
}

export function paintCell(ctx, point, color) {
  const x = point.x * (CELL_SIZE + GAP_SIZE);
  const y = point.y * (CELL_SIZE + GAP_SIZE);

  ctx.fillStyle = color;
  ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}

export function getSegmentColor(index) {
  const color = `#366bf3`;
  return index === 0 ? 'black' : color;
}
