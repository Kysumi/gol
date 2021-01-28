import { getHexObject, drawHexagon } from "./object/hexagon";
import { debugTxt } from "./object/tileDebug";
import { Layout, pointyLayout, gridToWorldPosition } from "./grid/layout";
import { Point } from "./grid/positions";
import { addToGrid, iterateGrid } from "./grid/grid";
import {
  setBiomeTileType,
  getBiomeTileData,
  BiomeTileType,
  Biome,
} from "./biome/biome";
import { getTypeById } from "./biome/type";
import { Application, Graphics, Renderer, Ticker } from "pixi.js";
import { BiomeTile } from "./biome/biomeTile";
import { biomes } from "./biome/loader/biomeLoader";
import * as pixi from "pixi.js";

import { drawDebug } from "./tools/debug";

interface HexTile {
  hex: Graphics;
  alive: boolean;
}

let grid: HexTile[][] = [];
let biomeGrid: BiomeTile[][] = [];
let mainApp: Application;
let ticker = Ticker.shared;

export const gol = (app: Application) => {
  //for use inside ticker
  mainApp = app;
  ticker.maxFPS = 60;
  ticker.autoStart = false;

  // register debug tools
  ticker.add(function (deltatime: number) {
    drawDebug(app, ticker, app.renderer);
  });

  const layout = Layout(pointyLayout, Point(30, 30));
  const biome = biomes[0];

  iterateGrid((point: Point) => {
    const hex = getHexObject();
    const { x, y } = gridToWorldPosition(layout, point);

    hex.x = x;
    hex.y = y;

    const isAlive = Math.floor(Math.random() * 10) < 3;

    const biomeTileData = getBiomeTileData(biomeGrid, point, biome);
    biomeGrid = setBiomeTileType(biomeGrid, point, biomeTileData);
    const tileType = getTypeById(biomeTileData.typeId);

    drawHexagon(layout, hex, tileType.color);

    app.stage.addChild(hex);

    const tileObject = {
      hex: hex,
      alive: isAlive,
    };

    grid = addToGrid(grid, tileObject, point.x);

    const txt = debugTxt(point.x, point.y);
    txt.position.x = x - 10;
    txt.position.y = y - 10;

    app.stage.addChild(txt);
  });

  ticker.start();
};

// const isAlive = (point) => {
//   const neighbours = getNeighbours(point, grid)

//   const aliveNeighbours = neighbours.filter((neighbour) => {
//     if (neighbour === null) {
//       return false
//     }

//     return neighbour.alive
//   })

//   let isAlive = true
//   if (aliveNeighbours.length < 2) {
//     isAlive = false
//   }

//   if (aliveNeighbours.length > 3) {
//     isAlive = false
//   }

//   return isAlive
// }

// setInterval(() => {
//   let newGrid = []

//   iterateGrid((point) => {
//     const { hex } = grid[point.x][point.y]
//     hex.clear()

//     const newTileObject = {
//       hex: hex,
//       alive: isAlive(point)
//     }

//     drawHexagon(layout, hex, newTileObject.alive ? 0xDF13DC : 0x334158)

//     newGrid = addToGrid(newGrid, newTileObject, point.x)
//   })

//   grid = newGrid
// }, 100)