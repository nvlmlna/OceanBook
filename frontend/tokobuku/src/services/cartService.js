import api from "./api";

export const getCart = (userId) => {
  return api.get(`/api/cart/${userId}`);
};

export const removeFromCart = (cartId) => {
  return api.delete(`/api/cart/${cartId}`);
};

export const addToCart = (bookId, userId) => {
  return api.post("/api/cart", { bookId, userId });
};
