// backend/controllers/bookController.js
const pool = require('../config/db');

// GET All Books
const getAllBooks = async (req, res) => {
  try {
    let query = 'SELECT * FROM daftarbuku';
    const params = [];

    // Filter by title or category (optional)
    if (req.query.search) {
      query += ' WHERE title LIKE ? OR category LIKE ?';
      const searchParam = `%${req.query.search}%`;
      params.push(searchParam, searchParam);
    }

    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// GET Book by ID
const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM daftarbuku WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Book not found.' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// POST Create Book
const createBook = async (req, res) => {
  const { title, author, category, price, stock, description, image } = req.body;

  // Validasi input wajib
  if (!title || !price) {
    return res.status(400).json({ success: false, message: 'Title and price are required.' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO daftarbuku (title, author, category, price, stock, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, author, category, price, stock || 0, description || '', image || '']
    );
    res.status(201).json({
      success: true,
      message: 'Book created successfully.',
      data: { id: result.insertId, ...req.body }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// PUT Update Book
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, category, price, stock, description, image } = req.body;

  try {
    const [result] = await pool.execute(
      'UPDATE daftarbuku SET title = ?, author = ?, category = ?, price = ?, stock = ?, description = ?, image = ? WHERE id = ?',
      [title, author, category, price, stock, description, image, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Book not found.' });
    }
    res.json({
      success: true,
      message: 'Book updated successfully.',
      data: { id, ...req.body }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// DELETE Book
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM daftarbuku WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Book not found.' });
    }
    res.json({ success: true, message: 'Book deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};