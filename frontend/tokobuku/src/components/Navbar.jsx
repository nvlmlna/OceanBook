import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // <-- state untuk hamburger
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const isAdmin = user?.isAdmin === true;

  return (
    <nav className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="./src/assets/TL.svg"
            alt="OceanBook Logo"
            className="h-8 w-auto"
          />
          <h1 className="text-xl font-bold">OceanBook</h1>
        </div>

        {/* HAMBURGER BUTTON — MUNCUL DI MOBILE */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg hover:bg-teal-500/80 transition duration-200"
          >
            Beranda
          </Link>

          {isAdmin && (
            <Link
              to="/add"
              className="bg-amber-300 text-teal-900 font-semibold px-4 py-2 rounded-lg hover:bg-amber-200 transition duration-200 shadow-md"
            >
              + Tambah Buku
            </Link>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-white text-teal-800 font-medium rounded-lg hover:bg-gray-100 transition shadow"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-teal-700 text-white px-4 pb-4 space-y-2">
          <Link
            to="/"
            className="block px-4 py-2 rounded hover:bg-teal-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Beranda
          </Link>

          {isAdmin && (
            <Link
              to="/add"
              className="block bg-amber-300 text-teal-900 px-4 py-2 rounded hover:bg-amber-200 transition shadow-md"
              onClick={() => setMenuOpen(false)}
            >
              + Tambah Buku
            </Link>
          )}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600 rounded transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 bg-white/20 hover:bg-white/30 rounded transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 bg-white text-teal-800 rounded hover:bg-gray-100 transition shadow"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
