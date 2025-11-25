import db from "../config/db.js";

export const addCart = (req, res) => {
  console.log("POST /api/cart - body:", req.body); // <-- penting
  const { bookId, userId } = req.body;

  if (!userId || !bookId) {
    return res
      .status(400)
      .json({ success: false, message: "bookId dan userId wajib" });
  }

  db.query(
    "INSERT INTO cart (user_id, book_id) VALUES (?, ?)",
    [userId, bookId],
    (err, result) => {
      if (err) {
        console.error("DB ERROR insert cart:", err);
        return res.status(500).json({ success: false, error: err });
      }
      res.json({ success: true, data: { id: result.insertId } });
    }
  );
};

export const getCart = (req, res) => {
  const userId = req.params.userId;

  db.query(
    `SELECT cart.id, books.title AS book_title, books.price 
     FROM cart 
     JOIN books ON books.id = cart.book_id 
     WHERE cart.user_id = ?`,
    [userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true, data: result });
    }
  );
};

export const deleteCart = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM cart WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
};
