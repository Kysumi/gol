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

const pushIntoTile = (target: BiomeTile, source: BiomeTile) => {
  const targetLevel = target.conditions.waterLevel;
  const sourceLevel = source.conditions.waterLevel;

  const targetResistance = target.transferRate.water;
  const sourcePower = source.transferRate.water;

  const difference = sourceLevel - targetLevel;

  const movement = difference * sourcePower * targetResistance;

  const modifiedTarget = {
    ...target,
    conditions: {
      ...target.conditions,
      waterLevel: targetLevel + movement,
    },
  };

  const modifedSource = {
    ...source,
    conditions: {
      ...source.conditions,
      waterLevel: sourceLevel - movement,
    },
  };

  return {
    target: modifiedTarget,
    source: modifedSource,
  };
};

const causeEffect = (current: BiomeTile, neighbour: BiomeTile) => {
  const currentLevel = current.conditions.waterLevel;
  const neighbourLevel = neighbour.conditions.waterLevel;

  if (neighbourLevel > currentLevel) {
    const output = pushIntoTile(current, neighbour);

    return {
      current: output.target,
      neighbour: output.source,
    };
  } else {
    const output = pushIntoTile(neighbour, current);

    return {
      current: output.source,
      neighbour: output.target,
    };
  }
};

const processWaterMovement = (tile: BiomeTile, neighbours: BiomeTile[]) => {
  let updatedTile = tile;

  const updatedNeighbours = neighbours.map((neighbour: BiomeTile) => {
    if (neighbour === null) {
      return null;
    }

    const output = causeEffect(updatedTile, neighbour);

    updatedTile = output.current;
    return output.neighbour;
  });

  return {
    updatedTile: updatedTile,
    updatedNeighbours: updatedNeighbours,
  };
};

export const processMoistureChange = (
  tile: BiomeTile,
  biome: BiomeConfig,
  tileType: BiomeTileConfig,
  neighbours: BiomeTile[]
) => {
  const { updatedTile, updatedNeighbours } = processWaterMovement(
    tile,
    neighbours
  );

  const biomeTemp = biome.conditions.heat;
  const transferRate = updatedTile.transferRate.heat;
  const currentMoisture = updatedTile.conditions.moisture;
  const currentLevel = updatedTile.conditions.waterLevel;

  const calc = biomeTemp * transferRate * currentLevel;
  const calc2 = currentLevel * currentMoisture;

  console.log(
    biomeTemp * transferRate,
    calc,
    calc2,
    updatedTile.conditions.waterLevel
  );
  updatedTile.conditions.waterLevel -= calc;

  updatedTile.conditions.moisture = calc + currentMoisture;

  return {
    updatedTile,
    updatedNeighbours,
  };
};
