"use client";

export default function LoginForm({
  loginUsername,
  setLoginUsername,
  loginPassword,
  setLoginPassword,
  loginError,
  isLoginLoading,
  handleLogin,
}) {
  return (
    <div className="flex-1 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-900">
        Login
      </h2>

      {loginError && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {loginError}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="login-username" className="block text-gray-700 mb-2">
            Username
          </label>
          <input
            id="login-username"
            type="text"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="login-password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoginLoading}
          className={`w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition duration-300 ${
            isLoginLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoginLoading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
}
