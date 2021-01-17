import { Point } from "./positions";
import { getRadius } from "../config/hexConfig";
import { getOffsetX, getOffsetY } from "../config/grid";

interface Orientation {
  f0: number;
  f1: number;
  f2: number;
  f3: number;
  b0: number;
  b1: number;
  b2: number;
  b3: number;
  startAngle: number;
}

export const Orientation = (
  f0: number,
  f1: number,
  f2: number,
  f3: number,
  b0: number,
  b1: number,
  b2: number,
  b3: number,
  startAngle: number
) => {
  return {
    f0: f0,
    f1: f1,
    f2: f2,
    f3: f3,
    b0: b0,
    b1: b1,
    b2: b2,
    b3: b3,
    startAngle: startAngle,
  };
};

export const pointyLayout = Orientation(
  Math.sqrt(3.0),
  Math.sqrt(3.0) / 2.0,
  0.0,
  3.0 / 2.0,
  Math.sqrt(3.0) / 3.0,
  -1.0 / 3.0,
  0.0,
  2.0 / 3.0,
  0.5
);

export const flatLayout = Orientation(
  3.0 / 2.0,
  0.0,
  Math.sqrt(3.0) / 2.0,
  Math.sqrt(3.0),
  2.0 / 3.0,
  0.0,
  -1.0 / 3.0,
  Math.sqrt(3.0) / 3.0,
  0.0
);

// eslint-disable-next-line no-unused-vars
const offsets = {
  odd: -1,
  even: 1,
};

export interface Layout {
  orientation: Orientation;
  size: Point;
}

export const Layout = (orientation: Orientation, size: Point): Layout => {
  return { orientation: orientation, size: size };
};

// export const XOffsetFromPoint = (offset: number, point: Point) => {
//   const x = point.x + Math.trunc((point.y + offset * (point.y & 1)) / 2);
//   const y = point.y;

//   return Point(x, y);
// };

// export const YOffsetFromPoint = (offset: number, h) => {
//   const col = h.x;
//   const row = h.y + Math.trunc((h.x + offset * (h.x & 1)) / 2);

//   return Point(col, row);
// };

/**
 * Based on the provided grid point this function will return
 * a point in the pixel position
 *
 * @param  {Layout} layout  The layout of the grid
 * @param  {Point}  point   The grid position
 *
 * @return {Point}  The pixel position
 */
export const gridToWorldPosition = (layout: Layout, point: Point) => {
  let renderX = point.x * 2;
  let renderY = point.y * 2;
  if (renderY % 4 !== 0) {
    renderX++;
  }

  renderX *= (Math.sqrt(3) / 2) * getRadius();
  renderY *= (getRadius() / 4) * 3.0;

  renderX += getOffsetX();
  renderY += getOffsetY();

  return Point(renderX, renderY);
};

const wrapToTile = (axisCord: number): number => {
  if (axisCord > 1) {
    return Math.floor(axisCord);
  } else if (axisCord < -1) {
    return (axisCord = Math.ceil(axisCord));
  }

  return 0;
};

/**
 * Based on the provided world position this function will return
 * a point in the grid location
 *
 * @param  {Layout} layout  The layout of the grid
 * @param  {Point}  point   The world position
 *
 * @return {Point}  The grid location
 */
export const worldPositionToGrid = (layout: Layout, point: Point) => {
  let gridX = point.x;
  let gridY = point.y;

  gridX -= getOffsetX();
  gridY -= getOffsetY();

  gridX /= (Math.sqrt(3) / 2) * getRadius();
  gridY /= (getRadius() / 4) * 3.0;

  return Point(wrapToTile(gridX), wrapToTile(gridY));
};
