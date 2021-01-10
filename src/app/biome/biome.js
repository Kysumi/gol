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
  tileTypeId: null,
  biome: null,
  status: {
    waterLevel: 123,
    fertility: 1
  }
}

export const getBiomeTileData = (grid, point, biome) => {
  const tile = getTile(grid, point)

  if (tile === null) {
    return makeNewTile(biome)
  }

  return tile
}

const makeNewTile = (biome) => {
  return biome.types[0]
}

const getTile = (grid, point) => {
  const xBiome = grid[point.x]

  if (xBiome === undefined || xBiome[point.y] === undefined) {
    return null
  }

  return xBiome[point.y]
}

export const setBiomeTileType = (biome, point) => {
  const tile = getTile(biome, point)

  addToGrid(biome, tile, point.x)

  return biome
}
