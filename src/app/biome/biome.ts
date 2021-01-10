import { addToGrid, getNeighbours, getFromGrid } from "../grid/grid";
import { Point } from "../grid/positions";

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

const makeNewTile = (biome: Biome, point: Point, grid: BiomeTileType[][]) => {
  const neighbours = getNeighbours(point, grid) as BiomeTileType[];
  const count = [];

  // const collection = neighbours.reduce((accu, current) => {});

  return biome.types[0];
};

export const setBiomeTileType = (
  biome: BiomeTileType[][],
  point: Point,
  data: BiomeTileType
) => {
  return addToGrid(biome, data, point.x);
};
