import typeJson from "../../../../../assets/biome/types.json";

import * as z from "zod";

const TileType = z.object({
  id: z.string(),
  color: z.string(),
});

const TypeJson = z.array(TileType);

const loadTypes = (): TileType[] => {
  return TypeJson.parse(typeJson);
};

export type TileType = z.infer<typeof TileType>;

export default loadTypes();
