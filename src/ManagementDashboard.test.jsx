import { render, screen } from "@testing-library/react";
import ManagementDashboard from "./ManagementDashboard";

test("renders welcome message for management", () => {
  const user = { name: "Admin", role: "management" };
  render(<ManagementDashboard user={user} onLogout={() => {}} />);
  expect(screen.getByText(/Management/i)).toBeInTheDocument();
});
 