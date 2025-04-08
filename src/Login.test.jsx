import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

test("renders login form with inputs and button", () => {
  render(<Login onLogin={jest.fn()} />);

  expect(screen.getByLabelText(/Email \/ Student ID/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
});

test("login fails with empty inputs", () => {
  render(<Login onLogin={jest.fn()} />);
  fireEvent.click(screen.getByRole("button", { name: /login/i }));
  expect(screen.getByText(/Login failed/i)).toBeInTheDocument();
});
 