export function nextDirection(previous, next) {

  // const isOpposite = (previous, next) =>
  //   previous === '←' && next === '→' ||
  //   previous === '→' && next === '←' ||
  //   previous === '↑' && next === '↓' ||
  //   previous === '↓' && next === '↑';

  const isOpposite = (previous, next) =>
    next.x === -previous.x ||
    next.y === -previous.y;

  return isOpposite(previous, next)
    ? previous
    : next;
}









// reduce((acc, curr) => newAcc, defaultAcc);
// reduce((acc, curr) => acc + curr, 0); -- sum
