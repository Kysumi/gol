import {
  addToGrid,
  getNeighbours,
  getFromGrid,
  iterateGrid,
} from "../grid/grid";
import { Point } from "../grid/positions";
import * as biomes from "./app/config/biome/biomes.json";

// biome id
// current type id

// types are global and shared between biomes

// biome has types that it can have
// tile belongs to biome always
// types belong to one or more biomes
// the biome is responsible for processing the tiles type and data

// {
// 	tileType: 1,
// 	biome: 1,
// 	status: {
// 		moisture: 123,
// 		fertility: 1,
// 	}
// }

interface Conditions {
  humidity: number;
  temperature: number;
  waterLevel: number;
  fetility: number;
}

interface NeighbourRequirements {
  min?: number;
  max?: number;
}

interface WaterRequirements {
  distance: number;
}

export interface BiomeTileType {
  typeId: number;
  neighboursRequired: NeighbourRequirements;
  waterRequired: WaterRequirements;
  conditions: Conditions;
  biomeId: number;
}

export interface Biome {
  id: number;
  name: string;
  conditions: Conditions;
  types: BiomeTileType[];
  waterRequirements: WaterRequirements;
}

const defaultTile = {
  tileTypeId: null,
  biome: null,
  status: {
    waterLevel: 123,
    fertility: 1,
  },
};

const getBiomeById = (id: number) => {
  const biome = biomes.find((biome: Biome) => biome.id === id);
  if (biome === undefined) {
    throw new Error(`Failed to find ${id} as a biome ID`);
  }
  return biome;
};

export const getBiomeTileData = (
  grid: BiomeTileType[][],
  point: Point,
  biome: Biome
) => {
  const tile = getFromGrid(point, grid);

  if (tile === null) {
    return makeNewTile(biome, point, grid);
  }

  return tile;
};

// const updateTileConditions = (biome: Biome): Conditions => {
//   return biome.conditions;
// };

const makeNewTile = (
  biome: Biome,
  point: Point,
  grid: BiomeTileType[][]
): BiomeTileType => {
  // const neighbours = getNeighbours(point, grid) as BiomeTileType[];
  // const count = [];
  // const collection = neighbours.reduce((accu, current) => {});

  const tileTypeId = Math.floor(Math.random() * biome.types.length);
  const type = {
    ...biome.types[tileTypeId],
    biomeId: biome.id,
  };

  return type;
};

export const setBiomeTileType = (
  biome: BiomeTileType[][],
  point: Point,
  data: BiomeTileType
) => {
  return addToGrid(biome, data, point.x);
};

export const processMoistureChange = (tile: BiomeTileType, biome: Biome) => {
  return;
};

export const tick = (grid: BiomeTileType[][]): BiomeTileType[][] => {
  const newGrid: BiomeTileType[][] = [];

  iterateGrid((point) => {
    const tile = grid[point.x][point.y];
    const biome = getBiomeById(tile.biomeId);
    // (tile.conditions.waterLevel = processMoistureChange(tile));
  });

  return newGrid;
};
