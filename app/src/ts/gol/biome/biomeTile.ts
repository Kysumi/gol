import { BiomeTileValidator } from "./loader/biomeTileLoader";
import * as z from "zod";

const BiomeTileConfig = z
  .object({
    biomeId: z.number(),
  })
  .merge(BiomeTileValidator);

export type BiomeTile = z.infer<typeof BiomeTileConfig>;

// export interface BiomeTile {
//   typeId: number;
//   biomeId: number;
//   currentState: Conditions;
//   transferRate: TransferRate;
//   saturation: Saturation;
// }
