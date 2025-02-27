import App from "@/App";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Main Application", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeInTheDocument();
  });
});
