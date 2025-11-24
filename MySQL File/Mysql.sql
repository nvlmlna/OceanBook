-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 24 Nov 2025 pada 05.29
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bukudb`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `daftarbuku`
--

CREATE TABLE `daftarbuku` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `daftarbuku`
--

INSERT INTO `daftarbuku` (`id`, `title`, `author`, `category`, `price`, `stock`, `description`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Laskar Pelangi', 'Andrea Hirata', 'Novel', 85000, 19, 'Kisah persahabatan dan perjuangan anak-anak Belitong.', 'laskar_pelangi.jpg', '2025-11-21 13:10:25', '2025-11-24 04:17:03'),
(2, 'Atomic Habits', 'James Clear', 'Self-Improvement', 120000, 20, 'Panduan membuat kebiasaan kecil yang berdampak besar.', 'atomic_habits.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(3, 'Dilan 1990', 'Pidi Baiq', 'Romance', 60000, 15, 'Romansa remaja antara Dilan dan Milea.', 'dilan_1990.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(4, 'Clean Code', 'Robert C. Martin', 'Programming', 250000, 8, 'Prinsip menulis kode yang rapi dan mudah dipahami.', 'clean_code.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(5, 'The Psychology of Money', 'Morgan Housel', 'Finance', 110000, 10, 'Pelajaran tentang perilaku manusia terhadap uang.', 'psychology_of_money.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(6, 'Filosofi Teras', 'Henry Manampiring', 'Self-Improvement', 90000, 25, 'Pengenalan filsafat Stoisisme untuk kehidupan modern.', 'filosofi_teras.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(7, 'Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 'Fantasy', 150000, 18, 'Petualangan Harry Potter tahun pertama di Hogwarts.', 'hp1.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(8, 'Bumi Manusia', 'Pramoedya Ananta Toer', 'Sejarah', 95000, 10, 'Kisah Minke dan perjuangan di masa kolonial.', 'bumi_manusia.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(9, 'Rich Dad Poor Dad', 'Robert Kiyosaki', 'Finance', 130000, 22, 'Pelajaran finansial berdasarkan pengalaman pribadi.', 'richdad_poordad.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(10, 'To Kill a Mockingbird', 'Harper Lee', 'Classic', 140000, 7, 'Novel klasik tentang keadilan dan moralitas.', 'mockingbird.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(11, 'Cantik Itu Luka', 'Eka Kurniawan', 'Novel', 85000, 14, 'Cerita magis dan tragis penuh satire sosial.', 'cantik_itu_luka.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(12, 'The Subtle Art of Not Giving a F*ck', 'Mark Manson', 'Self-Improvement', 125000, 30, 'Cara fokus pada hal yang benar-benar penting.', 'subtle_art.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(13, 'One Piece Vol. 1', 'Eiichiro Oda', 'Manga', 45000, 40, 'Awal petualangan Monkey D. Luffy menjadi Raja Bajak Laut.', 'onepiece1.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(14, 'Laut Bercerita', 'Leila S. Chudori', 'Novel', 120000, 12, 'Kisah tentang kehilangan, aktivisme, dan sejarah kelam Indonesia.', 'laut_bercerita.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(15, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Classic', 135000, 9, 'Kisah Jay Gatsby dan obsesinya terhadap Daisy.', 'gatsby.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(16, 'Negeri 5 Menara', 'Ahmad Fuadi', 'Novel', 88000, 16, 'Kisah inspiratif kehidupan santri di pesantren.', 'negeri5menara.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(17, 'Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 'History', 180000, 13, 'Sejarah evolusi manusia dari masa ke masa.', 'sapiens.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(18, 'The Pragmatic Programmer', 'Andrew Hunt & David Thomas', 'Programming', 275000, 6, 'Buku wajib bagi software developer profesional.', 'pragmatic_programmer.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(19, 'Koala Kumal', 'Raditya Dika', 'Humor', 70000, 20, 'Humor dan cerita cinta ala Raditya Dika.', 'koala_kumal.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25'),
(20, 'Lord of the Rings: The Fellowship of the Ring', 'J.R.R. Tolkien', 'Fantasy', 175000, 11, 'Awal perjalanan Frodo membawa cincin ke Mordor.', 'lotr_fellowship.jpg', '2025-11-21 13:10:25', '2025-11-21 13:10:25');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `passwords` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `passwords`) VALUES
(3, 'Admin', 'admin@oceanbook.com', 'admin123'),
(4, 'User1', 'User1@gmail.com', 'user123');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `daftarbuku`
--
ALTER TABLE `daftarbuku`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `daftarbuku`
--
ALTER TABLE `daftarbuku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
