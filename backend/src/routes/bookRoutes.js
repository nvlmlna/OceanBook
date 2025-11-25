const express = require('express');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = reqauire('../controllers/bookcontroller');

const router = express.Router();

// Public routes (no authentication for now, as per your initial request)
router.get('/', getAllBooks); // List all books (with optional search/filter)
router.get('/:id', getBookById); // Get single book

// CRUD operations
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.put('/:id/order', orderBook);


module.exports = router;