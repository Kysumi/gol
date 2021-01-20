import * as biomesJson from "../../../../../assets/biome/biomes.json";
import * as z from "zod";
import { BiomeTileValidator, ConditionValidator } from "./biomeTileLoader";

const BiomeValidator = z.object({
  id: z.number(),
  name: z.string(),
  tiles: z.array(BiomeTileValidator),
  conditions: ConditionValidator,
});

export type BiomeConfig = z.infer<typeof BiomeValidator>;

const loadBiomes = (): BiomeConfig[] => {
  const biomes: BiomeConfig[] = [];

  for (const [key, value] of Object.entries(biomesJson["default"])) {
    try {
      const biome = BiomeValidator.parse(value);
      biomes.push(biome);
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error(err.flatten(), value);
      }
    }
  }

  return biomes;
};

export default loadBiomes();

// Quick fix till we implment propper json loading with type checking and strict enforcement on data
export const biomes = (biomesJson as unknown) as BiomeConfig[];
