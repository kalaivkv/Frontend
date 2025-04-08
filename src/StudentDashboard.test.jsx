 import { render, screen } from "@testing-library/react";
import StudentDashboard from "./StudentDashboard";

test("renders welcome message for student", () => {
  const user = { name: "John", role: "student", id: 1 };
  render(<StudentDashboard user={user} />);
  expect(screen.getByText(/Profile Name: Kalaivanan/i)).toBeInTheDocument();
});
 