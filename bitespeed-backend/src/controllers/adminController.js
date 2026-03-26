const User = require("../models/User");

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    const skip = (Number(page) - 1) * Number(limit);
    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle user active/inactive
// @route   PUT /api/admin/users/:id/toggle
// @access  Private/Admin
const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    if (user.role === "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Cannot deactivate an admin account." });
    }
    user.isActive = !user.isActive;
    await user.save();
    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? "activated" : "deactivated"}.`,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, toggleUserStatus };
