require("dotenv").config();
const mongoose = require("mongoose");
const FoodItem = require("../models/FoodItem");
const User = require("../models/User");

const foods = [
  // Burgers
  {
    name: "Classic Smash Burger",
    description: "Juicy double smash patty with cheddar, pickles, and secret sauce.",
    price: 199, category: "Burgers",
    image: "https://placehold.co/300x200?text=Smash+Burger",
    rating: 4.7, totalRatings: 320, isVeg: false, preparationTime: 15, tags: ["bestseller", "spicy"],
  },
  {
    name: "Crispy Chicken Burger",
    description: "Fried chicken fillet with coleslaw, jalapeños, and honey mustard.",
    price: 179, category: "Burgers",
    image: "https://placehold.co/300x200?text=Chicken+Burger",
    rating: 4.5, totalRatings: 210, isVeg: false, preparationTime: 18, tags: ["popular"],
  },
  {
    name: "Veggie Delight Burger",
    description: "Aloo tikki patty with fresh veggies, mint chutney and sesame bun.",
    price: 149, category: "Burgers",
    image: "https://placehold.co/300x200?text=Veggie+Burger",
    rating: 4.3, totalRatings: 145, isVeg: true, preparationTime: 12, tags: ["veg"],
  },
  // Pizza
  {
    name: "Margherita Pizza",
    description: "Classic tomato base with fresh mozzarella, basil and olive oil.",
    price: 299, category: "Pizza",
    image: "https://placehold.co/300x200?text=Margherita",
    rating: 4.6, totalRatings: 410, isVeg: true, preparationTime: 20, tags: ["classic", "veg"],
  },
  {
    name: "Pepperoni Blast Pizza",
    description: "Loaded with spicy pepperoni, mozzarella on a thin crispy crust.",
    price: 369, category: "Pizza",
    image: "https://placehold.co/300x200?text=Pepperoni",
    rating: 4.8, totalRatings: 520, isVeg: false, preparationTime: 22, tags: ["bestseller", "spicy"],
  },
  {
    name: "Paneer Tikka Pizza",
    description: "Tandoori paneer with capsicum, onion and tikka sauce on a thick crust.",
    price: 329, category: "Pizza",
    image: "https://placehold.co/300x200?text=Paneer+Pizza",
    rating: 4.5, totalRatings: 280, isVeg: true, preparationTime: 22, tags: ["popular", "veg"],
  },
  // Biryani
  {
    name: "Hyderabadi Chicken Dum Biryani",
    description: "Slow-cooked aromatic basmati rice with tender chicken and saffron.",
    price: 259, category: "Biryani",
    image: "https://placehold.co/300x200?text=Chicken+Biryani",
    rating: 4.9, totalRatings: 780, isVeg: false, preparationTime: 30, tags: ["bestseller", "must-try"],
  },
  {
    name: "Veg Dum Biryani",
    description: "Fragrant basmati with seasonal vegetables, whole spices and fried onions.",
    price: 199, category: "Biryani",
    image: "https://placehold.co/300x200?text=Veg+Biryani",
    rating: 4.4, totalRatings: 310, isVeg: true, preparationTime: 25, tags: ["veg"],
  },
  {
    name: "Mutton Biryani",
    description: "Tender mutton slow-cooked with aged basmati and authentic spices.",
    price: 319, category: "Biryani",
    image: "https://placehold.co/300x200?text=Mutton+Biryani",
    rating: 4.8, totalRatings: 450, isVeg: false, preparationTime: 35, tags: ["premium"],
  },
  // Chinese
  {
    name: "Veg Hakka Noodles",
    description: "Stir-fried noodles with veggies, soy sauce and a hint of sesame oil.",
    price: 149, category: "Chinese",
    image: "https://placehold.co/300x200?text=Hakka+Noodles",
    rating: 4.3, totalRatings: 220, isVeg: true, preparationTime: 15, tags: ["veg"],
  },
  {
    name: "Chicken Manchurian",
    description: "Crispy chicken tossed in a tangy, spicy manchurian gravy.",
    price: 199, category: "Chinese",
    image: "https://placehold.co/300x200?text=Manchurian",
    rating: 4.6, totalRatings: 360, isVeg: false, preparationTime: 20, tags: ["popular", "spicy"],
  },
  // Starters
  {
    name: "Paneer Tikka",
    description: "Marinated cottage cheese grilled in tandoor with mint chutney.",
    price: 229, category: "Starters",
    image: "https://placehold.co/300x200?text=Paneer+Tikka",
    rating: 4.7, totalRatings: 490, isVeg: true, preparationTime: 20, tags: ["popular", "veg"],
  },
  {
    name: "Chicken Wings (6 pcs)",
    description: "Crispy buffalo wings tossed in smoky BBQ sauce.",
    price: 249, category: "Starters",
    image: "https://placehold.co/300x200?text=Chicken+Wings",
    rating: 4.6, totalRatings: 310, isVeg: false, preparationTime: 18, tags: ["bestseller"],
  },
  // Rolls
  {
    name: "Chicken Kathi Roll",
    description: "Juicy chicken tikka wrapped in flaky paratha with chutney.",
    price: 149, category: "Rolls",
    image: "https://placehold.co/300x200?text=Kathi+Roll",
    rating: 4.5, totalRatings: 275, isVeg: false, preparationTime: 12, tags: ["popular"],
  },
  {
    name: "Paneer Frankie Roll",
    description: "Spiced paneer and veggies wrapped in a soft tortilla.",
    price: 129, category: "Rolls",
    image: "https://placehold.co/300x200?text=Paneer+Roll",
    rating: 4.3, totalRatings: 190, isVeg: true, preparationTime: 10, tags: ["veg"],
  },
  // Desserts
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a gooey molten center, served with ice cream.",
    price: 149, category: "Desserts",
    image: "https://placehold.co/300x200?text=Lava+Cake",
    rating: 4.9, totalRatings: 560, isVeg: true, preparationTime: 15, tags: ["bestseller", "must-try"],
  },
  {
    name: "Gulab Jamun (4 pcs)",
    description: "Soft milk-solid dumplings soaked in rose-cardamom sugar syrup.",
    price: 89, category: "Desserts",
    image: "https://placehold.co/300x200?text=Gulab+Jamun",
    rating: 4.6, totalRatings: 330, isVeg: true, preparationTime: 5, tags: ["classic", "veg"],
  },
  // Drinks
  {
    name: "Mango Lassi",
    description: "Thick, chilled yogurt drink blended with sweet Alphonso mangoes.",
    price: 99, category: "Drinks",
    image: "https://placehold.co/300x200?text=Mango+Lassi",
    rating: 4.7, totalRatings: 420, isVeg: true, preparationTime: 5, tags: ["popular", "veg"],
  },
  {
    name: "Cold Coffee",
    description: "Rich espresso blended with chilled milk and a scoop of vanilla ice cream.",
    price: 119, category: "Drinks",
    image: "https://placehold.co/300x200?text=Cold+Coffee",
    rating: 4.5, totalRatings: 290, isVeg: true, preparationTime: 5, tags: ["veg"],
  },
  {
    name: "Fresh Lime Soda",
    description: "Zesty lime juice with sparkling water, black salt and mint.",
    price: 69, category: "Drinks",
    image: "https://placehold.co/300x200?text=Lime+Soda",
    rating: 4.4, totalRatings: 180, isVeg: true, preparationTime: 3, tags: ["refreshing", "veg"],
  },
];

const adminUser = {
  name: "BiteSpeed Admin",
  email: "admin@bitespeed.com",
  password: "Admin@123",
  role: "admin",
  phone: "9999999999",
};

// ✅ Called as a module from server.js — uses existing connection, does NOT close it
const seed = async () => {
  try {
    await FoodItem.deleteMany({});
    await User.deleteMany({ role: "admin" });
    console.log("🗑️  Cleared existing food items and admin users.");

    const insertedFoods = await FoodItem.insertMany(foods);
    console.log(`✅ Seeded ${insertedFoods.length} food items.`);

    const admin = await User.create(adminUser);
    console.log(`✅ Admin user created → Email: ${admin.email} | Password: Admin@123`);

    console.log("\n🎉 Database seeded successfully!");
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
  }
  // ❌ NO mongoose.connection.close() here — server keeps running
};

module.exports = seed;
