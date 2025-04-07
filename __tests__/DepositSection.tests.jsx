import { render, screen, fireEvent } from "@testing-library/react";
import DepositSection from "../pages/components/DepositSection";

describe("DepositSection", () => {
  it("visar korrekt saldo", () => {
    render(
      <DepositSection
        balance={2000}
        accountError={null}
        setAccountError={() => {}}
        success={null}
        setSuccess={() => {}}
        amount=""
        setAmount={() => {}}
        accountLoading={false}
        handleDeposit={() => {}}
        setActiveTab={() => {}}
      />
    );

    expect(screen.getByText("2000 kr")).toBeInTheDocument();
  });

  it("visar felmeddelande", () => {
    render(
      <DepositSection
        balance={null}
        accountError="Insättning misslyckades"
        setAccountError={() => {}}
        success={null}
        setSuccess={() => {}}
        amount=""
        setAmount={() => {}}
        accountLoading={false}
        handleDeposit={() => {}}
        setActiveTab={() => {}}
      />
    );

    expect(screen.getByText("Insättning misslyckades")).toBeInTheDocument();
  });

  it("visar success-meddelande", () => {
    render(
      <DepositSection
        balance={null}
        accountError={null}
        setAccountError={() => {}}
        success="Insättning lyckades!"
        setSuccess={() => {}}
        amount=""
        setAmount={() => {}}
        accountLoading={false}
        handleDeposit={() => {}}
        setActiveTab={() => {}}
      />
    );

    expect(screen.getByText("Insättning lyckades!")).toBeInTheDocument();
  });

  it("uppdaterar inputfältet", () => {
    const mockSetAmount = jest.fn();

    render(
      <DepositSection
        balance={null}
        accountError={null}
        setAccountError={() => {}}
        success={null}
        setSuccess={() => {}}
        amount=""
        setAmount={mockSetAmount}
        accountLoading={false}
        handleDeposit={() => {}}
        setActiveTab={() => {}}
      />
    );

    const input = screen.getByPlaceholderText("Enter amount to deposit");
    fireEvent.change(input, { target: { value: "500" } });

    expect(mockSetAmount).toHaveBeenCalledWith("500");
  });
});
