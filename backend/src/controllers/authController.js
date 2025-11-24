// backend/controllers/authController.js
const pool = require("../config/db");

// SIGN UP / Register
const register = async (req, res) => {
  const { username, email, passwords } = req.body;

  // Validasi input wajib
  if (!username || !email || !passwords) {
    return res.status(400).json({
      success: false,
      message: "Username, email, dan password wajib diisi.",
    });
  }

  try {
    // Cek apakah email sudah terdaftar
    const [existing] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email sudah digunakan.",
      });
    }

    // Simpan ke database (password dalam plain text untuk demo)
    await pool.execute(
      "INSERT INTO users (username, email, passwords) VALUES (?, ?, ?)",
      [username, email, passwords]
    );

    res.status(201).json({
      success: true,
      message: "Akun berhasil dibuat! Silakan login.",
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan di server.",
    });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, passwords } = req.body;

  if (!email || !passwords) {
    return res.status(400).json({
      success: false,
      message: "Email dan password wajib diisi.",
    });
  }

  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah.",
      });
    }

    const user = rows[0];

    // Bandingkan password (plain text — hanya untuk demo!)
    if (user.passwords !== passwords) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah.",
      });
    }

    // Login sukses — kembalikan info user (tanpa password)
    const { passwords: _, ...safeUser } = user;
    res.json({
      success: true,
      message: "Login berhasil.",
      user: safeUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan di server.",
    });
  }
};

module.exports = { register, login };
