import types, { TileType } from "./loader/typeLoader";

export const getTypeById = (id: string): TileType => {
  const type = types.find((type: TileType) => type.id === id);

  if (type === undefined) {
    throw new Error(`Failed to find ${id} as a type ID`);
  }

  return type;
};
