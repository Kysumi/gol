import { Point } from './positions'
// export const directions = [Hex(1, 0, -1), Hex(0, 1, -1), Hex(-1, 1, 0), Hex(-1, 0, 1), Hex(0, -1, 1), Hex(1, -1, 0)]
// const hex_diagonals = [Hex(2, -1, -1), Hex(1, -2, 1), Hex(-1, -1, 2), Hex(-2, 1, 1), Hex(-1, 2, -1), Hex(1, 1, -2)]

export const add = (a, b) => {
  return Point(a.x + b.x, a.y + b.y)
}

export const directions = [Point(-1, -1), Point(0, -1), Point(1, 0), Point(0, 1), Point(-1, 1), Point(-1, 0)]

export const getNeighbours = (hex) => {
  return directions.map((direction) => { return add(hex, direction) })
}

export const addToGrid = (grid, hex, xPosition) => {
  const newGrid = grid

  if (xPosition > newGrid.length) {
    newGrid.push([])
  }

  newGrid[xPosition - 1].push(hex)

  return newGrid
}
