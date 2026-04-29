import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* ===== Hero Section ===== */}
      <section className="hero container">
        <div className="hero-content animate-fade-in">
          <div className="hero-badge glass">
            <span className="badge-dot"></span>
            #1 Food Delivery App
          </div>

          <h1>
            Discover the <br />
            <span className="gradient-text">Best Food</span> Near You
          </h1>

          <p className="hero-subtitle">
            From sizzling burgers to artisan pizzas, we bring your favorite
            meals right to your door. Fast delivery. Fresh taste. No compromises.
          </p>

          <div className="hero-actions">
            <button
              onClick={() => navigate("/menu")}
              className="btn-primary"
              id="hero-order-btn"
            >
              Order Now
              <span className="btn-icon">🚀</span>
            </button>
            <button className="btn-secondary" id="hero-track-btn">
              Track Order
              <span className="btn-icon">📍</span>
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <h3>4.9<span className="stat-icon">⭐</span></h3>
              <span>2k+ Reviews</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <h3>30<span className="stat-unit">min</span></h3>
              <span>Avg Delivery</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <h3>500<span className="stat-unit">+</span></h3>
              <span>Restaurants</span>
            </div>
          </div>
        </div>

        <div className="hero-image animate-fade-in-delay">
          <div className="food-blob">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop"
              alt="Delicious gourmet burger"
              className="hero-img"
            />
          </div>
          <div className="floating-badge badge-1 glass-strong">
            🍔 Fresh & Hot
          </div>
          <div className="floating-badge badge-2 glass-strong">
            ⚡ 30 min delivery
          </div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="features container">
        <div className="section-header">
          <h2>
            Why Choose <span className="gradient-text">BiteSpeed</span>?
          </h2>
          <p>We deliver more than just food — we deliver experiences.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card glass">
            <div className="feature-icon-wrap">
              <span className="feature-icon">🚀</span>
            </div>
            <h3>Lightning Fast</h3>
            <p>
              Average delivery in under 30 minutes. Your food arrives hot and
              fresh, every single time.
            </p>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon-wrap">
              <span className="feature-icon">⭐</span>
            </div>
            <h3>Top Quality</h3>
            <p>
              We partner with only the best restaurants. Every meal is prepared
              with premium ingredients.
            </p>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon-wrap">
              <span className="feature-icon">💳</span>
            </div>
            <h3>Easy Payment</h3>
            <p>
              Multiple payment options including cards, UPI, and cash on
              delivery. Quick and secure checkout.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="cta-section">
        <div className="container cta-content">
          <h2>Ready to <span className="gradient-text">Order</span>?</h2>
          <p>Explore our menu and find your next favorite meal</p>
          <button
            onClick={() => navigate("/menu")}
            className="btn-primary cta-btn"
          >
            Browse Menu →
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;