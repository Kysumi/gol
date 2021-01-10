import types from "../config/biome/types.json";

export interface TileType {
  id: number;
  name: string;
  color: string;
}

export const getTypeById = (id: number): TileType => {
  const type = types.find((type: TileType) => type.id === id);

  if (type === undefined) {
    throw new Error(`Failed to find ${id} as a type ID`);
  }

  return type;
};
