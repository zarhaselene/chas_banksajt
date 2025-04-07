import { render, screen } from "@testing-library/react";
import Navbar from "../pages/components/Navbar";

describe("Navbar", () => {
  it("visar 'Logout' om användaren är inloggad", () => {
    render(
      <Navbar
        isLoggedIn={true}
        setActiveTab={() => {}}
        handleLogout={() => {}}
      />
    );

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("visar inte 'Logout' om användaren inte är inloggad", () => {
    render(
      <Navbar
        isLoggedIn={false}
        setActiveTab={() => {}}
        handleLogout={() => {}}
      />
    );

    expect(screen.queryByText("Logout")).toBeNull();
  });
});
