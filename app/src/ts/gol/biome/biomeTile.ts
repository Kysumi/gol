import { BiomeTileValidator } from "./loader/biomeTileLoader";
import * as z from "zod";

const Point = z.object({
  x: z.number(),
  y: z.number(),
});

const BiomeTileConfig = z
  .object({
    biomeId: z.number(),
    point: Point,
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
