export interface Position {
  x: number;
  y: number;
}

export interface Direction {
  axis: string;
  direction: number;
  position: Position;
}
export interface Game {
  snake: Position[];
  score: number;
  apples: Position[];
}
