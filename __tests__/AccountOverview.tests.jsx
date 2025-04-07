import { render, screen } from "@testing-library/react";
import AccountOverview from "../pages/components/AccountOverview";

describe("AccountOverview", () => {
  it("visar laddningsmeddelande när kontot laddas", () => {
    render(
      <AccountOverview
        accountLoading={true}
        accountError={null}
        balance={null}
        loginUsername="testuser"
        setActiveTab={() => {}}
        handleLogout={() => {}}
        fetchAccountDetails={() => {}}
      />
    );

    expect(screen.getByText("Loading account details...")).toBeInTheDocument();
  });

  it("visar felmeddelande om ett fel inträffar", () => {
    render(
      <AccountOverview
        accountLoading={false}
        accountError="Något gick fel"
        balance={null}
        loginUsername="testuser"
        setActiveTab={() => {}}
        handleLogout={() => {}}
        fetchAccountDetails={() => {}}
      />
    );

    expect(screen.getByText("Något gick fel")).toBeInTheDocument();
  });

  it("visar korrekt saldo", () => {
    render(
      <AccountOverview
        accountLoading={false}
        accountError={null}
        balance={1500}
        loginUsername="testuser"
        setActiveTab={() => {}}
        handleLogout={() => {}}
        fetchAccountDetails={() => {}}
      />
    );

    expect(screen.getByText("1500 kr")).toBeInTheDocument();
  });
});
