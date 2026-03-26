const Order = require("../models/Order");
const Cart = require("../models/Cart");
const FoodItem = require("../models/FoodItem");

// --- Mock Payment Processor ---
const processMockPayment = (method, amount) => {
  // Simulate a 95% success rate
  const success = Math.random() > 0.05;
  return {
    success,
    transactionId: success ? `MOCK_TXN_${Date.now()}_${Math.random().toString(36).substr(2, 8).toUpperCase()}` : null,
    message: success ? "Payment successful" : "Payment failed. Please retry.",
  };
};

// @desc    Place a new order
// @route   POST /api/orders
// @access  Private
const placeOrder = async (req, res, next) => {
  try {
    const { deliveryAddress, paymentMethod = "mock_cod", notes = "" } = req.body;

    // Validate delivery address
    if (
      !deliveryAddress ||
      !deliveryAddress.street ||
      !deliveryAddress.city ||
      !deliveryAddress.state ||
      !deliveryAddress.pincode
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Complete delivery address is required." });
    }

    // Get cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.foodItem"
    );
    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Your cart is empty." });
    }

    // Build order items & calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const food = item.foodItem;
      if (!food || !food.isAvailable) {
        return res.status(400).json({
          success: false,
          message: `${food?.name || "An item"} is no longer available.`,
        });
      }
      subtotal += food.price * item.quantity;
      orderItems.push({
        foodItem: food._id,
        name: food.name,
        price: food.price,
        quantity: item.quantity,
        image: food.image,
      });
    }

    const deliveryFee = 40;
    const totalAmount = subtotal + deliveryFee;

    // Process mock payment (skip for COD)
    let paymentStatus = "pending";
    let transactionId = null;

    if (paymentMethod !== "mock_cod") {
      const paymentResult = processMockPayment(paymentMethod, totalAmount);
      if (!paymentResult.success) {
        return res
          .status(402)
          .json({ success: false, message: paymentResult.message });
      }
      paymentStatus = "paid";
      transactionId = paymentResult.transactionId;
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      deliveryAddress,
      paymentMethod,
      paymentStatus,
      paymentTransactionId: transactionId,
      subtotal,
      deliveryFee,
      totalAmount,
      notes,
      statusHistory: [{ status: "pending", note: "Order placed" }],
    });

    // Clear cart after order
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    res.status(201).json({
      success: true,
      message: "Order placed successfully! 🎉",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const total = await Order.countDocuments({ user: req.user._id });
    const orders = await Order.find({ user: req.user._id })
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    // Users can only see their own orders; admins can see all
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ success: false, message: "Access denied." });
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

// @desc    Cancel an order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied." });
    }

    const cancellableStatuses = ["pending", "confirmed"];
    if (!cancellableStatuses.includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel an order that is ${order.status}.`,
      });
    }

    order.status = "cancelled";
    if (order.paymentStatus === "paid") {
      order.paymentStatus = "refunded";
    }
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

// ── ADMIN CONTROLLERS ────────────────────────────────────────────

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .populate("user", "name email phone")
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;

    const validStatuses = [
      "pending",
      "confirmed",
      "preparing",
      "out_for_delivery",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order status." });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    order.status = status;
    if (note) order.statusHistory[order.statusHistory.length - 1].note = note;
    if (status === "delivered") order.paymentStatus = "paid";

    await order.save();

    res.status(200).json({
      success: true,
      message: `Order status updated to "${status}".`,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get admin dashboard stats
// @route   GET /api/orders/stats
// @access  Private/Admin
const getOrderStats = async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const statusBreakdown = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: todayStart },
    });
    const pendingOrders = await Order.countDocuments({ status: "pending" });

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        todayOrders,
        pendingOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        statusBreakdown: statusBreakdown.reduce((acc, s) => {
          acc[s._id] = s.count;
          return acc;
        }, {}),
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderStats,
};
