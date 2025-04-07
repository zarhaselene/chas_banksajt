import { render, screen, fireEvent } from "@testing-library/react";
import RegisterForm from "../pages/components/RegisterForm";

describe("RegisterForm", () => {
  it("visar felmeddelande om det finns", () => {
    render(
      <RegisterForm
        registerUsername=""
        setRegisterUsername={() => {}}
        registerPassword=""
        setRegisterPassword={() => {}}
        registerError="Användarnamnet är upptaget"
        isRegisterLoading={false}
        handleRegister={() => {}}
      />
    );

    expect(screen.getByText("Användarnamnet är upptaget")).toBeInTheDocument();
  });

  it("uppdaterar användarnamn och lösenord", () => {
    const mockSetUsername = jest.fn();
    const mockSetPassword = jest.fn();

    render(
      <RegisterForm
        registerUsername=""
        setRegisterUsername={mockSetUsername}
        registerPassword=""
        setRegisterPassword={mockSetPassword}
        registerError={null}
        isRegisterLoading={false}
        handleRegister={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Choose a username"), {
      target: { value: "newuser" },
    });

    fireEvent.change(screen.getByPlaceholderText("Choose a password"), {
      target: { value: "secret" },
    });

    expect(mockSetUsername).toHaveBeenCalledWith("newuser");
    expect(mockSetPassword).toHaveBeenCalledWith("secret");
  });

  it("visar loading text när formuläret skickas", () => {
    render(
      <RegisterForm
        registerUsername=""
        setRegisterUsername={() => {}}
        registerPassword=""
        setRegisterPassword={() => {}}
        registerError={null}
        isRegisterLoading={true}
        handleRegister={() => {}}
      />
    );

    expect(screen.getByText("Creating Account...")).toBeInTheDocument();
  });
});
