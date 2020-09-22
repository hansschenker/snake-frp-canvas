import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  interval,
  Observable,
} from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  scan,
  share,
  skip,
  startWith,
  take,
  takeWhile,
  tap,
  withLatestFrom,
} from "rxjs/operators";

import { createCanvasElement, render } from "./canvas";
import { Position } from "./types";
import {
  generateApples,
  generateSnake,
  move,
  nextDirection,
  appleEaten,
  checkSnakeCollision,
  compareDirections as comparePositions,
} from "./functions";
import {
  SNAKE_LENGTH,
  APPLE_COUNT,
  POINTS_PER_APPLE,
  GROW_PER_APPLE,
  SPEED,
  DIRECTIONS,
  INITIAL_DIRECTION,
} from "./constants";

const ctx = createCanvasElement();
//const ctx = canvas.getContext("2d");
console.log("context:", ctx);

//document.body.appendChild(canvas);

console.clear();

const tickChange$ = interval(SPEED).pipe(take(10));

const keyDown$ = fromEvent(document.body, "keydown");
const directionChange$: Observable<Position> = keyDown$.pipe(
  tap((v) => console.log("directionChange$:", v)),
  map((e: KeyboardEvent) => DIRECTIONS[e.keyCode]),
  filter(Boolean),
  //startWith(INITIAL_DIRECTION),
  scan(nextDirection, INITIAL_DIRECTION),
  distinctUntilChanged()
);

const appleEatenState$ = new BehaviorSubject<number>(3);
const appleEatenChange$ = appleEatenState$.pipe(
  tap((v) => console.log("appleEatenChange$:", v)),
  scan((appleCount, grow) => appleCount + grow, 0)
);

const snakeChange$: Observable<Position[]> = tickChange$.pipe(
  tap((v) => console.log("tickChange$:", v)),
  withLatestFrom(
    directionChange$,
    appleEatenChange$,
    (_, direction, appleEaten) => ({ direction, snakeLength: appleEaten })
  ),
  tap((v) => console.log("snakeChange$-direction:", v)),
  scan(move, generateSnake(SNAKE_LENGTH))
);

const appleChange$: Observable<Position[]> = snakeChange$.pipe(
  scan(appleEaten, generateApples(APPLE_COUNT)),
  distinctUntilChanged(comparePositions),
  share()
);

const applesEatenChange$ = appleChange$
  .pipe(
    skip(1),
    map((_) => GROW_PER_APPLE)
  )
  .subscribe((v) => appleEatenState$.next(v));

const scoreChange$ = appleEatenState$.pipe(
  skip(1),
  startWith(0),
  scan((score, _) => score + POINTS_PER_APPLE)
);

const sceneChange$ = combineLatest(
  snakeChange$,
  appleChange$,
  scoreChange$,
  (snake, apples, score) => ({ snake, apples, score })
);

const gameChange$ = tickChange$.pipe(
  withLatestFrom(sceneChange$, (_, scene) => scene),
  takeWhile((scene) => checkSnakeCollision(scene.snake))
);

gameChange$
  .pipe(tap((v) => console.log("gameChange$:", v)))
  .subscribe((scene) => render(ctx, scene));
