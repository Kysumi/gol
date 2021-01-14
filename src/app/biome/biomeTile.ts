import { Conditions } from "./biome";

export interface BiomeTile {
  typeId: number;
  biomeId: number;
  currentState: Conditions;
}
