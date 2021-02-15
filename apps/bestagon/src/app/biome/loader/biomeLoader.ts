import * as biomesJson from '../../../../../../libs/config/biome/biomes.json';
import * as z from 'zod';
import { BiomeTileValidator } from './biomeTileLoader';

const json = (biomesJson as any)['default'];

const BiomeConditions = z.object({
  heat: z.number(),
  temperature: z.number(),
  waterLevel: z.number(),
  fetility: z.number(),
});

const BiomeValidator = z.object({
  id: z.string(),
  name: z.string(),
  tiles: z.array(BiomeTileValidator),
  conditions: BiomeConditions,
});

export type BiomeConfig = z.infer<typeof BiomeValidator>;

const loadBiomes = (): BiomeConfig[] => {
  const biomes: BiomeConfig[] = [];

  for (const [key, value] of Object.entries(json)) {
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
// export const biomes = (biomesJson as unknown) as BiomeConfig[];
