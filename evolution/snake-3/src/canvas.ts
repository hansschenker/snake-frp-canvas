import { COLS, ROWS, CELL_SIZE, GAP_SIZE } from './constants';

export const CANVAS_WIDTH = COLS * (CELL_SIZE + GAP_SIZE);
export const CANVAS_HEIGHT = ROWS * (CELL_SIZE + GAP_SIZE);

export function createCanvasElement() {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  return canvas;
}

export function render(ctx, {snake, direction, length, score}) {
  renderBackground(
    ctx,
    `Direction: ${direction.x},${direction.y} Length: ${length} Score: ${score}`
  );
  renderSnake(ctx, snake);
}

export function renderBackground(ctx, score) {
  ctx.fillStyle = 'rgba( 251, 251, 251, 1 )';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (!score) return;
  ctx.font = '18px serif';
  ctx.fillStyle = 'green';
  ctx.fillText(`${score}`, 24, 24);
}

export function renderSnake(ctx, snake) {
  snake.forEach(
    (segment, i) => paintCell(ctx, segment, getSegmentColor(i))
  );
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
