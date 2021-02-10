import { Point } from "./positions";

test("test creating a new point object", () => {
  const output = Point(123, 456);

  expect(output.x).toBe(123);
  expect(output.y).toBe(456);
});
