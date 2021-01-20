import {
  addToGrid,
  getNeighbours,
  getFromGrid,
  iterateGrid,
} from "../grid/grid";
import { Point } from "../grid/positions";
import { BiomeTile } from "./biomeTile";
import { BiomeConfig, biomes } from "./loader/biomeLoader";
import { BiomeTileConfig } from "./loader/biomeTileLoader";
import { processMoistureChange } from "./process/moisture";

// biome id
// current type id

// types are global and shared between biomes

// biome has types that it can have
// tile belongs to biome always
// types belong to one or more biomes
// the biome is responsible for processing the tiles type and data

const getBiomeById = (id: number) => {
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
  id: number,
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

export const tick = (grid: BiomeTile[][]): BiomeTile[][] => {
  const newGrid: BiomeTile[][] = [];

  iterateGrid((point) => {
    const tile = grid[point.x][point.y];
    const biome = getBiomeById(tile.biomeId);
    const tileType = getBiomeTileTypeById(tile.typeId, biome);
    const neighbours = getNeighbours(point, grid);

    const moisture = processMoistureChange(tile, point, biome, tileType, grid);
  });

  return newGrid;
};
