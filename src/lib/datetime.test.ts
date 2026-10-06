import { describe, expect, it } from "vitest";
import { toDateTimeLocalValue, toUtcIsoDateTime } from "./utils";

describe("datetime conversion", () => {
  it("converts a local datetime input to UTC ISO", () => {
    const localValue = "2026-10-06T09:30";
    expect(toUtcIsoDateTime(localValue)).toBe(new Date(localValue).toISOString());
  });

  it("round-trips a UTC timestamp through the local datetime input", () => {
    const utcValue = "2026-10-06T02:30:00.000Z";
    const localValue = toDateTimeLocalValue(utcValue);

    expect(toUtcIsoDateTime(localValue)).toBe(utcValue);
  });
});
