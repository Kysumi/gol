import { addToGrid, getNeighbours, getFromGrid } from '../grid/grid'

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
  const tile = getFromGrid(point, grid)

  if (tile === null) {
    return makeNewTile(biome, point, grid)
  }

  return tile
}

const makeNewTile = (biome, point, grid) => {
  const neighbours = getNeighbours(point, grid)
  return biome.types[0]
}

export const setBiomeTileType = (biome, point) => {
  const tile = getFromGrid(point, biome)

  addToGrid(biome, tile, point.x)

  return biome
}
