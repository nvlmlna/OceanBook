import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import BG_L from "../../assets/BG_L.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, passwords: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Email atau password salah");
      }

      const isAdmin =
        email === "admin@oceanbook.com" && password === "admin123";

      const userToSave = {
        ...data.user,
        isAdmin,
      };

      localStorage.setItem("user", JSON.stringify(userToSave));

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-t from-white via-cyan-500 to-white px-4 py-6 sm:py-10 rounded-lg">
      <div
        className="w-full max-w-[1200px] bg-gradient-to-r from-cyan-100 via-cyan-700 to-cyan-900 text-white rounded-3xl 
      p-6 sm:p-10 shadow-xl 
      flex flex-col lg:flex-row gap-8 lg:gap-10"
      >
        {/* LEFT SIDE */}
        <div
          className="flex-1 flex flex-col justify-center items-center 
        border-b lg:border-b-0 lg:border-r border-white/10 
        pb-6 lg:pb-0 lg:pr-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">OceanBook</h1>

          <img
            src={BG_L}
            alt="Illustration"
            className="w-70 h-55 sm:w-64 md:w-72 lg:w-80 mb-4 rounded-2xl"
          />

          <p className="text-center text-xs sm:text-sm opacity-60">
            © 2025 PT OceanBook
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h2 className="text-center text-2xl hidden md:block sm:text-3xl font-extrabold mb-6 sm:mb-8">
            Masuk Akun OceanBook
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <label className="block mb-1 text-sm opacity-90">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-[#444] px-4 py-3 rounded-xl focus:ring-2 focus:ring-gray-500 outline-none"
              required
            />

            {/* PASSWORD */}
            <div className="relative">
              <label className="block mb-1 text-sm opacity-90">
                Kata Sandi
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[#444] px-4 py-3 rounded-xl focus:ring-2 focus:ring-gray-500 outline-none pr-12"
                required
              />

              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
              >
                {passwordVisible ? "🙈" : "👁️"}
              </button>
            </div>

            {/* LUPA PASSWORD */}
            <div className="text-right">
              <a href="#" className="text-sm text-cyan-300">
                Lupa Kata Sandi
              </a>
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-600 text-white p-3 rounded-lg text-center animate-shake fadeIn">
                {error}
              </div>
            )}

            {/* BUTTON LOGIN */}
            <button
              type="submit"
              className="w-full block bg-gradient-to-r from-cyan-500 to-white text-cyan-800 font-semibold px-4 py-2 rounded-2xl transition shadow-md"
            >
              Masuk
            </button>
          </form>

          <p className="text-center text-sm mt-6 sm:mt-8">
            Belum punya akun?{" "}
            <Link to="/register" className="text-cyan-300 hover:underline">
              Daftar
            </Link>
          </p>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        .animate-shake {
          animation: shake 0.25s ease-in-out;
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
          100% { transform: translateX(0); }
        }
        .fadeIn {
          animation: fade 0.25s ease-in-out;
        }
        @keyframes fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
