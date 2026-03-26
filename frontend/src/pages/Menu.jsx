import { useState, useEffect } from "react";
import "./Menu.css";

function Menu({ cart, setCart }) {
  const [foodData, setFoodData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("https://online-food-ordering-system-r9ya.onrender.com/api/foods")
      .then((res) => res.json())
      .then((resData) => {
        console.log("API:", resData);

        const safeData = Array.isArray(resData)
          ? resData
          : Array.isArray(resData.data)
          ? resData.data
          : [];

        setFoodData(safeData);
      })
      .catch((err) => console.log(err));
  }, []);

  const allCategories = [
    "All",
    ...new Set((foodData || []).map((item) => item.category)),
  ];

  const filteredData =
    activeCategory === "All"
      ? foodData
      : (foodData || []).filter((item) => item.category === activeCategory);

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
        <p>Choose from the best dishes around you</p>
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

      {/* Food Items */}
      <div className="menu-grid">
        {Array.isArray(filteredData) &&
          filteredData.map((item) => (
            <div className="menu-card glass" key={item._id}>
              <div className="card-image-wrap">
                <img src={item.image} alt={item.name} />
                <div className="card-rating">⭐ {item.rating || 4.5}</div>
              </div>

              <div className="card-body">
                <h3>{item.name}</h3>
                <span className="card-category">{item.category}</span>

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
  );
}

export default Menu;