import { Point } from "../../grid/positions";
import { BiomeTile } from "../biomeTile";
import { BiomeConfig } from "../loader/biomeLoader";
import { BiomeTileConfig } from "../loader/biomeTileLoader";

export const processMoistureChange = (
  tile: BiomeTile,
  point: Point,
  biome: BiomeConfig,
  tileType: BiomeTileConfig,
  neighbours: BiomeTile[]
) => {
  const moistureRate = tile.transferRate.moisture;
  const biomeTemp = biome.conditions.temperature;

  return;
};
