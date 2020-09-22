import { Position, Direction } from "./types";

export const COLS = 30;
export const ROWS = 30;
export const GAP_SIZE = 1;
export const CELL_SIZE = 10;
export const SNAKE_LENGTH = 3;
export const APPLE_COUNT = 2;
export const POINTS_PER_APPLE = 1;
export const GROW_PER_APPLE = 1;
export const SPEED = 1000;

export const DIRECTIONS: { [index: number]: Direction } = {
  37: { x: -1, y: 0 },
  38: { x: 0, y: -1 },
  39: { x: 1, y: 0 },
  40: { x: 0, y: 1 },
};
export const INITIAL_DIRECTION = DIRECTIONS[40];
