import { Point } from '../grid/positions'
import * as pixi from 'pixi.js'

const getFillColor = () => {
  return 0xff0000
}

const getOutlineColor = () => {
  return 0x000000
}

/**
 * Taking into account both the layout and size of hexagon
 * plot the points
 *
 * @param  {Layout} layout
 * @param  {number} corner
 *
 * @return {Point}
 */
const hexCornerOffset = (layout, corner) => {
  const M = layout.orientation
  const size = layout.size

  const angle = 2.0 * Math.PI * (M.startAngle - corner) / 6.0

  return Point(size.x * Math.cos(angle), size.y * Math.sin(angle))
}

const hexagonMatrix = (layout) => {
  const corners = []

  for (let i = 0; i < 6; i++) {
    const offset = hexCornerOffset(layout, i)
    corners.push(offset.x)
    corners.push(offset.y)
  }

  return corners
}

export const getHexObject = (layout) => {
  const hexagon = new pixi.Graphics()

  hexagon.beginFill(getOutlineColor())
  hexagon.drawPolygon(hexagonMatrix(layout))
  hexagon.endFill()

  const fillLayout = { ...layout, size: Point(layout.size.x - 1.5, layout.size.y - 1.5) }
  hexagon.beginFill(getFillColor())
  hexagon.drawPolygon(hexagonMatrix(fillLayout))
  hexagon.endFill()

  return hexagon
}
