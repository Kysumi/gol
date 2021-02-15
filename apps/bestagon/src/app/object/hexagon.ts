import { Point } from "../grid/positions";
import * as pixi from "pixi.js";
import { isofy, Layout } from "../grid/layout";
import { Graphics } from "pixi.js";
// https://gamedevelopment.tutsplus.com/tutorials/creating-isometric-worlds-a-primer-for-game-developers--gamedev-6511

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
