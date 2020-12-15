import { Point, Hex } from './positions'

export const cubeToAxial = (cube) => {
  // HexAxis
  return Point(cube.q, cube.s)
}

export const axialToCube = (hex) => {
  const q = hex.q
  const s = hex.s
  const r = -q - s
  return Hex(q, r, s)
}
