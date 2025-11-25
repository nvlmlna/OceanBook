# Toko Buku

OceanBook adalah web bookstore sederhana dengan fitur autentikasi, manajemen buku, dan keranjang belanja. Dibangun menggunakan React (frontend) dan Express + MySQL (backend).
Website ini dibuat untuk memudahkan pengguna dalam melihat katalog buku, membeli buku, mengelola keranjang, serta menyediakan halaman admin untuk menambah data buku.

## Fitur Utama

🔐 1. Autentikasi User

- Register
- Login
- Logout
- Validasi akses untuk fitur tertentu

📚 2. Manajemen Buku

- Melihat daftar buku
- Melihat detail buku
- Admin dapat menambahkan buku

🛒 3. Keranjang Belanja

- Menambahkan buku ke keranjang
- Halaman khusus /cart
- Hanya bisa digunakan jika user sudah login

🖥️ 4. Role Admin

- Admin dapat menambah buku baru
- Tampilannya sedikit berbeda dari user biasa

🎨 5. UI Modern

- Navbar responsif dengan menu hamburger
- Tema gradasi biru laut (teal/cyan)
- Tampilan bersih dan mobile-friendly

## ⚙️ Tech Stack

Frontend

- React + Vite
- TailwindCSS
- React Router DOM

Backend

- Node.js
- Express.js
- MySQL

Database

- phpMyAdmin / MySQL lokal
