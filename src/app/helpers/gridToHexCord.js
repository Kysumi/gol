import { getRadius, getHeight } from '../config/hexConfig'
import { Point } from '../grid/positions'

export const gridToHexCord = (x, y) => {
  const xIdx = Math.round(x / (getRadius() * (3 / 2)))
  const newX = xIdx * (getRadius() * (3 / 2))

  let newY = Math.round(y / getHeight()) * getHeight()

  if (xIdx % 2) {
    newY = Math.floor(y / getHeight()) * getHeight() + getHeight() / 2
  }

  return Point(newX, newY)
}
