const express = require("express");
const {
  addCart,
  getCart,
  deleteCart,
} = require("../controllers/cartController");
const router = express.Router();

router.post("/", addCart);
router.get("/:userId", getCart);
router.delete("/:id", deleteCart);

module.exports = router;
