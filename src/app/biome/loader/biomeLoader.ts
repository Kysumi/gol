import { Biome } from "../biome";
import * as biomesJson from "../../config/biome/biomes.json";

// Quick fix till we implment propper json loading with type checking and strict enforcement on data
export const biomes = (biomesJson as unknown) as Biome[];

// export const test = () => {
//   const User = t.type({
//     userId: t.number,
//     name: t.string,
//   });

//   const result = User.decode({ name: "Giulio" });

//   console.log(result);
//   console.log(PathReporter.report(result));
// };
