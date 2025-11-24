import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import SearchBar from '../components/SearchBar';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredBooks(books);
    } else {
      const term = search.toLowerCase();
      setFilteredBooks(
        books.filter(
          (book) =>
            book.title.toLowerCase().includes(term) ||
            (book.category && book.category.toLowerCase().includes(term))
        )
      );
    }
  }, [search, books]);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books');
      setBooks(res.data.data || []);
      setFilteredBooks(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-2 text-gray-600">Memuat daftar buku...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Koleksi Buku Kami</h2>
        <p className="text-gray-600">Temukan buku favorit Anda dari berbagai kategori</p>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-medium text-gray-700">Tidak ada buku ditemukan</h3>
          <p className="text-gray-500">Coba kata kunci lain seperti "novel" atau "komik"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="card-hover bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col"
            >
              <div className="p-5 flex-grow">
                <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mt-1">Penulis: {book.author || '–'}</p>
                <p className="text-sm text-indigo-600 mt-2 font-semibold">
                  Rp {book.price?.toLocaleString() || '0'}
                </p>
                <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                  <span>{book.category || 'Umum'}</span>
                  <span>Stok: {book.stock || 0}</span>
                </div>
              </div>
              <div className="px-5 pb-5">
                <Link
                  to={`/books/${book.id}`}
                  className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}