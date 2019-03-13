import { COLS, ROWS } from './constants';

const range = l => [...Array(l).keys()];

export function nextDirection(previous, next) {
  const isOpposite = (previous, next) =>
    next.x === -previous.x ||
    next.y === -previous.y;

  return isOpposite(previous, next)
    ? previous
    : next;
}

export function generateSnake(length) {
  return range(length).map(i => ({x: i, y: 0}))
}

export function move(snake, { direction }) {
  const head = snake[0];

  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y
  };

  const newBody = snake.slice(0, -1);

  return [newHead, ...newBody].map(wrapBounds);
}

export function wrapBounds(point) {
  const x = point.x >= COLS
    ? 0
    : point.x < 0
    ? COLS - 1
    : point.x;

  const y = point.y >= ROWS
    ? 0
    : point.y < 0
    ? ROWS - 1
    : point.y;

  return {x, y};
}
