import {
  addToGrid,
  getNeighbours,
  getFromGrid,
  iterateGrid,
} from "../grid/grid";
import { Point } from "../grid/positions";
import { BiomeTile } from "./biomeTile";
import { biomes } from "./loader/biomeLoader";
import { processMoistureChange } from "./process/moisture";
import { getTypeById } from "./type";

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

export interface Conditions {
  humidity: number;
  temperature: number;
  waterLevel: number;
  fetility: number;
  moisture: number;
  heat: number;
}

interface NeighbourRequirements {
  min?: number;
  max?: number;
}

interface WaterRequirements {
  level: number;
  moisture: number;
}

export interface TransferRate {
  heat: number;
  water: number;
  moisture: number;
}

export interface Saturation {
  heat: number;
  water: number;
}

/**
 * Initial configuration based on the biomes rules
 *
 * If you are looking for the current state of the tile it is
 * in the BiomeTile
 */
export interface BiomeTileType {
  typeId: number;
  neighboursRequired: NeighbourRequirements;
  waterRequirements: WaterRequirements;
  conditions: Conditions;
  transferRate: TransferRate;
  saturation: Saturation;
  // biomeId: number;
}

export interface Biome {
  id: number;
  name: string;
  conditions: Conditions;
  types: BiomeTileType[];
}

const getBiomeById = (id: number) => {
  const biome = biomes.find((biome: Biome) => biome.id === id);
  if (biome === undefined) {
    throw new Error(`Failed to find ${id} as a biome ID`);
  }
  return biome;
};

export const getBiomeTileData = (
  grid: BiomeTile[][],
  point: Point,
  biome: Biome
): BiomeTile => {
  const tile = getFromGrid(point, grid);

  if (tile === null) {
    return makeNewTile(biome, point, grid);
  }

  return tile;
};

const makeNewTile = (
  biome: Biome,
  point: Point,
  grid: BiomeTile[][]
): BiomeTile => {
  // const neighbours = getNeighbours(point, grid) as BiomeTileType[];
  // const count = [];
  // const collection = neighbours.reduce((accu, current) => {});

  const tileTypeId = Math.floor(Math.random() * biome.types.length);
  const tileType = biome.types[tileTypeId];

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

const getBiomeTileTypeById = (id: number, biome: Biome): BiomeTileType => {
  const tileType = biome.types.find(
    (tileType: BiomeTileType) => tileType.typeId === id
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
