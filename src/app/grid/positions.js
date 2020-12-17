export const Point = (x, y) => {
  return { x: x, y: y }
}

/**
 * Hex position object
 *
 * @param  {number} q Column in the grid.
 * @param  {number} r Row in the grid.
 * @param  {number} s Unsure at the moment
 *
 * @return {[type]}   [description]
 */
export const Hex = (q, r, s) => {
  if (Math.round(q + r + s) !== 0) {
    // eslint-disable-next-line no-throw-literal
    throw 'q + r + s must be 0'
  }

  return { q: q, r: r, s: s }
}
