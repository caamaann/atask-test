import { cn, formatNumberWithSuffix } from "@/lib/utils";
import { describe, it, expect } from "vitest";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");

    expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3");

    expect(cn({ class1: true, class2: false })).toBe("class1");

    expect(cn("class1", { class2: true }, ["class3"])).toBe(
      "class1 class2 class3"
    );
  });

  it("should handle empty inputs", () => {
    expect(cn()).toBe("");
    expect(cn("")).toBe("");
    expect(cn([])).toBe("");
    expect(cn({})).toBe("");
  });
});

describe("formatNumberWithSuffix utility function", () => {
  it("should format numbers less than 1000 correctly", () => {
    expect(formatNumberWithSuffix(0)).toBe("0");
    expect(formatNumberWithSuffix(999)).toBe("999");
  });

  it("should format numbers with 'k' suffix correctly", () => {
    expect(formatNumberWithSuffix(1000)).toBe("1k");
    expect(formatNumberWithSuffix(1500)).toBe("1.5k");
  });

  it("should format numbers with 'm' suffix correctly", () => {
    expect(formatNumberWithSuffix(1000000)).toBe("1m");
    expect(formatNumberWithSuffix(1500000)).toBe("1.5m");
  });

  it("should format numbers with 'b' suffix correctly", () => {
    expect(formatNumberWithSuffix(1000000000)).toBe("1b");
    expect(formatNumberWithSuffix(1500000000)).toBe("1.5b");
  });

  it("should format numbers with 't' suffix correctly", () => {
    expect(formatNumberWithSuffix(1000000000000)).toBe("1t");
    expect(formatNumberWithSuffix(1500000000000)).toBe("1.5t");
  });

  it("should handle edge cases", () => {
    expect(formatNumberWithSuffix(2000)).toBe("2k");
    expect(formatNumberWithSuffix(2000000)).toBe("2m");
  });
});
