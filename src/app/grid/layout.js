import { Point } from './positions'
import { getRadius } from '../config/hexConfig'
import { getOffsetX, getOffsetY } from '../config/grid'

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

export const pointToPointOffset = (position) => {
  const col = position.x + (position.y - (position.y & 1)) / 2
  const row = position.y

  return Point(col, row)
}

/**
 * Based on the provided grid point this function will return
 * a point in the pixel position
 *
 * @param  {Layout} layout  The layout of the grid
 * @param  {Point}  point   The grid position
 *
 * @return {Point}  The pixel position
 */
export const gridToWorldPosition = (layout, point) => {
  let renderX = point.x * 2
  let renderY = point.y * 2

  if (renderY % 4 !== 0) {
    renderX++
  }

  renderX *= Math.sqrt(3) / 2 * getRadius()
  renderY *= (getRadius() / 4) * 3.0

  renderX += getOffsetX()
  renderY += getOffsetY()

  return Point(renderX, renderY)
}
