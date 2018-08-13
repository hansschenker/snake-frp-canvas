import { COLS, ROWS } from './constants';

const range = l => [...Array(l).keys()];

export function generateSnake(length) {
  return range(length).map(i => ({x: i, y: 0}))
}

export function move(snake, { direction, snakeLength }) {
  const head = snake[0];

  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y
  };

  const newBody = snake.length > snakeLength
    ? snake.slice(0, -1)
    : snake;

  return [newHead, ...newBody].map(wrapBounds);
}

export function nextDirection(previous, next) {
  const isOpposite = (previous, next) =>
    next.x === -previous.x ||
    next.y === -previous.y;

  return isOpposite(previous, next)
    ? previous
    : next;
}

export function eat(apples, snake) {
  const head = snake[0];
  const withoutEaten = apples.filter(apple => !checkCollision(head, apple));
  const eaten = withoutEaten.length < apples.length;
  const added = eaten ? [getRandomPosition(snake)] : [];
  return [...withoutEaten, ...added];
}

export function generateApples(count) {
  return range(count).map(() => getRandomPosition());
}

function getRandomPosition(snake = []) {
  const position = {
    x: getRandomNumber(0, COLS - 1),
    y: getRandomNumber(0, ROWS - 1)
  };

  return isEmptyCell(position, snake)
    ? position
    : getRandomPosition(snake);
}

function isEmptyCell(position, snake) {
  return !snake.some(segment => checkCollision(segment, position));
}

function checkCollision(a, b) {
  return a.x === b.x && a.y === b.y;
}

export function checkSnakeCollision(snake = []) {
  const [head, ...tail] = snake;
  const res = tail.some(part => checkCollision(part, head));
  return !res;
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

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
