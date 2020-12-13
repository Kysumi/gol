import * as pixi from "pixi.js";
// https://codepen.io/zeakd/pen/NdMBgB Sauce

const getRadius = () => {
  return 60;
};

const getHeight = () => {
  return getRadius() * Math.sqrt(3);
};

const getColor = () => {
  return 0xff0000;
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

  hexagon.beginFill(getColor());
  hexagon.drawPolygon(getHexagonMatrix(radius, height));
  hexagon.endFill();

  return hexagon;
};
