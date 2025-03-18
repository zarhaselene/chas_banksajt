"use client";

export default function RegisterForm({
  registerUsername,
  setRegisterUsername,
  registerPassword,
  setRegisterPassword,
  registerError,
  isRegisterLoading,
  handleRegister,
}) {
  return (
    <div className="flex-1 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-900">
        Create Account
      </h2>

      {registerError && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {registerError}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label
            htmlFor="register-username"
            className="block text-gray-700 mb-2"
          >
            Username
          </label>
          <input
            id="register-username"
            type="text"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Choose a username"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="register-password"
            className="block text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="register-password"
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Choose a password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isRegisterLoading}
          className={`w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition duration-300 ${
            isRegisterLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isRegisterLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
