import { COLS, ROWS, CELL_SIZE, GAP_SIZE } from './constants';

export const CANVAS_WIDTH = COLS * (CELL_SIZE + GAP_SIZE);
export const CANVAS_HEIGHT = ROWS * (CELL_SIZE + GAP_SIZE);

export function createCanvasElement() {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  return canvas;
}

export function render(ctx, {direction, length, score}) {
  renderBackground(
    ctx,
    `Direction: ${direction.x},${direction.y} Length: ${length} Score: ${score}`
  );
}

export function renderBackground(ctx, score) {
  ctx.fillStyle = 'rgba( 251, 251, 251, 1 )';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (!score) return;
  ctx.font = '18px serif';
  ctx.fillStyle = 'green';
  ctx.fillText(`${score}`, 24, 24);
}
