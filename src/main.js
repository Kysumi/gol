import * as pixi from 'pixi.js'
import { getHexObject } from './app/object/hexagon'
import { gridToHexCord } from './app/helpers/gridToHexCord'
import { getRadius } from './app/config/hexConfig'
import { getOffsetX, getOffsetY, gridSize } from './app/config/grid'
import { debugTxt } from './app/object/tileDebug'
import { Layout, flatLayout } from './app/grid/layout'
import { Point } from './app/grid/positions'

const app = new pixi.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1
})

document.body.appendChild(app.view)

const layout = Layout(flatLayout, Point(30, 30))
console.log(layout)

// x, y then you do -x -y to make a hex

for (let xGrid = 1; xGrid <= gridSize; xGrid++) {
  for (let yGrid = 1; yGrid <= gridSize; yGrid++) {
    const hex = getHexObject(layout)

    const xSpaced = xGrid * getRadius() + getOffsetX()
    const ySpaced = xGrid * getRadius() + getOffsetY()

    const { x, y } = gridToHexCord(xSpaced, ySpaced)
    hex.x = x
    hex.y = y

    app.stage.addChild(hex)

    const txt = debugTxt(xGrid, yGrid)
    txt.position.x = x - 10
    txt.position.y = y - 10
    app.stage.addChild(txt)
  }
}
