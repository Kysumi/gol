import * as pixi from "pixi.js";

export const debugTxt = (x: number, y: number) => {
  const txt = new pixi.Text(`${x}, ${y}`, {
    fill: "#333333",
    fontSize: 12,
    fontWeight: "bold",
  });
  return txt;
};
