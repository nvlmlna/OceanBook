import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Swal from "sweetalert2";
import BG_L from "../../assets/BG_L.png";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!username || !email || !password) {
      setError("Semua field wajib diisi.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        passwords: password,
      });

      Swal.fire({
        title: "Pendaftaran Berhasil!",
        text: "Silakan login dengan akun Anda.",
        icon: "success",
        confirmButtonColor: "#33cfeb",
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      Swal.fire({
        title: "Pendaftaran Gagal!",
        text: err.response?.data?.message || "Terjadi kesalahan.",
        icon: "error",
        confirmButtonColor: "#33cfeb",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center 
    bg-gradient-to-t from-white via-cyan-500 to-white 
    px-4 py-6 sm:py-10">

      <div className="w-full max-w-[1200px] shadow-xl 
      bg-gradient-to-r from-cyan-100 via-cyan-700 to-cyan-900 text-white 
      rounded-3xl p-6 sm:p-10 
      flex flex-col lg:flex-row 
      gap-8 lg:gap-10">

        {/* LEFT IMAGE */}
        <div className="flex-1 flex flex-col justify-center items-center 
        border-b lg:border-b-0 lg:border-r border-white/10 
        pb-6 lg:pb-0 lg:pr-8">

          <h1 className="text-2xl sm:text-3xl font-extrabold mb-4">OceanBook</h1>

          <img
            src={BG_L}
            alt="Illustration"
            className="w-70 h-55 sm:w-64 md:w-72 lg:w-80 mb-4 rounded-2xl"
          />

          <p className="text-center text-xs sm:text-sm opacity-80">
            © 2025 PT OceanBook
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="flex-1 flex flex-col justify-center lg:pl-10">
          <h2 className="text-2xl sm:text-3xl hidden lg:block font-extrabold mb-6 sm:mb-8 text-center">
            Daftar Akun OceanBook
          </h2>

          {error && (
            <div className="flex items-center gap-3 bg-red-500/20 border border-red-400 text-red-300 p-4 rounded-xl mb-5 animate-shake">
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block mb-1 text-sm opacity-90">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#ffffff] text-black border border-[#444] px-4 py-3 rounded-xl focus:ring-2 focus:ring-gray-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm opacity-90">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#ffffff] text-black border border-[#444] px-4 py-3 rounded-xl focus:ring-2 focus:ring-gray-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm opacity-90">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-black bg-[#ffffff] border border-[#444] px-4 py-3 rounded-xl focus:ring-2 focus:ring-gray-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full block bg-gradient-to-r from-cyan-500 to-white 
              text-cyan-800 font-semibold px-4 py-2 rounded-2xl 
              hover:bg-gradient-to-l from-cyan-500 to-white 
              transition shadow-md"
            >
              {loading ? "Mendaftar..." : "Daftar"}
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-300 hover:underline">
              Masuk
            </a>
          </p>
        </div>
      </div>

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
      `}</style>
    </div>
  );
}
