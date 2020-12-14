import * as pixi from "pixi.js";
import { getRadius, getHeight } from "../config/hexConfig";
// https://codepen.io/zeakd/pen/NdMBgB Sauce

const getColor = () => {
  return 0xff0000;
};

const outLineColor = () => {
  return 0x000000;
};

const getHexagonMatrix = (radius, height) => {
  return [
    -radius,
    0,
    -radius / 2,
    height / 2,
    radius / 2,
    height / 2,
    radius,
    0,
    radius / 2,
    -height / 2,
    -radius / 2,
    -height / 2,
  ];
};

export const hexagon = () => {
  const radius = getRadius();
  const height = getHeight();

  const hexagon = new pixi.Graphics();

  hexagon.beginFill(outLineColor());
  hexagon.drawPolygon(getHexagonMatrix(radius, height));
  hexagon.endFill();

  hexagon.beginFill(getColor());
  hexagon.drawPolygon(getHexagonMatrix(radius - 1, height - 1));
  hexagon.endFill();

  return hexagon;
};
