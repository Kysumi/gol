/**
* Based on hexs6 and redblobgames
* https://github.com/scrapcupcake/hexs6/tree/master/src
*/
import { Hex } from './positions'

export const directions = [Hex(1, 0, -1), Hex(0, 1, -1), Hex(-1, 1, 0), Hex(-1, 0, 1), Hex(0, -1, 1), Hex(1, -1, 0)]
// const hex_diagonals = [Hex(2, -1, -1), Hex(1, -2, 1), Hex(-1, -1, 2), Hex(-2, 1, 1), Hex(-1, 2, -1), Hex(1, 1, -2)]

export const add = (a, b) => {
  return Hex(a.q + b.q, a.r + b.r, a.s + b.s)
}

// export const subtract = (a, b) => {
//   return Hex(a.q - b.q, a.r - b.r, a.s - b.s)
// }

// export function neighbour (hex, direction, horizontal = true) {
//   return add(hex, directions(direction, horizontal))
// }

export function getNeighbours (hex) {
  return directions.map((direction) => { return add(hex, direction) })
}
