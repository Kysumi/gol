import { addToGrid, getFromGrid, getNeighbours } from "./grid";

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

describe("getNeighbours", () => {
  test("test with valid array", () => {
    const map = [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"],
    ];

    const output = getNeighbours({ x: 1, y: 1 }, map);
    expect(output).toStrictEqual(["a", "d", "g", "h", "i", "f", "c", "b"]);
  });

  test("test with more complex array", () => {
    const map = [
      ["a", "b", "c", "e", "f", "g", "h"],
      ["i", "j", "k", "l", "m", "n", "o"],
      ["p", "q", "r", "s", "t", "u", "v"],
      ["w", "x", "y", "z", "a", "b", "c"], // 2, 5
    ];
    const output = getNeighbours({ x: 2, y: 5 }, map);
    expect(output).toStrictEqual(["m", "t", "a", "b", "c", "v", "o", "n"]);
  });

  test("test with missing indexes", () => {
    const map = [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"],
    ];
    const output = getNeighbours({ x: 2, y: 2 }, map);
    expect(output).toStrictEqual(["e", "h", null, null, null, null, null, "f"]);
  });

  test("test with null array", () => {
    const map: number[] = [];
    const output = getNeighbours({ x: 2, y: 2 }, map);

    expect(output).toStrictEqual([
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
  });
});

describe("addToGrid", () => {
  test("test with empty array", () => {
    expect(() => addToGrid([], "b", { x: 20, y: 1 })).toThrow(
      "Failed to insert object into array at point 20, 1"
    );
  });

  test("test with valid array", () => {
    const output = addToGrid(
      [
        ["a", "d", "c", "d"],
        ["e", "f", "g", "h"],
        ["i", "j", "k", "l"],
      ],
      12312,
      { x: 1, y: 3 }
    );

    expect(output).toStrictEqual([
      ["a", "d", "c", "d"],
      ["e", "f", "g", 12312],
      ["i", "j", "k", "l"],
    ]);
  });
});
