import { add, getFromGrid } from "./grid";

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

describe("getFromGrid", () => {
  test("test with empty array", () => {
    const output = getFromGrid({ x: 1, y: 1 }, []);

    expect(output).toBe(null);
  });

  test("test with array but index doesn't exist on y axis", () => {
    const output = getFromGrid({ x: 1, y: 1 }, [["a"], ["a"]]);

    expect(output).toBe(null);
  });

  test("test with valid indexes", () => {
    const output = getFromGrid({ x: 1, y: 1 }, [["a"], ["a", "a"]]);

    expect(output).toBe("a");
  });
});
