"use client";
import { ArrowUpCircle } from "lucide-react";

export default function AccountOverview({
  accountLoading,
  accountError,
  balance,
  loginUsername,
  setActiveTab,
  handleLogout,
  fetchAccountDetails,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      {/* Account Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Your Account</h2>
        <p className="opacity-90">
          Welcome back{" "}
          {loginUsername &&
            loginUsername.charAt(0).toUpperCase() +
              loginUsername.slice(1) +
              "!"}
        </p>
      </div>

      {/* Account Details */}
      <div className="p-6">
        {accountLoading ? (
          <div className="text-center p-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-700 border-r-transparent"></div>
            <p className="mt-2 text-gray-700">Loading account details...</p>
          </div>
        ) : accountError ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">
            <p>{accountError}</p>
            <button
              onClick={() => fetchAccountDetails(localStorage.getItem("token"))}
              className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 shadow-sm border border-green-200 mb-6">
              <div className="flex flex-col items-center md:flex-row md:justify-between">
                <div>
                  <p className="text-green-700 font-medium">
                    Available Balance
                  </p>
                  <p className="text-4xl font-bold text-green-900 mt-1">
                    {balance !== null ? `${balance} kr` : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setActiveTab("deposit")}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2"
              >
                <ArrowUpCircle size={18} />
                Deposit Money
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition duration-300"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
