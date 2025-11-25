import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import tt from "../assets/tt.svg";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // <-- state untuk hamburger
  const navigate = useNavigate();
  const location = useLocation();

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
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null; // navbar mxnghilang
  }
  return (
    <nav className="bg-gradient-to-r from-white to-cyan-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/"
          className="flex items-center space-x-2">
          <img
            src={tt}
            alt="OceanBook Logo"
            className="h-8 w-auto"
          />
          <h1 className="text-xl text-cyan-500 font-bold">OceanBook</h1>
        </Link>

        {/* HAMBURGER BUTTON — MUNCUL DI MOBILE */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center space-x-3">
          {isAdmin && (
            <Link
              to="/add"
              className="bg-gradient-to-r from-cyan-500 to-white hover:bg-gradient-to-l from-cyan-500 to-white text-cyan-800 font-semibold px-4 py-2 rounded-lg hover:bg-white transition duration-200 shadow-md"
            >
              Tambahkan Buku
            </Link>
          )}

          {user ? (
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-white hover:bg-gradient-to-l from-cyan-500 to-white text-cyan-800 font-semibold rounded-lg transition"
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-white hover:bg-gradient-to-l from-cyan-500 to-white text-cyan-800 font-semibold rounded-lg transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-white hover:bg-gradient-to-l from-cyan-500 to-white text-cyan-800 font-semibold rounded-lg hover:bg-gray-100 transition shadow"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-white to-cyan-500 text-white shadow-lg px-4 pb-4 space-y-2">

          {isAdmin && (
            <Link
              to="/add"
              className="block bg-gradient-to-r from-cyan-500 to-white hover:bg-gradient-to-l from-cyan-500 to-white text-white font-semibold px-4 py-2 rounded transition shadow-md"
              onClick={() => setMenuOpen(false)}
            >
              Tambah Buku
            </Link>
          )}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left block bg-gradient-to-r from-cyan-500 to-white hover:bg-gradient-to-l from-cyan-500 to-white text-white font-semibold px-4 py-2 rounded transition shadow-md"
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
