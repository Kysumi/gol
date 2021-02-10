import { flatLayout, gridToWorldPosition, isofy, Layout } from "./layout";

test("Test creating a layout", () => {
  const offset = jest.fn();
  const output = Layout(flatLayout, { x: 32, y: 32 }, offset);

  expect(output.size).toStrictEqual({ x: 32, y: 32 });
  expect(output.offset).toBe(offset);
  expect(output.orientation).toStrictEqual(flatLayout);
});

describe("Isofy math tests", () => {
  test("x and y coordinates are the same", () => {
    const point = {
      x: 220,
      y: 220,
    };

    const output = isofy(point);

    expect(output.x).toBe(0);
    expect(output.y).toBe(220);
  });

  test("x axis and y axis don't match", () => {
    const point = {
      x: 23,
      y: 42,
    };

    const output = isofy(point);

    expect(output.x).toBe(-19);
    expect(output.y).toBe(32.5);
  });

  test("gridToWorldPosition using isofy with offset applied from layout", () => {
    const offsetFunc = jest.fn().mockReturnValueOnce({ x: 52, y: 32 });

    const layout = Layout(flatLayout, { x: 32, y: 32 }, offsetFunc);
    const output = gridToWorldPosition(layout, { x: 50, y: 50 });

    expect(output.x).toBe(20);
    expect(output.y).toBe(42);
    expect(offsetFunc).toHaveBeenCalledTimes(1);
  });
});
