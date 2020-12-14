import { getRadius, getHeight } from "../config/hexConfig";

export const gridToHexCord = (x, y) => {
  var xIdx = Math.round(x / (getRadius() * (3 / 2)));
  newx = xIdx * (getRadius() * (3 / 2));

  if (xIdx % 2) {
    y = Math.floor(y / getHeight()) * getHeight() + getHeight() / 2;
  } else {
    y = Math.round(y / getHeight()) * getHeight();
  }

  return { x, y };
};
