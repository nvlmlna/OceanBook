import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../services/cartService";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    getCart(user.id).then((res) => {
      if (res.data.success) setCart(res.data.data);
    });
  }, []);

  const handleDelete = async (id) => {
    await removeFromCart(id);
    setCart(cart.filter((item) => item.id !== id));
  };

  if (!user)
    return (
      <p className="p-6 text-center">Silakan login untuk melihat keranjang</p>
    );

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">🛒 Keranjang Saya</h1>

      {cart.length === 0 ? (
        <p>Keranjang kosong</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 mb-3 shadow">
            <h3 className="font-semibold">{item.book_title}</h3>
            <p>Rp {item.price.toLocaleString()}</p>

            <button
              onClick={() => handleDelete(item.id)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Hapus
            </button>
          </div>
        ))
      )}
    </div>
  );
}
