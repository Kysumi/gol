import * as pixi from 'pixi.js'
import { getHexObject, drawHexagon } from './app/object/hexagon'
import { debugTxt } from './app/object/tileDebug'
import { Layout, pointyLayout, gridToWorldPosition } from './app/grid/layout'
import { Point } from './app/grid/positions'
import { getNeighbours, addToGrid, iterateGrid } from './app/grid/grid'

const app = new pixi.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1
})

document.body.appendChild(app.view)

const layout = Layout(pointyLayout, Point(30, 30))
let grid = []

iterateGrid((point) => {
  const hex = getHexObject()
  const { x, y } = gridToWorldPosition(layout, point)

  hex.x = x
  hex.y = y

  const isAlive = Math.floor(Math.random() * 10) < 3

  drawHexagon(layout, hex, isAlive ? 0xDF13DC : 0x334158)

  app.stage.addChild(hex)

  const tileObject = {
    hex: hex,
    alive: isAlive
  }

  grid = addToGrid(grid, tileObject, point.x)

  const txt = debugTxt(point.x, point.y)
  txt.position.x = x - 10
  txt.position.y = y - 10

  app.stage.addChild(txt)
})

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

  iterateGrid((point) => {
    const { hex } = grid[point.x][point.y]
    hex.clear()

    const newTileObject = {
      hex: hex,
      alive: isAlive(point)
    }

    drawHexagon(layout, hex, newTileObject.alive ? 0xDF13DC : 0x334158)

    newGrid = addToGrid(newGrid, newTileObject, point.x)
  })

  grid = newGrid
}
, 1000)
