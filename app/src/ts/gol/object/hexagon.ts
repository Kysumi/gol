import { Point } from "../grid/positions";
import * as pixi from "pixi.js";
import { Layout } from "../grid/layout";
import { Graphics } from "pixi.js";
import { getRadius } from "../config/hexConfig";

const getOutlineColor = () => {
  return 0x000000;
};

/**
 * Taking into account both the layout and size of hexagon
 * plot the points
 *
 * @param  {Layout} layout
 * @param  {number} corner
 *
 * @return {Point}
 */
const hexCornerOffset = (layout: Layout, corner: number) => {
  const M = layout.orientation;
  const size = layout.size;

  const angle = (2.0 * Math.PI * (M.startAngle - corner)) / 6.0;

  return Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
};

// Dimetric best degree of angle is 26.5 which give 2:1 ratio  thise means 2 horizontal we need one verticle
const isofy = (point: Point): Point => {
  const { x, y } = point;
  const radius = 0.9;

  // tempPt.x = (pt.x * tileWidth / 2) + (pt.y * tileWidth / 2);
  // tempPt.y =  (pt.y * tileHeight / 2) - (pt.x * tileHeight / 2);
  // const pointX = x * radius + y * radius;
  // const pointY = y * radius - x * radius;

  // #### Attempt 2
  // distance from center of hex to edge
  // const r = 1; // was sqrt(3)

  // // distance from center of hex to corner;
  // const s = 0.8; // was 2

  // const pointX = (1 / (2 * r)) * x - (1 / s) * y;
  // const pointY = (1 / r) * x;

  // Attempt 3

  // const angle = 150;

  // const pointX = x * Math.cos(7) + (angle * Math.cos(42)) / 2;
  // const pointY = y + (angle * Math.sin(42)) / 2 - x * Math.sin(7);

  // attempt 4

  const pointX = x - y;
  const pointY = (x + y) / 2;

  return Point(pointX, pointY);
};

const hexagonMatrix = (layout: Layout) => {
  const corners = [];

  for (let i = 0; i < 6; i++) {
    const offset = hexCornerOffset(layout, i);
    const { x, y } = isofy(offset);

    corners.push(x);
    corners.push(y);
  }

  return corners;
};

export const getHexObject = () => {
  const hexagon = new pixi.Graphics();

  return hexagon;
};

export const drawHexagon = (
  layout: Layout,
  hexagon: Graphics,
  color: string
) => {
  hexagon.beginFill(getOutlineColor());
  hexagon.drawPolygon(hexagonMatrix(layout));
  hexagon.endFill();

  const fillLayout = {
    ...layout,
    size: Point(layout.size.x - 1.5, layout.size.y - 1.5),
  };
  hexagon.beginFill(parseInt(color));
  hexagon.drawPolygon(hexagonMatrix(fillLayout));
  hexagon.endFill();
};
