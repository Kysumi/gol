import * as pixi from 'pixi.js'
import { hexagon } from './app/object/hexagon'
import { gridToHexCord } from './app/helpers/gridToHexCord'
import { getRadius } from './app/config/hexConfig'
import { getOffsetX, getOffsetY, gridSize } from './app/config/grid'
import { debugTxt } from './app/object/tileDebug'

const app = new pixi.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1
})

document.body.appendChild(app.view)

for (let xGrid = 1; xGrid <= gridSize; xGrid++) {
  for (let yGrid = 1; yGrid <= gridSize; yGrid++) {
    const hex = hexagon()

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
