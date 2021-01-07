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

for (let xGrid = 0; xGrid < gridSize; xGrid++) {
  for (let yGrid = 0; yGrid < gridSize; yGrid++) {
    const hex = getHexObject()
    const { x, y } = gridToWorldPosition(layout, Point(xGrid, yGrid))

    hex.x = x
    hex.y = y

    const isAlive = Math.floor(Math.random() * 10) < 3

    drawHexagon(layout, hex, isAlive ? 0xDF13DC : 0x334158)

    app.stage.addChild(hex)

    const tileObject = {
      hex: hex,
      alive: isAlive
    }

    grid = addToGrid(grid, tileObject, xGrid)

    const txt = debugTxt(xGrid, yGrid)
    txt.position.x = x - 10
    txt.position.y = y - 10

    app.stage.addChild(txt)
  }
}

const isAlive = (point) => {
  const neighbours = getNeighbours(point, grid)

  const aliveNeighbours = neighbours.filter((neighbour) => {
    if (neighbour === null) {
      return false
    }

    return neighbour.alive
  })

  let isAlive = true
  if (aliveNeighbours.length < 2) {
    isAlive = false
  }

  if (aliveNeighbours.length > 3) {
    isAlive = false
  }

  return isAlive
}

setInterval(() => {
  let newGrid = []

  for (let xGrid = 0; xGrid < gridSize; xGrid++) {
    for (let yGrid = 0; yGrid < gridSize; yGrid++) {
      const { hex } = grid[xGrid][yGrid]
      hex.clear()

      const newTileObject = {
        hex: hex,
        alive: isAlive(Point(xGrid, yGrid))
      }

      drawHexagon(layout, hex, newTileObject.alive ? 0xDF13DC : 0x334158)

      newGrid = addToGrid(newGrid, newTileObject, xGrid)
    }
  }
  console.log('Cylce complete')
  grid = newGrid
}
, 1000)
