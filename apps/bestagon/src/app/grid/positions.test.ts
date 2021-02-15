import { add, Point } from "./positions";

test("test creating a new point object", () => {
  const output = Point(123, 456);

  expect(output.x).toBe(123);
  expect(output.y).toBe(456);
});

describe("Testing Add function", () => {
  test("test add with positive numbers", () => {
    const output = add({ x: 123, y: 456 }, { x: 123, y: 456 });

    expect(output.x).toBe(246);
    expect(output.y).toBe(912);
  });

  test("test add with mixed postive and negative numbers", () => {
    const output = add({ x: 123, y: -456 }, { x: -123, y: 456 });

    expect(output.x).toBe(0);
    expect(output.y).toBe(0);
  });
});
