import * as typeJson from '../../../../../../libs/config/biome/types.json';
import * as z from 'zod';

const json = (typeJson as any)['default'];

const TileType = z.object({
  id: z.string(),
  color: z.string(),
});

const TypeJson = z.array(TileType);

const loadTypes = (): TileType[] => {
  return TypeJson.parse(json);
};

export type TileType = z.infer<typeof TileType>;

export default loadTypes();
