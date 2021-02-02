import {
  addToGrid,
  getNeighbours,
  getFromGrid,
  iterateGrid,
  directions,
  add,
  newArrayOfSize,
} from "../grid/grid";
import { Point } from "../grid/positions";
import { timeFunctionPerformance } from "../tools/debug";
import { BiomeTile } from "./biomeTile";
import biomes, { BiomeConfig } from "./loader/biomeLoader";
import { BiomeTileConfig } from "./loader/biomeTileLoader";
import { processMoistureChange } from "./process/moisture";

// biome id
// current type id

// types are global and shared between biomes

// biome has types that it can have
// tile belongs to biome always
// types belong to one or more biomes
// the biome is responsible for processing the tiles type and data

const getBiomeById = (id: string) => {
  const biome = biomes.find((biome: BiomeConfig) => biome.id === id);
  if (biome === undefined) {
    throw new Error(`Failed to find ${id} as a biome ID`);
  }
  return biome;
};

export const getBiomeTileData = (
  grid: BiomeTile[][],
  point: Point,
  biome: BiomeConfig
): BiomeTile => {
  const tile = getFromGrid(point, grid);

  if (tile === null) {
    return makeNewTile(biome, point, grid);
  }

  return tile;
};

const makeNewTile = (
  biome: BiomeConfig,
  point: Point,
  grid: BiomeTile[][]
): BiomeTile => {
  // const neighbours = getNeighbours(point, grid) as BiomeTileType[];
  // const count = [];
  // const collection = neighbours.reduce((accu, current) => {});

  const tileTypeId = Math.floor(Math.random() * biome.tiles.length);
  const tileType = biome.tiles[tileTypeId];

  const type = {
    biomeId: biome.id,
    ...tileType,
    currentState: {
      humidity: 10,
      temperature: 10,
      waterLevel: 10,
      fetility: 10,
      moisture: 10,
      heat: 10,
    },
    point: {
      ...point,
    },
  };

  return type;
};

export const setBiomeTileType = (
  biome: BiomeTile[][],
  point: Point,
  data: BiomeTile
): BiomeTile[][] => {
  return addToGrid(biome, data, point.x);
};

const getBiomeTileTypeById = (
  id: string,
  biome: BiomeConfig
): BiomeTileConfig => {
  const tileType = biome.tiles.find(
    (tileType: BiomeTileConfig) => tileType.typeId === id
  );

  if (tileType === undefined) {
    throw new Error(`Failed to find ${id} as a biome ID`);
  }

  return tileType;
};

const getNeighourTilesFromBuffer = (
  grid: BiomeTile[][],
  buffer: BiomeTile[][],
  point: Point
): BiomeTile[] => {
  return directions.map((direction) => {
    const neighbourPoint = add(point, direction);

    const bufferTile = getFromGrid(neighbourPoint, buffer);

    if (bufferTile) {
      return bufferTile;
    }

    return getFromGrid(neighbourPoint, grid);
  });
};

const addOrUpdateBuffer = (
  tile: BiomeTile,
  buffer: BiomeTile[][]
): BiomeTile[][] => {
  const x = tile.point.x;
  const y = tile.point.y;

  const yAxis = buffer[x];

  return [
    ...buffer.slice(0, x),
    [...yAxis.slice(0, y), tile, ...yAxis.slice(y + 1)],
    ...buffer.slice(x + 1),
  ];
};

export const tick = (grid: BiomeTile[][]): BiomeTile[][] => {
  let buffer: BiomeTile[][] = newArrayOfSize();

  timeFunctionPerformance(() => {
    iterateGrid((point) => {
      const tile = getFromGrid(point, grid);
      const biome = getBiomeById(tile.biomeId);
      const neighbours = getNeighourTilesFromBuffer(grid, buffer, Point(1, 1));

      const { updatedTile, updatedNeighbours } = processMoistureChange(
        tile,
        point,
        biome,
        getBiomeTileTypeById(tile.typeId, biome),
        neighbours
      );

      buffer = addOrUpdateBuffer(updatedTile, buffer);

      updatedNeighbours.forEach((neighbour) => {
        if (neighbour == null) {
          return;
        }

        buffer = addOrUpdateBuffer(neighbour, buffer);
      });
    });
  });

  console.log(buffer);
  // const moisture = processMoistureChange(
  //   tile,
  //   Point(1, 1),
  //   biome,
  //   getBiomeTileTypeById(tile.typeId, biome),
  //   neighbours
  // );

  // iterateGrid((point) => {
  //   const tile = grid[point.x][point.y];
  //   const biome = getBiomeById(tile.biomeId);
  //   const tileType = getBiomeTileTypeById(tile.typeId, biome);
  //   const neighbours = getNeighbours(point, grid);

  //   const moisture = processMoistureChange(
  //     tile,
  //     point,
  //     biome,
  //     tileType,
  //     neighbours
  //   );
  // });

  return buffer;
};
