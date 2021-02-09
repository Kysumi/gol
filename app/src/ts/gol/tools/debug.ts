import * as pixi from "pixi.js";
import { Point } from "../grid/positions";
import { Layout, pointyLayout, worldPositionToGrid } from "../grid/layout";
import { rowOffestOdd } from "../grid/offset";

const background = new pixi.Graphics();
background.beginFill(0x989898);
background.lineStyle(1, 0x000);
background.drawRect(1, 1, 300, 50);
background.endFill();

let lastUpdate = Date.now();
let updateInterval: number = 100;
let currentFps: number = 0;
let mouse: any;
let girdLocation: Point;

const showFps = (app: pixi.Application, ticker: pixi.Ticker) => {
  //debounce to make it easier to read
  if (Date.now() - lastUpdate > updateInterval) {
    currentFps = Math.round(ticker.FPS);
    lastUpdate = Date.now();
  }

  const txt = new pixi.Text(`Fps: ${currentFps}`, {
    fill: "#800080",
    fontSize: 12,
    fontWeight: "bold",
  });
  txt.position.x = 5;
  txt.position.y = 3;

  return txt;
};

const showMouseLocation = (app: pixi.Application, renderer: pixi.Renderer) => {
  //debounce to make it easier to read
  if (Date.now() - lastUpdate > updateInterval) {
    mouse = renderer.plugins.interaction.mouse.global;
    //console.log(renderer.plugins.interaction.mouse.global);
  }
  if (typeof mouse == "undefined") {
    mouse = { x: 0, y: 0 };
    girdLocation = Point(0, 0);
  } else {
    const layout = Layout(pointyLayout, Point(30, 30), rowOffestOdd);
    girdLocation = worldPositionToGrid(
      layout,
      Point(Math.round(mouse.x), Math.round(mouse.y))
    );
  }
  const txt = new pixi.Text(
    `Mouse: ${mouse.x.toFixed(2)}, ${mouse.y.toFixed(2)}`,
    {
      fill: "#800080",
      fontSize: 12,
      fontWeight: "bold",
    }
  );
  txt.position.x = 5;
  txt.position.y = 15;

  return txt;
};

const drawGridLocation = () => {
  const txt = new pixi.Text(`Grid: ${girdLocation.x}, ${girdLocation.y} `, {
    fill: "#800080",
    fontSize: 12,
    fontWeight: "bold",
  });
  txt.position.x = 5;
  txt.position.y = 27;

  return txt;
};

export const drawDebug = (
  app: pixi.Application,
  ticker: pixi.Ticker,
  renderer: pixi.Renderer
) => {
  app.stage.addChild(background);

  app.stage.addChild(showFps(app, ticker));

  app.stage.addChild(showMouseLocation(app, renderer));

  if (girdLocation.x != -2 && girdLocation.y != -2) {
    app.stage.addChild(drawGridLocation());
  }
};

export const timeFunctionPerformance = (func: any) => {
  const start = window.performance.now();

  func();

  const end = window.performance.now();
  console.log(`Execution time: ${end - start} ms`);
};
