const FoodItem = require("../models/FoodItem");

// @desc    Get all food items (with filters, search, pagination)
// @route   GET /api/foods
// @access  Public
const getAllFoods = async (req, res, next) => {
  try {
    const {
      category,
      isVeg,
      search,
      sort = "-createdAt",
      page = 1,
      limit = 12,
      minPrice,
      maxPrice,
    } = req.query;

    const query = { isAvailable: true };

    if (category) query.category = category;
    if (isVeg !== undefined) query.isVeg = isVeg === "true";
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await FoodItem.countDocuments(query);

    const foods = await FoodItem.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: foods,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single food item
// @route   GET /api/foods/:id
// @access  Public
const getFoodById = async (req, res, next) => {
  try {
    const food = await FoodItem.findById(req.params.id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found." });
    }
    res.status(200).json({ success: true, data: food });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all categories
// @route   GET /api/foods/categories
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    const categories = await FoodItem.distinct("category");
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
};

// @desc    Create food item (Admin)
// @route   POST /api/foods
// @access  Private/Admin
const createFood = async (req, res, next) => {
  try {
    const food = await FoodItem.create(req.body);
    res.status(201).json({
      success: true,
      message: "Food item created successfully!",
      data: food,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update food item (Admin)
// @route   PUT /api/foods/:id
// @access  Private/Admin
const updateFood = async (req, res, next) => {
  try {
    const food = await FoodItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "Food item updated!", data: food });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete food item (Admin)
// @route   DELETE /api/foods/:id
// @access  Private/Admin
const deleteFood = async (req, res, next) => {
  try {
    const food = await FoodItem.findByIdAndDelete(req.params.id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "Food item deleted successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllFoods,
  getFoodById,
  getCategories,
  createFood,
  updateFood,
  deleteFood,
};
