import * as pixi from "pixi.js";
import { gol } from "./gol";

const app = new pixi.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);

gol(app);
