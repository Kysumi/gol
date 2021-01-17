import { Conditions, Saturation, TransferRate } from "./biome";

export interface BiomeTile {
  typeId: number;
  biomeId: number;
  currentState: Conditions;
  transferRate: TransferRate;
  saturation: Saturation;
}
