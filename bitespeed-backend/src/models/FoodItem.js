const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Burgers",
        "Pizza",
        "Biryani",
        "Chinese",
        "Desserts",
        "Drinks",
        "Starters",
        "Rolls",
        "Salads",
        "Sandwiches",
      ],
    },
    image: {
      type: String,
      default: "https://placehold.co/300x200?text=Food",
    },
    rating: {
      type: Number,
      default: 4.0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    isVeg: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    preparationTime: {
      type: Number, // in minutes
      default: 20,
    },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Index for search
foodItemSchema.index({ name: "text", description: "text", category: "text" });

module.exports = mongoose.model("FoodItem", foodItemSchema);
