import { Hex, Point } from './positionss'

export const pointyLayout = Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5)
export const flatLayout = Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0)

export function Orientation (f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
  return { f0: f0, f1: f1, f2: f2, f3: f3, b0: b0, b1: b1, b2: b2, b3: b3, start_angle: start_angle }
}

export function Layout (orientation, size, origin) {
  return { orientation: orientation, size: size, origin: origin }
}

export function hex_to_pixel (layout, h) {
  const M = layout.orientation
  const size = layout.size
  const origin = layout.origin
  const x = (M.f0 * h.q + M.f1 * h.r) * size.x
  const y = (M.f2 * h.q + M.f3 * h.r) * size.y

  return Point(x + origin.x, y + origin.y)
}

export function pixel_to_hex (layout, p) {
  const M = layout.orientation
  const size = layout.size
  const origin = layout.origin
  const pt = Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y)
  const q = M.b0 * pt.x + M.b1 * pt.y
  const r = M.b2 * pt.x + M.b3 * pt.y

  return Hex(q, r, -q - r)
}
