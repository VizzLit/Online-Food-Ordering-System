import { useState } from 'react';
import './Menu.css';

const MOCK_ITEMS = [
  { id: 1, name: "Margherita Pizza", category: "Pizza", price: 12.99, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80", rating: 4.8 },
  { id: 2, name: "Spicy Pepperoni", category: "Pizza", price: 14.99, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80", rating: 4.9 },
  { id: 3, name: "Classic Cheeseburger", category: "Burger", price: 9.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80", rating: 4.7 },
  { id: 4, name: "California Roll", category: "Sushi", price: 11.99, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80", rating: 4.6 },
  { id: 5, name: "Caesar Salad", category: "Salad", price: 8.99, image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=400&q=80", rating: 4.5 },
  { id: 6, name: "BBQ Wings", category: "Sides", price: 10.99, image: "https://images.unsplash.com/photo-1569691899455-88464f6d3cb1?auto=format&fit=crop&w=400&q=80", rating: 4.8 },
];

const CATEGORIES = ["All", "Pizza", "Burger", "Sushi", "Salad", "Sides"];

const Menu = ({ setCart }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? MOCK_ITEMS 
    : MOCK_ITEMS.filter(item => item.category === activeCategory);

  const handleAddToCart = (item) => {
    setCart(prev => [...prev, item]);
    // Might want a cool toast animation here
  };

  return (
    <div className="menu-page container animate-fade-in">
      <div className="menu-header">
        <h1>Explore Our <span className="gradient-text">Menu</span></h1>
        <p>Find your next favorite meal.</p>
      </div>

      <div className="category-filters">
        {CATEGORIES.map(cat => (
          <button 
            key={cat} 
            className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid-cards">
        {filteredItems.map(item => (
          <div key={item.id} className="food-card glass">
            <div className="card-image">
              <img src={item.image} alt={item.name} loading="lazy" />
              <div className="rating-badge">★ {item.rating}</div>
            </div>
            <div className="card-content">
              <h3>{item.name}</h3>
              <div className="card-footer">
                <span className="price">${item.price.toFixed(2)}</span>
                <button 
                  className="btn-primary add-btn" 
                  onClick={() => handleAddToCart(item)}
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
