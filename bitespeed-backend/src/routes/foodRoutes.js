const express = require("express");
const router = express.Router();
const {
  getAllFoods,
  getFoodById,
  getCategories,
  createFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", getAllFoods);
router.get("/categories", getCategories);
router.get("/:id", getFoodById);

// Admin only
router.post("/", protect, adminOnly, createFood);
router.put("/:id", protect, adminOnly, updateFood);
router.delete("/:id", protect, adminOnly, deleteFood);

module.exports = router;
