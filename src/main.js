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

for (let x = 1; x <= gridSize; x++) {
  for (let y = 1; y <= gridSize; y++) {
    const hex = hexagon()

    const xSpaced = x * getRadius() + getOffsetX()
    const ySpaced = y * getRadius() + getOffsetY()

    const { xPos, yPos } = gridToHexCord(xSpaced, ySpaced)

    hex.x = xPos
    hex.y = yPos

    app.stage.addChild(hex)

    const txt = debugTxt(x, y)
    txt.position.x = xPos - 10
    txt.position.y = yPos - 10
    app.stage.addChild(txt)
  }
}
