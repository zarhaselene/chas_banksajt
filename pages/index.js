"use client";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import AccountOverview from "./components/AccountOverview";
import DepositSection from "./components/DepositSection";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export default function HomePage() {
  // Login form state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(null);
  const [accountLoading, setAccountLoading] = useState(false);
  const [accountError, setAccountError] = useState("");

  // Register form state
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  // Account deposit state
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Check if user is logged in on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setLoginUsername(storedUsername);
    }

    if (token) {
      setIsLoggedIn(true);
      fetchAccountDetails(token);
    }
  }, []);

  // Fetch account details
  const fetchAccountDetails = async (token) => {
    try {
      const response = await fetch("http://localhost:3001/me/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setBalance(data.amount ?? "N/A");
      } else {
        setAccountError(data.error || "Failed to fetch account details");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setAccountError("Network error occurred");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setBalance(null);
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoginLoading(true);

    if (!loginUsername || !loginPassword) {
      setLoginError("Username and password are required");
      setIsLoginLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", loginUsername);

      setIsLoggedIn(true);
      fetchAccountDetails(data.token);
    } catch (error) {
      setLoginError(
        error.message || "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoginLoading(false);
    }
  };

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegisterLoading(true);
    setRegisterError("");

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Auto-fill login form with registered info
      setLoginUsername(registerUsername);
      setLoginPassword(registerPassword);
      setRegisterUsername("");
      setRegisterPassword("");

      alert("Account created successfully! You can now log in.");
    } catch (error) {
      setRegisterError(error.message);
    } finally {
      setIsRegisterLoading(false);
    }
  };

  // Deposit
  const handleDeposit = async (e) => {
    e.preventDefault();
    setAccountLoading(true);
    setAccountError("");

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:3001/me/accounts/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, amount: parseFloat(amount) }), // Ensure amount is a number
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Deposit successful!");
        fetchAccountDetails(token); // Refresh balance
        setAmount("");
      } else {
        setAccountError(data.error || "Failed to deposit money");
      }
    } catch (err) {
      setAccountError("Network error");
    } finally {
      setAccountLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-50 to-green-100">
      <Navbar
        isLoggedIn={isLoggedIn}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />

      <div className="flex-grow w-full py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-green-900 mb-8">
            Welcome to ChasBank!
          </h1>
          {isLoggedIn ? (
            activeTab === "overview" ? (
              <AccountOverview
                accountLoading={accountLoading}
                accountError={accountError}
                balance={balance}
                loginUsername={loginUsername}
                setActiveTab={setActiveTab}
                handleLogout={handleLogout}
                fetchAccountDetails={fetchAccountDetails}
              />
            ) : (
              <DepositSection
                balance={balance}
                accountError={accountError}
                setAccountError={setAccountError}
                success={success}
                setSuccess={setSuccess}
                amount={amount}
                setAmount={setAmount}
                accountLoading={accountLoading}
                handleDeposit={handleDeposit}
                setActiveTab={setActiveTab}
              />
            )
          ) : (
            <>
              <p className="text-lg text-center text-green-700 mb-12 max-w-3xl mx-auto">
                Already a member? Log in to access your account.
              </p>

              <div className="flex flex-col md:flex-row gap-8 items-stretch">
                {/* Register Form */}
                <RegisterForm
                  registerUsername={registerUsername}
                  setRegisterUsername={setRegisterUsername}
                  registerPassword={registerPassword}
                  setRegisterPassword={setRegisterPassword}
                  registerError={registerError}
                  isRegisterLoading={isRegisterLoading}
                  handleRegister={handleRegister}
                />

                {/* Login Form */}
                <LoginForm
                  loginUsername={loginUsername}
                  setLoginUsername={setLoginUsername}
                  loginPassword={loginPassword}
                  setLoginPassword={setLoginPassword}
                  loginError={loginError}
                  isLoginLoading={isLoginLoading}
                  handleLogin={handleLogin}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
