import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function BookDetail() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin;
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        if (res.data?.success) {
          setBook(res.data.data);
        }
      } catch (err) {
        alert("Buku tidak ditemukan");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (
      window.confirm(
        "⚠️ Yakin ingin menghapus buku ini?\nAksi ini tidak bisa dibatalkan."
      )
    ) {
      try {
        await api.delete(`/books/${id}`);
        alert("✅ Buku berhasil dihapus");
        navigate("/");
      } catch (err) {
        alert("❌ Gagal menghapus buku");
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-12 text-center">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
      >
        ← Kembali ke Daftar
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {book.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            oleh {book.author || "Penulis tidak diketahui"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500">KATEGORI</p>
              <p className="font-medium">{book.category || "Umum"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">HARGA</p>
              <p className="text-2xl font-bold text-indigo-600">
                Rp {book.price?.toLocaleString() || "0"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">STOK</p>
              <p className="font-medium">{book.stock || 0} tersedia</p>
            </div>
          </div>

          {book.description && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">Deskripsi</h3>
              <p className="text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {isAdmin ? (
              <>
                <button
                  onClick={() => navigate(`/edit/${book.id}`)}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition"
                >
                  🖊️ Edit Buku
                </button>

                <button
                  onClick={handleDelete}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
                >
                  🗑️ Hapus Buku
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => alert("📦 Buku dimasukkan ke keranjang!")}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
                >
                  🛒 Masukkan Keranjang
                </button>

                <button
                  onClick={() => alert("📨 Kamu memesan buku ini!")}
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
                >
                  📘 Pesan Buku
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
