export interface Point {
  x: number;
  y: number;
}

export const Point = (x: number, y: number) => {
  return { x: x, y: y };
};
