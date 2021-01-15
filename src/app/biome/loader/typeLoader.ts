import typeJson from "../../../../assets/biome/types.json";
import { TileType } from "../type";
import * as z from "zod";

const TileType = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
});

const TypeJson = z.array(TileType);

const loadTypes = (): TileType[] => {
  return TypeJson.parse(typeJson);
};

export default loadTypes();
