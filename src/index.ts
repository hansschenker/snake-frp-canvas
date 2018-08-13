import {
  BehaviorSubject,
  animationFrameScheduler,
  combineLatest,
  fromEvent,
  interval
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  scan,
  share,
  skip,
  startWith,
  takeWhile,
  withLatestFrom
} from 'rxjs/operators';

import { createCanvasElement, render } from './canvas';
import { generateApples, generateSnake, move, nextDirection,
         eat, checkSnakeCollision } from './functions';
import { SNAKE_LENGTH, APPLE_COUNT, POINTS_PER_APPLE, GROW_PER_APPLE,
         SPEED, FPS, DIRECTIONS, INITIAL_DIRECTION } from './constants';

const canvas = createCanvasElement();
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

const tick$ = interval(SPEED);
const keyDown$ = fromEvent(document.body, 'keydown');
const direction$ = keyDown$
  .pipe(
    map((e: any) => DIRECTIONS[e.keyCode]),
    filter(Boolean),
    startWith(INITIAL_DIRECTION),
    scan(nextDirection),
    distinctUntilChanged()
  );

const length$ = new BehaviorSubject(SNAKE_LENGTH);
const snakeLength$ = length$
  .pipe(
    scan((snakeLength, grow) => snakeLength + grow)
  );

const snake$ = tick$
  .pipe(
    withLatestFrom(
      direction$,
      snakeLength$,
      (_, direction, snakeLength) => ({ direction, snakeLength })
    ),
    scan(move, generateSnake(SNAKE_LENGTH)),
    share()
  );

const apples$ = snake$
  .pipe(
    scan(eat, generateApples(APPLE_COUNT)),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    share()
  );

const applesEaten$ = apples$
  .pipe(
    skip(1),
    map(_ => GROW_PER_APPLE)
  )
  .subscribe(v => length$.next(v));

const score$ = length$
  .pipe(
    skip(1),
    startWith(0),
    scan((score, _) => score + POINTS_PER_APPLE)
  );

const scene$ = combineLatest(
  snake$, apples$, score$,
  (snake, apples, score) => ({ snake, apples, score })
);

const game$ = interval(1000 / FPS, animationFrameScheduler)
  .pipe(
    withLatestFrom(scene$, (_, scene) => scene),
    takeWhile(scene => checkSnakeCollision(scene.snake))
  );

game$.subscribe({
  next: (scene) => render(ctx, scene),
  complete: console.log
});
