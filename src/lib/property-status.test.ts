import { describe, expect, it } from "vitest";
import { getEffectivePropertyStatus } from "./property-status";

describe("getEffectivePropertyStatus", () => {
  it("returns ended when the acceptance deadline has passed", () => {
    const now = new Date("2026-10-06T12:00:00.000Z");

    expect(
      getEffectivePropertyStatus(
        "Đang nhận hồ sơ",
        "2026-10-06T11:00:00.000Z",
        now,
      ),
    ).toBe("Đã kết thúc");
  });

  it("keeps receiving status before the deadline", () => {
    const now = new Date("2026-10-06T12:00:00.000Z");

    expect(
      getEffectivePropertyStatus(
        "Đang nhận hồ sơ",
        "2026-10-06T13:00:00.000Z",
        now,
      ),
    ).toBe("Đang nhận hồ sơ");
  });

  it("does not override an already ended status", () => {
    const now = new Date("2026-10-06T12:00:00.000Z");

    expect(
      getEffectivePropertyStatus(
        "Đã kết thúc",
        "2026-10-06T11:00:00.000Z",
        now,
      ),
    ).toBe("Đã kết thúc");
  });
});
