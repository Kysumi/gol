import * as z from "zod";

const TransferRateValidator = z.object({
  heat: z.number(),
  water: z.number(),
  moisture: z.number(),
});

export const ConditionValidator = z.object({
  humidity: z.number(),
  temperature: z.number(),
  waterLevel: z.number(),
  fetility: z.number(),
});

const Saturation = z.object({
  heat: z.number(),
  water: z.number(),
  fetility: z.number(),
});

export const BiomeTileValidator = z.object({
  typeId: z.number(),
  conditions: ConditionValidator,
  transferRate: TransferRateValidator,
  saturation: Saturation,
});

export type BiomeTileConfig = z.infer<typeof BiomeTileValidator>;
