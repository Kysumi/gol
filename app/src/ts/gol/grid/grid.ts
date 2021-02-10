import { Point } from "./positions";
import { gridSize } from "../config/grid";

export const add = (a: Point, b: Point) => {
  return Point(a.x + b.x, a.y + b.y);
};

export const directions = [
  Point(-1, -1),
  Point(0, -1),
  Point(1, -1),
  Point(1, 0),
  Point(1, 1),
  Point(0, 1),
  Point(-1, 1),
  Point(-1, 0),
];

export const getFromGrid = (point: Point, grid: any): any | null => {
  const slice = grid[point.x];

  if (slice === undefined || slice[point.y] === undefined) {
    return null;
  }

  return slice[point.y];
};

export const getNeighbours = (point: Point, grid: any) => {
  return directions.map((direction) => {
    const position = add(point, direction);

    if (position.x < 0 || position.x >= grid.length) {
      return null;
    }

    return getFromGrid(position, grid);
  });
};

export const addToGrid = (grid: any, object: any, xPosition: number) => {
  const newGrid = grid;

  if (xPosition > newGrid.length || xPosition === 0) {
    newGrid.push([]);
  }

  newGrid[xPosition].push(object);

  return newGrid;
};

export const iterateGrid = (callback: (point: Point) => void) => {
  for (let xGrid = 0; xGrid < gridSize; xGrid++) {
    for (let yGrid = 0; yGrid < gridSize; yGrid++) {
      callback(Point(xGrid, yGrid));
    }
  }
};

export const newArrayOfSize = () => {
  return new Array(gridSize)
    .fill(null)
    .map(() => new Array(gridSize).fill(null));
};
