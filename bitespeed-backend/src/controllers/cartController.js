const Cart = require("../models/Cart");
const FoodItem = require("../models/FoodItem");

// Helper: get populated cart with computed totals
const getPopulatedCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate(
    "items.foodItem",
    "name price image isAvailable category"
  );
  if (!cart) return null;

  let subtotal = 0;
  const validItems = [];

  for (const item of cart.items) {
    if (item.foodItem && item.foodItem.isAvailable) {
      subtotal += item.foodItem.price * item.quantity;
      validItems.push(item);
    }
  }

  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  return {
    _id: cart._id,
    user: cart.user,
    items: validItems,
    itemCount: validItems.reduce((sum, i) => sum + i.quantity, 0),
    subtotal,
    deliveryFee,
    total,
    updatedAt: cart.updatedAt,
  };
};

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res, next) => {
  try {
    const cart = await getPopulatedCart(req.user._id);

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: { items: [], itemCount: 0, subtotal: 0, deliveryFee: 0, total: 0 },
      });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
};

// @desc    Add item to cart (or increase qty)
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res, next) => {
  try {
    const { foodItemId, quantity = 1 } = req.body;

    const food = await FoodItem.findById(foodItemId);
    if (!food || !food.isAvailable) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found or unavailable." });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ foodItem: foodItemId, quantity }],
      });
    } else {
      const existingIdx = cart.items.findIndex(
        (i) => i.foodItem.toString() === foodItemId
      );

      if (existingIdx >= 0) {
        cart.items[existingIdx].quantity += quantity;
      } else {
        cart.items.push({ foodItem: foodItemId, quantity });
      }
      await cart.save();
    }

    const populated = await getPopulatedCart(req.user._id);
    res.status(200).json({
      success: true,
      message: `${food.name} added to cart!`,
      data: populated,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update item quantity in cart
// @route   PUT /api/cart/:foodItemId
// @access  Private
const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { foodItemId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found." });
    }

    const idx = cart.items.findIndex(
      (i) => i.foodItem.toString() === foodItemId
    );

    if (idx === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not in cart." });
    }

    if (quantity <= 0) {
      cart.items.splice(idx, 1);
    } else {
      cart.items[idx].quantity = quantity;
    }

    await cart.save();
    const populated = await getPopulatedCart(req.user._id);
    res.status(200).json({ success: true, message: "Cart updated.", data: populated });
  } catch (err) {
    next(err);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:foodItemId
// @access  Private
const removeFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found." });
    }

    cart.items = cart.items.filter(
      (i) => i.foodItem.toString() !== req.params.foodItemId
    );
    await cart.save();

    const populated = await getPopulatedCart(req.user._id);
    res
      .status(200)
      .json({ success: true, message: "Item removed from cart.", data: populated });
  } catch (err) {
    next(err);
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res, next) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Cart cleared.", data: { items: [], itemCount: 0, subtotal: 0, deliveryFee: 0, total: 0 } });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
