const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderStats,
} = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/auth");

// User routes
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/cancel", protect, cancelOrder);

// Admin routes
router.get("/", protect, adminOnly, getAllOrders);
router.get("/admin/stats", protect, adminOnly, getOrderStats);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;
