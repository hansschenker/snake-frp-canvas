import {
  fromEvent,
  interval
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  scan,
  startWith
} from 'rxjs/operators';
import { createCanvasElement, render } from './canvas';
import { nextDirection } from './functions';
import { SPEED, DIRECTIONS, INITIAL_DIRECTION } from './constants';

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

const game$ = direction$;

game$.subscribe(tick => render(ctx, tick));
