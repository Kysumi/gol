import * as pixi from 'pixi.js'
import { getHexObject } from './app/object/hexagon'
import { getRadius } from './app/config/hexConfig'
import { getOffsetX, getOffsetY, gridSize } from './app/config/grid'
import { debugTxt } from './app/object/tileDebug'
import { Layout, pointyLayout } from './app/grid/layout'
import { Point } from './app/grid/positions'

const app = new pixi.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1
})

document.body.appendChild(app.view)

const layout = Layout(pointyLayout, Point(30, 30))

// q is columns r is row
// x, y then you do -x -y to make a hex

for (let xGrid = 1; xGrid <= gridSize; xGrid++) {
  for (let yGrid = 1; yGrid <= gridSize; yGrid++) {
    const hex = getHexObject(layout)

    // const xSpaced = xGrid * (getRadius() * 2) + getOffsetX()
    // const ySpaced = yGrid * (getRadius() * 2) + getOffsetY()

    // const { x, y } = pointToPointOffset(Point(xSpaced, ySpaced))

    let renderX = xGrid * 2
    let renderY = yGrid * 2

    if (renderY % 4 !== 0) {
      renderX++
    }

    // converts the somewhat arbitrary units into the actual display size units using the values from the image in the question
    renderX *= Math.sqrt(3) / 2 * getRadius()
    renderY *= (getRadius() / 4) * 3.0

    // 64 is added to both dimensions to shift the grid inside the window
    renderX += getOffsetX()
    renderY += getOffsetY()

    hex.x = renderX
    hex.y = renderY

    app.stage.addChild(hex)

    const txt = debugTxt(xGrid, yGrid)
    txt.position.x = renderX - 10
    txt.position.y = renderY - 10
    app.stage.addChild(txt)
  }
}
