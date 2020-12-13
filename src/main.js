import * as pixi from "pixi.js";
import { hexagon } from "./app/object/hexagon";

const app = new pixi.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);

const hex = hexagon();

hex.x = 100;
hex.y = 100;

app.stage.addChild(hex);
