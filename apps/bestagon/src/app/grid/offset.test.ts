import { rowOffestEven, rowOffestOdd } from "./offset";

jest.mock("../config/grid", () => ({
  getOffsetX: jest.fn().mockReturnValue(12389),
  getOffsetY: jest.fn().mockReturnValue(89732),
}));

jest.mock("../config/hexConfig", () => ({
  getRadius: jest.fn().mockReturnValue(12),
}));

describe("Row offsets maths", () => {
  test("odd offset but NO offset should be applied", () => {
    const output = rowOffestOdd({ x: 12, y: 32 });

    expect(Math.round(output.x)).toBe(12638);
    expect(Math.round(output.y)).toBe(5743424);
  });

  test("odd offset but offset SHOULD be applied", () => {
    const output = rowOffestOdd({ x: 12, y: 33 });

    expect(Math.round(output.x)).toBe(12649);
    expect(Math.round(output.y)).toBe(5922906);
  });

  test("even offset but NO offset should be applied", () => {
    const output = rowOffestEven({ x: 12, y: 33 });

    expect(Math.round(output.x)).toBe(12638);
    expect(Math.round(output.y)).toBe(5922906);
  });

  test("even offset but offset SHOULD be applied", () => {
    const output = rowOffestEven({ x: 12, y: 32 });

    expect(Math.round(output.x)).toBe(12649);
    expect(Math.round(output.y)).toBe(5743424);
  });
});
