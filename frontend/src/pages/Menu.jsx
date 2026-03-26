import { useState, useEffect } from "react";
import "./Menu.css";

function Menu({ cart, setCart }) {
  const [foodData, setFoodData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  // 🔥 Fetch from backend
  useEffect(() => {
    fetch("https://online-food-ordering-system-r9ya.onrender.com/api/foods")
      .then((res) => res.json())
      .then((data) => setFoodData(data))
      .catch((err) => console.log(err));
  }, []);

  const allCategories = ["All", ...new Set(foodData.map((r) => r.category))];

  const filteredData =
    activeCategory === "All"
      ? foodData
      : foodData.filter((r) => r.category === activeCategory);

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const isInCart = (itemId) =>
    cart.some((item) => item._id === itemId);

  return (
    <div className="menu-page container animate-fade-in">
      <div className="menu-header">
        <h1>
          Our <span className="gradient-text">Menu</span>
        </h1>
        <p>Choose from the best restaurants and dishes around you</p>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {allCategories.map((cat) => (
          <button
            key={cat}
            className={`filter-pill ${
              activeCategory === cat ? "filter-pill--active" : ""
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Restaurants */}
      {filteredData.map((restaurant) => (
        <div key={restaurant._id} className="restaurant-section">
          <div className="restaurant-header">
            <div>
              <h2>{restaurant.name}</h2>
              <div className="restaurant-meta">
                <span className="meta-badge">⭐ {restaurant.rating}</span>
                <span className="meta-badge">🕐 {restaurant.deliveryTime}</span>
                <span className="meta-badge">{restaurant.category}</span>
              </div>
            </div>
          </div>

          <div className="menu-grid">
            {restaurant.items?.map((item) => (
              <div className="menu-card glass" key={item._id}>
                <div className="card-image-wrap">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div className="card-rating">⭐ {item.rating}</div>
                </div>

                <div className="card-body">
                  <div className="card-info">
                    <h3>{item.name}</h3>
                    <span className="card-category">{item.category}</span>
                  </div>

                  <div className="card-footer">
                    <span className="card-price">₹{item.price}</span>
                    <button
                      className={`add-btn ${
                        isInCart(item._id) ? "add-btn--added" : ""
                      }`}
                      onClick={() => handleAddToCart(item)}
                    >
                      {isInCart(item._id) ? "✓ Added" : "+ Add"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Menu;