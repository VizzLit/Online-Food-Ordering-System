import { useState, useEffect } from "react";
import "./Menu.css";

const API_URL = "https://online-food-ordering-system-r9ya.onrender.com/api";

function Menu({ cart, setCart }) {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories once on mount
  useEffect(() => {
    fetch(`${API_URL}/foods/categories`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setCategories(["All", ...res.data]);
      })
      .catch(() => {}); // categories are optional, fail silently
  }, []);

  // Fetch foods whenever category changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    const url =
      activeCategory === "All"
        ? `${API_URL}/foods`
        : `${API_URL}/foods?category=${activeCategory}`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setFoods(res.data);
        } else {
          setError("Failed to load menu.");
        }
      })
      .catch(() => setError("Could not connect to server."))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i._id === item._id);
      if (exists) {
        // Increase quantity if already in cart
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const isInCart = (itemId) => cart.some((i) => i._id === itemId);

  return (
    <div className="menu-page container animate-fade-in">
      <div className="menu-header">
        <h1>
          Our <span className="gradient-text">Menu</span>
        </h1>
        <p>Choose from the best dishes around you</p>
      </div>

      {/* Category Filter */}
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

      {/* States */}
      {loading && (
        <div className="menu-status">
          <p>Loading menu...</p>
        </div>
      )}

      {error && !loading && (
        <div className="menu-status">
          <p style={{ color: "var(--accent)" }}>{error}</p>
        </div>
      )}

      {/* Food Grid */}
      {!loading && !error && foods.length === 0 && (
        <div className="menu-status">
          <p>No items found in this category.</p>
        </div>
      )}

      {!loading && !error && foods.length > 0 && (
        <div className="menu-grid">
          {foods.map((item) => (
            <div className="menu-card glass" key={item._id}>
              <div className="card-image-wrap">
                <img src={item.image} alt={item.name} />
                <div className="card-rating">⭐ {item.rating?.toFixed(1) || "4.5"}</div>
                {item.isVeg && (
                  <div className="card-veg-badge">🟢 Veg</div>
                )}
              </div>

              <div className="card-body">
                <h3>{item.name}</h3>
                <p className="card-desc">{item.description}</p>
                <span className="card-category">{item.category}</span>

                <div className="card-footer">
                  <span className="card-price">₹{item.price}</span>
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