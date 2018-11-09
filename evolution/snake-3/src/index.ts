import {
  BehaviorSubject,
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
  startWith,
  withLatestFrom,
  skip
} from 'rxjs/operators';
import { createCanvasElement, render } from './canvas';
import { nextDirection, move, generateSnake } from './functions';
import { SPEED, DIRECTIONS, INITIAL_DIRECTION, SNAKE_LENGTH,
         POINTS_PER_APPLE } from './constants';

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

const increaseLength$ = new BehaviorSubject(0);
const snakeLength$ = increaseLength$
  .pipe(
    scan((snakeLength, grow) => snakeLength + grow, SNAKE_LENGTH)
  );

const score$ = increaseLength$
  .pipe(
    skip(1),
    startWith(0),
    scan((score, _) => score + POINTS_PER_APPLE)
  );

const snake$ = tick$
  .pipe(
    withLatestFrom(
      direction$,
      snakeLength$,
      (_, direction, snakeLength) => ({ direction, snakeLength })
    ),
    scan(move, generateSnake(SNAKE_LENGTH))
  );

const scene$ = combineLatest(
  snake$, direction$, snakeLength$, score$,
  (snake, direction, length, score) => ({ snake, direction, length, score })
);

const game$ = tick$
  .pipe(
    withLatestFrom(scene$, (_, scene) => scene)
  );

game$.subscribe(scene => render(ctx, scene));




// reduce((acc, curr) => newAcc, defaultAcc);
// reduce((resultingValue, newcomingValue) => newResultingValue, defaultValue);
