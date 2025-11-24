import React, { useState, useEffect } from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-8 max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          🔍
        </div>
        <input
          type="text"
          placeholder="Cari judul atau kategori buku..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        />
      </div>
    </div>
  );
}
