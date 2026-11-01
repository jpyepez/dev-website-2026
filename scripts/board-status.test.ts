import { describe, expect, test } from "bun:test";
import { findOption, parseArgs, USAGE } from "./board-status";

const options = [
  { id: "f75ad846", name: "Inbox" },
  { id: "fb0b00b5", name: "Ready" },
  { id: "47fc9ee4", name: "In progress" },
  { id: "98236657", name: "Done" },
];

describe("findOption", () => {
  test("finds a column by its exact name", () => {
    expect(findOption(options, "In progress")).toEqual({ id: "47fc9ee4", name: "In progress" });
  });

  test("ignores case and surrounding spaces in the name", () => {
    expect(findOption(options, " in PROGRESS ")).toEqual({ id: "47fc9ee4", name: "In progress" });
  });

  test("rejects a column the board doesn't have, listing the ones it does", () => {
    expect(() => findOption(options, "HITL")).toThrow(
      'No column named "HITL" on the board. Valid columns: Inbox, Ready, In progress, Done.',
    );
  });
});

describe("parseArgs", () => {
  test("reads the issue number and a column name, quoted or not", () => {
    expect(parseArgs(["29", "In progress"])).toEqual({ issue: 29, column: "In progress" });
    expect(parseArgs(["29", "In", "progress"])).toEqual({ issue: 29, column: "In progress" });
  });

  test.each([[[]], [["29"]], [["abc", "Ready"]], [["0", "Ready"]], [["2.5", "Ready"]], [["29", " "]]])(
    "rejects %p with the usage message",
    (args) => {
      expect(() => parseArgs(args)).toThrow(USAGE);
    },
  );
});
