import { describe, it, expect } from "vitest";
import httpRequest from "../../lib/httpRequest";
import { API_URL, TOKEN } from "@/lib/constants";

describe("httpRequest", () => {
  it("should have the correct baseURL", () => {
    expect(httpRequest.defaults.baseURL).toBe(API_URL);
  });

  it("should have the correct headers", () => {
    expect(httpRequest.defaults.headers["Authorization"]).toBe(
      `token ${TOKEN}`
    );
    expect(httpRequest.defaults.headers["Content-Type"]).toBe(
      "application/json"
    );
  });
});
