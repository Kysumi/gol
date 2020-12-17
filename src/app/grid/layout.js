import { Point } from './positions'

export const Orientation = (f0, f1, f2, f3, b0, b1, b2, b3, startAngle) => {
  return { f0: f0, f1: f1, f2: f2, f3: f3, b0: b0, b1: b1, b2: b2, b3: b3, startAngle: startAngle }
}

export const pointyLayout = Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5)
export const flatLayout = Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0)

// eslint-disable-next-line no-unused-vars
const offsets = {
  odd: -1,
  even: 1
}

export const Layout = (orientation, size) => {
  return { orientation: orientation, size: size }
}

export const XOffsetFromPoint = (offset, point) => {
  const x = point.x + Math.trunc((point.y + offset * (point.y & 1)) / 2)
  const y = point.y

  return Point(x, y)
}

export const YOffsetFromPoint = (offset, h) => {
  const col = h.x
  const row = h.y + Math.trunc((h.x + offset * (h.x & 1)) / 2)

  return Point(col, row)
}
