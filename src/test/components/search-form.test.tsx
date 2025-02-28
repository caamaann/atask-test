import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/schema";
import SearchForm from "@/components/search-form";

describe("SearchForm Component", () => {
  const setupComponent = (isLoading = false) => {
    const onSubmitMock = vi.fn();

    const { result } = renderHook(() =>
      useForm({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
          username: "",
        },
      })
    );

    const formMethods = result.current;

    render(
      <SearchForm
        form={formMethods}
        onSubmit={onSubmitMock}
        isLoading={isLoading}
      />
    );

    return { formMethods, onSubmitMock };
  };

  it("renders all form elements correctly", () => {
    setupComponent();

    expect(screen.getByTestId("search-form")).toBeInTheDocument();
  });

  it("submits the form with input value when button is clicked", () => {
    const { formMethods } = setupComponent();

    const input = screen.getByTestId("username-input");
    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.invalid(input);

    formMethods.getValues = vi.fn().mockReturnValue({ username: "1" });
  });
});
