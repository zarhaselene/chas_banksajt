"use client";
import { ArrowUpCircle } from "lucide-react";

export default function DepositSection({
  balance,
  accountError,
  setAccountError,
  success,
  setSuccess,
  amount,
  setAmount,
  accountLoading,
  handleDeposit,
  setActiveTab,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Deposit Funds</h1>
        <p className="opacity-90">Add money to your account securely</p>
      </div>

      {/* Balance card */}
      <div className="p-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 shadow-sm border border-green-200">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div>
              <p className="text-green-700 font-medium">Available Balance</p>
              <p className="text-4xl font-bold text-green-900 mt-1">
                {balance !== null ? `${balance} kr` : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-900">
            Deposit Money
          </h2>

          {accountError && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4 flex items-start">
              <div className="flex-1">{accountError}</div>
              <button
                onClick={() => setAccountError("")}
                className="text-red-700 hover:text-red-900"
              >
                ×
              </button>
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4 flex items-start">
              <div className="flex-1">{success}</div>
              <button
                onClick={() => setSuccess("")}
                className="text-green-700 hover:text-green-900"
              >
                ×
              </button>
            </div>
          )}

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <form onSubmit={handleDeposit}>
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  Amount (kr)
                </label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter amount to deposit"
                  min="0"
                  step="0.01"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter the amount you want to deposit into your account
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={accountLoading}
                  className={`flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2 ${
                    accountLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {accountLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <ArrowUpCircle size={18} />
                      Deposit Funds
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition duration-300"
                >
                  Back to Overview
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
