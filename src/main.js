import * as pixi from 'pixi.js'
import { getHexObject, drawHexagon } from './app/object/hexagon'
import { gridSize } from './app/config/grid'
import { debugTxt } from './app/object/tileDebug'
import { Layout, pointyLayout, gridToWorldPosition } from './app/grid/layout'
import { Point } from './app/grid/positions'
import { getNeighbours, addToGrid } from './app/grid/grid'

const app = new pixi.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1
})

document.body.appendChild(app.view)

const layout = Layout(pointyLayout, Point(30, 30))
let grid = []

console.log(getNeighbours(Point(2, 2)))

for (let xGrid = 1; xGrid <= gridSize; xGrid++) {
  for (let yGrid = 1; yGrid <= gridSize; yGrid++) {
    const hex = getHexObject()
    const { x, y } = gridToWorldPosition(layout, Point(xGrid, yGrid))

    hex.x = x
    hex.y = y
    drawHexagon(layout, hex, 0xDF13DC)

    app.stage.addChild(hex)

    grid = addToGrid(grid, hex, xGrid)

    const txt = debugTxt(xGrid, yGrid)
    txt.position.x = x - 10
    txt.position.y = y - 10

    app.stage.addChild(txt)
  }
}

setInterval(() => {
  for (let xGrid = 0; xGrid < gridSize; xGrid++) {
    for (let yGrid = 0; yGrid < gridSize; yGrid++) {
      const hex = grid[xGrid][yGrid]
      hex.clear()

      drawHexagon(layout, hex, 0x334158)
    }
  }
}
, 1000)

console.log(grid)
