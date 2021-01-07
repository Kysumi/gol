import { addToGrid } from '../grid/grid'

// biome id
// current type id

// types are global and shared between biomes

// biome has types that it can have
// tile belongs to biome always
// types belong to one or more biomes
// the biome is responsible for processing the tiles type and data

// {
// 	tileType: 1,
// 	biome: 1,
// 	status: {
// 		moisture: 123,
// 		fertility: 1,
// 	}
// }

const defaultTile = {
  tileType: null,
  biome: null,
  status: {
    moisture: 123,
    fertility: 1
  }
}

const getTile = (biome, point) => {
  const xBiome = biome[point.x]

  if (xBiome === undefined || xBiome[point.y] === undefined) {
    return defaultTile
  }

  return xBiome[point.y]
}

export const setBiomeTileType = (biome, point) => {
  const tile = getTile(biome, point)

  addToGrid(biome, tile, point.x)

  return biome
}
