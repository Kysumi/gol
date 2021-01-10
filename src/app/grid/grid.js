import { Point } from './positions'
import { gridSize } from '../config/grid'
// export const directions = [Hex(1, 0, -1), Hex(0, 1, -1), Hex(-1, 1, 0), Hex(-1, 0, 1), Hex(0, -1, 1), Hex(1, -1, 0)]
// const hex_diagonals = [Hex(2, -1, -1), Hex(1, -2, 1), Hex(-1, -1, 2), Hex(-2, 1, 1), Hex(-1, 2, -1), Hex(1, 1, -2)]

export const add = (a, b) => {
  return Point(a.x + b.x, a.y + b.y)
}

export const directions = [Point(-1, -1), Point(0, -1), Point(1, 0), Point(0, 1), Point(-1, 1), Point(-1, 0)]

export const getFromGrid = (point, grid) => {
  const slice = grid[point.x]

  if (slice === undefined || slice[point.y] === undefined) {
    return null
  }

  return slice[point.y]
}

export const getNeighbours = (point, grid) => {
  return directions.map((direction) => {
    const position = add(point, direction)
    if (position.x < 0 || position.x >= grid.length) {
      return null
    }
    if (position.y < 0 || position.y >= grid.length) {
      return null
    }

    return getFromGrid(point, grid)
  })
}

export const addToGrid = (grid, hex, xPosition) => {
  const newGrid = grid

  if (xPosition > newGrid.length || xPosition === 0) {
    newGrid.push([])
  }

  newGrid[xPosition].push(hex)

  return newGrid
}

export const iterateGrid = (callback) => {
  for (let xGrid = 0; xGrid < gridSize; xGrid++) {
    for (let yGrid = 0; yGrid < gridSize; yGrid++) {
      callback(Point(xGrid, yGrid))
    }
  }
}
