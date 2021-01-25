import { Point } from "../../grid/positions";
import { BiomeTile } from "../biomeTile";
import { BiomeConfig } from "../loader/biomeLoader";
import { BiomeTileConfig } from "../loader/biomeTileLoader";

// each tile will be preprocessed for enviroment changes as it will be working
// from top left to bottom right
// this mean only the very first tile will not have an already modified state by
// the time it gets its turn to process this
// means that it will be pulled from the old state and place into the buffer when
// it is being processed as a neighbour

const processWaterMovement = (tile: BiomeTile, neighbours: BiomeTile[]) => {
  const currentLevel = tile.conditions.waterLevel;

  const higher = neighbours.filter(
    (neighbour) => neighbour.conditions.waterLevel > currentLevel
  );
  const lower = neighbours.filter(
    (neighbour) => neighbour.conditions.waterLevel < currentLevel
  );

  const getMovement = (neighbour: BiomeTile) => {
    const level = neighbour.conditions.waterLevel;
    const force = neighbour.transferRate.water;

    const difference = level - currentLevel;

    return {
      amount: difference * force,
    };
  };

  const positiveEffect = higher.map(getMovement);
  const negativeEffect = lower.map(getMovement);
};

export const processMoistureChange = (
  tile: BiomeTile,
  point: Point,
  biome: BiomeConfig,
  tileType: BiomeTileConfig,
  neighbours: BiomeTile[]
) => {
  const moistureRate = tile.transferRate.moisture;
  const biomeTemp = biome.conditions.temperature;

  const maxWater = tileType.saturation.water;

  return;
};
