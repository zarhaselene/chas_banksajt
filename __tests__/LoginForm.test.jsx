import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../pages/components/LoginForm";

describe("LoginForm", () => {
  it("visar felmeddelande om det finns", () => {
    render(
      <LoginForm
        loginUsername=""
        setLoginUsername={() => {}}
        loginPassword=""
        setLoginPassword={() => {}}
        loginError="Fel användarnamn eller lösenord"
        isLoginLoading={false}
        handleLogin={() => {}}
      />
    );

    expect(
      screen.getByText("Fel användarnamn eller lösenord")
    ).toBeInTheDocument();
  });

  it("uppdaterar inmatade fält", () => {
    const mockSetUsername = jest.fn();
    const mockSetPassword = jest.fn();

    render(
      <LoginForm
        loginUsername=""
        setLoginUsername={mockSetUsername}
        loginPassword=""
        setLoginPassword={mockSetPassword}
        loginError={null}
        isLoginLoading={false}
        handleLogin={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "testuser" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "hemligt" },
    });

    expect(mockSetUsername).toHaveBeenCalledWith("testuser");
    expect(mockSetPassword).toHaveBeenCalledWith("hemligt");
  });

  it("visar loading text vid inloggning", () => {
    render(
      <LoginForm
        loginUsername=""
        setLoginUsername={() => {}}
        loginPassword=""
        setLoginPassword={() => {}}
        loginError={null}
        isLoginLoading={true}
        handleLogin={() => {}}
      />
    );

    expect(screen.getByText("Logging In...")).toBeInTheDocument();
  });
});
