import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

test("Initital conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const button = screen.getByRole("button", { name: "Confirm order" });

  expect(checkbox).not.toBeChecked();

  expect(button).toBeDisabled();
});

test("Checkbox enables button on first click, and disables button on second click", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const button = screen.getByRole("button", { name: "Confirm order" });

  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("Popover responds to hover", async () => {
  render(<SummaryForm />);

  // popover is initially hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);
  await waitFor(() => {
    expect(
      screen.getByText(/no ice cream will actually be delivered/i)
    ).toBeInTheDocument();
  });

  // popover disappears on mouseout
  userEvent.unhover(termsAndConditions);
  await waitFor(() => {
    expect(
      screen.queryByText(/no ice cream will actually be delivered/i)
    ).not.toBeInTheDocument();
  });
});
