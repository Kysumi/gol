// import { Biome } from "../biome";
import * as biomesJson from "../../config/biome/biomes.json";
import * as z from "zod";
import { BiomeTileValidator } from "./biomeTileLoader";

const BiomeValidator = z.object({
  id: z.number(),
  name: z.string(),
  tiles: z.array(BiomeTileValidator),
});

export type BiomeConfig = z.infer<typeof BiomeValidator>;

const BiomesJson = z.array(BiomeValidator);

const loadBiomes = (): BiomeConfig[] => {
  return BiomesJson.parse(biomesJson);
};

export default loadBiomes();

// Quick fix till we implment propper json loading with type checking and strict enforcement on data
export const biomes = (biomesJson as unknown) as BiomeConfig[];

// export const test = () => {
//   const User = t.type({
//     userId: t.number,
//     name: t.string,
//   });

//   const result = User.decode({ name: "Giulio" });

//   console.log(result);
//   console.log(PathReporter.report(result));
// };
