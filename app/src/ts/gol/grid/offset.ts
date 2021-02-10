import { getOffsetX, getOffsetY } from "../config/grid";
import { getRadius } from "../config/hexConfig";
import { Point } from "./positions";

const hexRadius = getRadius();
const offset = Math.sqrt(3) / 2;

const rowOffset = (point: Point, shouldOffset: boolean) => {
  let x = point.x * 2;
  const y = point.y * 2;

  if (shouldOffset) {
    x++;
  }

  const renderX = x * offset * hexRadius + getOffsetX();
  const renderY = y * ((hexRadius / 4) * 3 + getOffsetY());

  return Point(Math.round(renderX), Math.round(renderY));
};

export const rowOffestOdd = (point: Point): Point => {
  const shouldOffset = (point.y * 2) % 4 !== 0;

  return rowOffset(point, shouldOffset);
};

export const rowOffestEven = (point: Point) => {
  const shouldOffset = (point.y * 2) % 4 === 0;

  return rowOffset(point, shouldOffset);
};
