import { getRadius, getHeight } from '../config/hexConfig'

export const gridToHexCord = (x, y) => {
  const xIdx = Math.round(x / (getRadius() * (3 / 2)))
  const newX = xIdx * (getRadius() * (3 / 2))

  let newY = Math.round(y / getHeight()) * getHeight()

  if (xIdx % 2) {
    newY = Math.floor(y / getHeight()) * getHeight() + getHeight() / 2
  }

  return { xPos: newX, yPos: newY }
}

// https://www.redblobgames.com/grids/hexagons/codegen/output/lib-functions.js
// https://www.redblobgames.com/grids/hexagons/codegen/output/lib-module.js
// export class Layout {
//     constructor(orientation, size, origin) {
//         this.orientation = orientation;
//         this.size = size;
//         this.origin = origin;
//     }
//     hexToPixel(h) {
//         var M = this.orientation;
//         var size = this.size;
//         var origin = this.origin;
//         var x = (M.f0 * h.q + M.f1 * h.r) * size.x;
//         var y = (M.f2 * h.q + M.f3 * h.r) * size.y;
//         return new Point(x + origin.x, y + origin.y);
//     }
//     pixelToHex(p) {
//         var M = this.orientation;
//         var size = this.size;
//         var origin = this.origin;
//         var pt = new Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
//         var q = M.b0 * pt.x + M.b1 * pt.y;
//         var r = M.b2 * pt.x + M.b3 * pt.y;
//         return new Hex(q, r, -q - r);
//     }
//     hexCornerOffset(corner) {
//         var M = this.orientation;
//         var size = this.size;
//         var angle = 2.0 * Math.PI * (M.start_angle - corner) / 6.0;
//         return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
//     }
//     polygonCorners(h) {
//         var corners = [];
//         var center = this.hexToPixel(h);
//         for (var i = 0; i < 6; i++) {
//             var offset = this.hexCornerOffset(i);
//             corners.push(new Point(center.x + offset.x, center.y + offset.y));
//         }
//         return corners;
//     }
// }