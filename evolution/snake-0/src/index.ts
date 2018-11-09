import { interval } from 'rxjs';
import { createCanvasElement, render } from './canvas';
import { SPEED } from './constants';

const canvas = createCanvasElement();
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

const tick$ = interval(SPEED);

const game$ = tick$;

game$.subscribe(tick => render(ctx, tick));
