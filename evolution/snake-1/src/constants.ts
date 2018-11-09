export const COLS = 30;
export const ROWS = 30;
export const GAP_SIZE = 1;
export const CELL_SIZE = 10;
export const SPEED = 100;
// export const DIRECTIONS = {
//   37: '←',
//   38: '↑',
//   39: '→',
//   40: '↓',
// };
export const DIRECTIONS = {
  37: { x: -1, y:  0 },
  38: { x:  0, y: -1 },
  39: { x:  1, y:  0 },
  40: { x:  0, y:  1 },
};
export const INITIAL_DIRECTION = DIRECTIONS[40];
