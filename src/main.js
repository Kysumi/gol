import * as pixi from 'pixi.js'
import { getHexObject } from './app/object/hexagon'
import { gridSize } from './app/config/grid'
import { debugTxt } from './app/object/tileDebug'
import { Layout, pointyLayout, gridToWorldPosition } from './app/grid/layout'
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
    const { x, y } = gridToWorldPosition(layout, Point(xGrid, yGrid))

    hex.x = x
    hex.y = y
    app.stage.addChild(hex)

    const txt = debugTxt(xGrid, yGrid)
    txt.position.x = x - 10
    txt.position.y = y - 10

    app.stage.addChild(txt)
  }
}
