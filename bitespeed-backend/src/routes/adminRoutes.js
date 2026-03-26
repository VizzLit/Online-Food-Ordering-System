const express = require("express");
const router = express.Router();
const { getAllUsers, toggleUserStatus } = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/auth");

router.use(protect, adminOnly); // All admin routes require login + admin role

router.get("/users", getAllUsers);
router.put("/users/:id/toggle", toggleUserStatus);

module.exports = router;
