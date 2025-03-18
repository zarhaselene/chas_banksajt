"use client";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  User,
  CreditCard,
  HelpCircle,
  LogOut,
} from "lucide-react";

export default function Navbar({ isLoggedIn, setActiveTab, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-green-800 to-green-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand name */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setActiveTab("overview")}
          >
            <span className="font-bold text-xl">ChasBank</span>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-6">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => setActiveTab("overview")}
                  className="flex items-center space-x-1 hover:text-green-200 transition duration-200"
                >
                  <Home size={18} />
                  <span>Home</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-green-200 transition duration-200"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-700 py-4 px-4">
          <div className="flex flex-col space-y-3">
            {isLoggedIn ? (
              <>
                <button
                  className="flex items-center space-x-2 hover:bg-green-600 py-2 px-3 rounded transition duration-200 text-left"
                  onClick={() => {
                    setActiveTab("overview");
                    setIsMenuOpen(false);
                  }}
                >
                  <Home size={18} />
                  <span>Home</span>
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 hover:bg-green-600 py-2 px-3 rounded transition duration-200 text-left w-full"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
}
