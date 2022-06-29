import { render, fireEvent, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import "@testing-library/jest-dom";

describe("Checkbox tests", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const button = screen.getByRole("button", { name: "Confirm order" });

  test("Initital conditions", () => {
    // Checkbox is unchecked by default
    expect(checkbox).not.toBeChecked();
    // Button is disabled by default
    expect(button).toBeDisabled();
  });

  test("Checkbox enables button on first click, and disables button on second click", () => {
    // Checking checkbox enables button
    fireEvent.click(checkbox);
    expect(button).toBeEnabled();
    // Unchecking checkbox again disables button
    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});
