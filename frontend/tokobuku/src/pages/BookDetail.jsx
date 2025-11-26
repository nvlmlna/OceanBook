import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";

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
        } else {
          throw new Error("Book not found");
        }
      } catch (err) {
        Swal.fire({
          title: "Buku Tidak Ditemukan",
          text: "Buku mungkin sudah dihapus atau tidak tersedia.",
          icon: "error",
          confirmButtonColor: "#d33",
        }).then(() => {
          navigate("/");
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, navigate]);

  const handleDelete = async () => {
    Swal.fire({
      title: "Yakin ingin menghapus buku ini?",
      text: "Tindakan ini tidak bisa dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#33cfeb",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/books/${id}`);

          Swal.fire({
            title: "Berhasil!",
            text: "Buku berhasil dihapus.",
            icon: "success",
            confirmButtonColor: "#33cfeb",
          }).then(() => {
            navigate("/");
          });
        } catch (err) {
          Swal.fire({
            title: "Gagal Menghapus",
            text: "Terjadi kesalahan saat menghapus buku.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-12 text-center">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="container mx-auto p-4 md:p-6 ">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-cyan-600 hover:text-cyan-800 font-medium"
      >
        ← Kembali ke Daftar
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {book.title}
          </h1>
          <img src={book.image || "default-image.jpg"} alt={book.title} className="w-80 mb-4 rounded" />
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
              <p className="text-2xl font-bold text-cyan-600">
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
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-white hover:bg-gradient-to-l from-cyan-500 to-white text-cyan-800 font-semibold px-4 py-2 rounded-lg hover:bg-white transition duration-200 shadow-md"
                >
                  Edit Buku
                </button>

                <button
                  onClick={handleDelete}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-white hover:bg-gradient-to-l from-cyan-500 to-white text-cyan-800 font-semibold px-4 py-2 rounded-lg hover:bg-white transition duration-200 shadow-md"
                >
                  Hapus Buku
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                  Swal.fire({
                    title: "Berhasil!",
                    text: "Buku telah dimasukkan ke keranjang.",
                    icon: "success",
                    confirmButtonColor: "#33cfeb",
                  });
                }}

                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-white hover:bg-gradient-to-l from-cyan-500 to-white text-cyan-800 font-semibold px-4 py-2 rounded-lg hover:bg-white transition duration-200 shadow-md"
                >
                  Masukkan Keranjang
                </button>

                <button
                  onClick={() => {
                  let qty = 1; // default quantity
                  const max = book.stock; // biar ga lebih dari stok

                  Swal.fire({
                    title: "Pesan Buku",
                    html: `
                      <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-top:15px;">
                        <button id="minus" style="width:40px;height:40px;font-size:20px;border-radius:8px;border:1px solid #ccc;">-</button>
                        <span id="qty" style="font-size:20px;font-weight:bold;">1</span>
                        <button id="plus" style="width:40px;height:40px;font-size:20px;border-radius:8px;border:1px solid #ccc;">+</button>
                      </div>
                      <p style="margin-top:10px;font-size:14px;color:gray;">Stok tersedia: ${book.stock}</p>
                    `,
                    showCancelButton: true,
                    confirmButtonText: "Pesan Sekarang",
                    cancelButtonText: "Batal",
                    confirmButtonColor: "#33cfeb",
                    cancelButtonColor: "#d33",
                    didOpen: () => {
                      const minus = Swal.getPopup().querySelector("#minus");
                      const plus = Swal.getPopup().querySelector("#plus");
                      const qtyText = Swal.getPopup().querySelector("#qty");

                      minus.addEventListener("click", () => {
                        if (qty > 1) {
                          qty--;
                          qtyText.textContent = qty;
                        }
                      });

                      plus.addEventListener("click", () => {
                        if (qty < max) {
                          qty++;
                          qtyText.textContent = qty;
                        }
                      });
                    }
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      try {
                        await api.put(`/books/${book.id}/order`, { quantity: qty });

                        Swal.fire({
                          title: "Berhasil!",
                          text: `Kamu memesan ${qty} buku.`,
                          icon: "success",
                          confirmButtonColor: "#33cfeb",
                        });

                        setBook({ ...book, stock: book.stock - qty });
                      } catch (err) {
                        Swal.fire({
                          title: "Gagal",
                          text: "Stok tidak cukup atau server error.",
                          icon: "error",
                          confirmButtonColor: "#33cfeb",
                        });
                      }
                    }
                  });
                }}

                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-white hover:bg-gradient-to-l from-cyan-500 to-white text-cyan-800 font-semibold px-4 py-2 rounded-lg hover:bg-white transition duration-200 shadow-md"
                >
                  Pesan Buku
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
