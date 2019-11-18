export type RangeArray = [number, number];
 
export type NumberOrRange = number | RangeArray;

export function getRangeFromNumberOrRange(range: NumberOrRange): RangeArray {
  if (typeof range === 'number') {
    return [0, range];
  }

  return range;
}

function isRangeArray(thing: any): boolean {
  return (
    Array.isArray(thing) === true
    && thing.length === 2
    && thing.every(member => typeof member === 'number')
  );
}

function orderRangeArray(range: RangeArray): RangeArray {
  const min = Math.min(...range);
  const max = Math.max(...range);

  return [min, max];
}

export function getEuclideanDistance(a: number, b: number): number {
  if (a === b) {
    return 0;
  }

  return Math.sqrt(Math.abs((a - b) * (b - a)));
}

export function cycleNumber(value: number, range: NumberOrRange): number {
  range = getRangeFromNumberOrRange(range);

  const [min, max] = orderRangeArray(range);

  if (min === 0 && max === 0) {
    return 0;
  }

  const da = getEuclideanDistance(min, max);

  if (value > max) {
    let db = getEuclideanDistance(value, max);

    let c = (db % da) + min;

    if (c === min) {
      return max;
    }

    return c;
  } else if (value < min) {
    let db = getEuclideanDistance(value, min);

    let c = max - (db % da);

    if (c === max) {
      return min;
    }

    return c;
  }

  return value;
}

export function lerp(t: number, from: number, to: number): number {
  return (1 - t) * from + t * to;
}