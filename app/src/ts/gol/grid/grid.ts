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

export const addToGrid = (grid: any[], object: any, point: Point) => {
  const x = point.x;
  const y = point.y;

  const yAxis = grid[x];

  if (grid.length < x || yAxis === null) {
    throw new Error(
      `Failed to insert object into array at point ${point.x}, ${point.y}`
    );
  }

  return [
    ...grid.slice(0, x),
    [...yAxis.slice(0, y), object, ...yAxis.slice(y + 1)],
    ...grid.slice(x + 1),
  ];
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
