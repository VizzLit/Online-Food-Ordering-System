const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/auth");

router.use(protect); // All cart routes require login

router.get("/", getCart);
router.post("/", addToCart);
router.put("/:foodItemId", updateCartItem);
router.delete("/:foodItemId", removeFromCart);
router.delete("/", clearCart);

module.exports = router;
