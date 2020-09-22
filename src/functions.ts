import { COLS, ROWS } from "./constants";
import { Position, Direction } from "./types";

// save snake positions
let snakeSave: Position[] = [];

const range = (l: number) => [...Array(l).keys()];

export function generateSnake(length: number): Position[] {
  return range(length).map((i) => ({ x: i, y: 0 }));
}

export function move(snake: Position[], { direction, snakeLength }) {
  const head = snake[0];

  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y,
  };

  const ateApple = snakeLength > snake.length;

  const newBody = ateApple ? snake : snake.slice(0, -1);
  console.log("functions-move.newBody:", newBody);
  return [newHead, ...newBody].map(wrapBounds);
}

const isOpposite = (previous: Position, next: Position) =>
  next.x === -previous.x || next.y === -previous.y;

export function nextDirection(previous: Direction, next: Direction): Direction {
  return isOpposite(previous, next) ? previous : next;
}

export function appleEaten(apples: Position[], snake: Position[]) {
  const head = snake[0];
  const notEaten = apples.filter((apple) => !checkCollision(head, apple));
  const wasEaten = notEaten.length < apples.length;
  const added = wasEaten ? [getRandomPosition(snake)] : [];

  snakeSave = snakeSave.concat([...notEaten, ...added]);
  console.log("functions-appleEaten.snakeSave:", snakeSave);
  return [...notEaten, ...added];
}

export function generateApples(count): Position[] {
  return range(count).map(() => getRandomPosition());
}

function getRandomPosition(snake: Position[] = []) {
  const position = {
    x: getRandomNumber(0, COLS - 1),
    y: getRandomNumber(0, ROWS - 1),
  };

  return isEmptyCell(position, snake) ? position : getRandomPosition(snake);
}

function isEmptyCell(position, snake) {
  return !snake.some((segment) => checkCollision(segment, position));
}

function checkCollision(a: Position, b: Position) {
  return a.x === b.x && a.y === b.y;
}

export function checkSnakeCollision(snake: Position[] = []): boolean {
  // separte head and tail
  const [head, ...bodyParts] = snake;

  return bodyParts.some((part) => checkCollision(part, head));
}

export function wrapBounds(point) {
  const x = point.x >= COLS ? 0 : point.x < 0 ? COLS - 1 : point.x;

  const y = point.y >= ROWS ? 0 : point.y < 0 ? ROWS - 1 : point.y;

  return { x, y };
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function compareDirections(a: Position, b: Position) {
  return JSON.stringify(a) === JSON.stringify(b);
}
