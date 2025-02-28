import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/navbar";

describe("Navbar Component", () => {
  it("renders correctly with all elements", () => {
    render(<Navbar />);

    const navbarElement = screen.getByTestId("navbar");
    expect(navbarElement).toBeInTheDocument();
  });
});
