import types from "../config/biome/types.json";

export const getTypeById = (id) => {
  const type = types.find((type) => type.id === id);

  if (type === undefined) {
    throw new Error(`Failed to find ${id} as a type ID`);
  }

  return type;
};
