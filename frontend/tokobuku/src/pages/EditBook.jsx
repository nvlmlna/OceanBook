import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  // Fetch data buku
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setFormData(res.data.data);
      } catch (err) {
        Swal.fire({
          title: "Buku Tidak Ditemukan",
          text: "Buku mungkin sudah dihapus atau ID salah.",
          icon: "error",
          confirmButtonColor: "#33cfeb",
        }).then(() => navigate("/"));
      }
    };
    fetchBook();
  }, [id, navigate]);

  // Cek admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.isAdmin) {
      Swal.fire({
        title: "Akses Ditolak",
        text: "Anda tidak memiliki akses admin!",
        icon: "error",
        confirmButtonColor: "#33cfeb",
      }).then(() => navigate("/"));
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/books/${id}`, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });

      Swal.fire({
        title: "Berhasil!",
        text: "Buku berhasil diupdate.",
        icon: "success",
        confirmButtonColor: "#33cfeb",
      }).then(() => navigate(`/books/${id}`));
    } catch (err) {
      Swal.fire({
        title: "Gagal Mengupdate",
        text: "Terjadi kesalahan saat mengupdate buku.",
        icon: "error",
        confirmButtonColor: "#33cfeb",
      });
    }
  };



  return (
    <div className="container mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Buku</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-2xl"
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium">Judul *</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Penulis</label>
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Kategori</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Harga (angka) *</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Stok</label>
          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Deskripsi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">
            URL Gambar (opsional)
          </label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-white hover:bg-gradient-to-l from-cyan-500 to-white text-cyan-800 font-semibold px-4 py-2 rounded-lg hover:bg-white transition duration-200 shadow-md"
          >
            Update Buku
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-white hover:bg-gradient-to-l from-cyan-500 to-white text-cyan-800 font-semibold px-4 py-2 rounded-lg hover:bg-white transition duration-200 shadow-md"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
