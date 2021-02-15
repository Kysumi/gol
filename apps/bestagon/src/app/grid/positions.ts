export interface Point {
  x: number;
  y: number;
}

export const Point = (x: number, y: number) => {
  return { x: x, y: y };
};

/**
 * Adds the two points together
 * @param a
 * @param b
 */
export const add = (a: Point, b: Point) => {
  return Point(a.x + b.x, a.y + b.y);
};
