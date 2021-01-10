import { getHexObject, drawHexagon } from "./app/object/hexagon";
import { debugTxt } from "./app/object/tileDebug";
import { Layout, pointyLayout, gridToWorldPosition } from "./app/grid/layout";
import { Point } from "./app/grid/positions";
import { addToGrid, iterateGrid } from "./app/grid/grid";
import {
  setBiomeTileType,
  getBiomeTileData,
  BiomeTileType,
} from "./app/biome/biome";
import * as biomes from "./app/config/biome/biomes.json";
import { getTypeById } from "./app/biome/type";
import { Application, Graphics } from "pixi.js";

interface HexTile {
  hex: Graphics;
  alive: boolean;
}

let grid: HexTile[][] = [];
let biomeGrid: BiomeTileType[][] = [];

export const gol = (app: Application) => {
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

  console.log(biomeGrid);
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
