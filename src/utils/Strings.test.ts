import Strings from "./Strings";

describe("test Strings util", () => {
  test("test Strings.format()", () => {
    expect(Strings.format("first param is {0}", 1)).toBe("first param is 1");
    expect(
      Strings.format("first param is {0}, second param is {1}", 1, "two")
    ).toBe("first param is 1, second param is two");
    expect(Strings.format("first param is {0}, second param is {1}", 1)).toBe(
      "first param is 1, second param is {1}"
    );
  });
});
