import { describe, expect, it } from "vitest";
import { DEFAULT_BOARD_SETTINGS } from "../../statemachine/defaults";
import { BoardSettings } from "../../types/board";

describe("dataValidation/boardParsing", () => {
  it("default board should be valid", () => {
    const parsed = BoardSettings.safeParse(DEFAULT_BOARD_SETTINGS);
    if (!parsed.success) console.log(parsed.error);
    expect(parsed.success).toBe(true);
  });
});
