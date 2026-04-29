import { useState, useEffect } from "react";
import "./Menu.css";

const API_URL = "https://online-food-ordering-system-r9ya.onrender.com/api";

// Real Unsplash images — fixes broken placehold.co images from DB
const IMAGE_MAP = {
  "Classic Smash Burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
  "Crispy Chicken Burger": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop",
  "Veggie Delight Burger": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&h=300&fit=crop",
  "Margherita Pizza": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
  "Pepperoni Blast Pizza": "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
  "Paneer Tikka Pizza": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
  "Hyderabadi Chicken Dum Biryani": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop",
  "Veg Dum Biryani": "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
  "Mutton Biryani": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400&h=300&fit=crop",
  "Veg Hakka Noodles": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
  "Chicken Manchurian": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
  "Paneer Tikka": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
  "Chicken Wings (6 pcs)": "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop",
  "Chicken Kathi Roll": "https://images.unsplash.com/photo-1626844433939-7a57dcb8a03f?w=400&h=300&fit=crop",
  "Paneer Frankie Roll": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
  "Chocolate Lava Cake": "https://images.unsplash.com/photo-1617305855058-336d24456869?w=400&h=300&fit=crop",
  "Gulab Jamun (4 pcs)": "https://images.unsplash.com/photo-1601303516534-bf5a6c4d3a72?w=400&h=300&fit=crop",
  "Mango Lassi": "https://images.unsplash.com/photo-1571805341302-f857308690e3?w=400&h=300&fit=crop",
  "Cold Coffee": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
  "Fresh Lime Soda": "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=400&h=300&fit=crop",
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";

const getImage = (item) => {
  if (item.image && !item.image.includes("placehold.co")) return item.image;
  return IMAGE_MAP[item.name] || FALLBACK_IMAGE;
};

function Menu({ cart, setCart }) {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/foods/categories`)
      .then((res) => res.json())
      .then((res) => { if (res.success) setCategories(["All", ...res.data]); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url =
      activeCategory === "All"
        ? `${API_URL}/foods?limit=100`
        : `${API_URL}/foods?category=${encodeURIComponent(activeCategory)}&limit=100`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setFoods(res.data);
        else setError("Failed to load menu.");
      })
      .catch(() => setError("Could not connect to server."))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i._id === item._id);
      if (exists) return prev.map((i) => i._id === item._id ? { ...i, quantity: (i.quantity || 1) + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const isInCart = (itemId) => cart.some((i) => i._id === itemId);

  return (
    <div className="menu-page container animate-fade-in">
      <div className="menu-header">
        <h1>Our <span className="gradient-text">Menu</span></h1>
        <p>Choose from the best dishes around you</p>
      </div>

      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-pill ${activeCategory === cat ? "filter-pill--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p style={{ textAlign: "center", padding: "3rem", color: "#aaa" }}>Loading menu...</p>}
      {error && !loading && <p style={{ textAlign: "center", padding: "3rem", color: "#ff6b6b" }}>{error}</p>}
      {!loading && !error && foods.length === 0 && <p style={{ textAlign: "center", padding: "3rem", color: "#aaa" }}>No items found.</p>}

      {!loading && !error && foods.length > 0 && (
        <div className="menu-grid">
          {foods.map((item) => (
            <div className="menu-card glass" key={item._id}>
              <div className="card-image-wrap" style={{ position: "relative" }}>
                <img
                  src={getImage(item)}
                  alt={item.name}
                  onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                />
                <div className="card-rating">⭐ {item.rating?.toFixed(1) || "4.5"}</div>
                {item.isVeg && (
                  <span style={{
                    position: "absolute", top: "0.5rem", left: "0.5rem",
                    background: "#16a34a", color: "#fff", fontSize: "0.65rem",
                    padding: "2px 7px", borderRadius: "4px", fontWeight: "700",
                  }}>VEG</span>
                )}
              </div>

              <div className="card-body">
                <h3 style={{ color: "#ffffff", marginBottom: "0.3rem", fontSize: "1rem", fontWeight: "600" }}>
                  {item.name}
                </h3>
                <p style={{
                  color: "#9ca3af", fontSize: "0.78rem", lineHeight: "1.4",
                  marginBottom: "0.5rem", display: "-webkit-box",
                  WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {item.description}
                </p>
                <span className="card-category">{item.category}</span>
                <div className="card-footer">
                  <span className="card-price" style={{ color: "#ff6b35", fontWeight: "700", fontSize: "1.1rem" }}>
                    ₹{item.price}
                  </span>
                  <button
                    className={`add-btn ${isInCart(item._id) ? "add-btn--added" : ""}`}
                    onClick={() => handleAddToCart(item)}
                  >
                    {isInCart(item._id) ? "✓ Added" : "+ Add"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;