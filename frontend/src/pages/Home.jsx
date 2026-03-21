import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home animate-fade-in">
      {/* Hero Section */}
      <section className="hero container">
        <div className="hero-content">
          <h1>Delicious Food, <br/><span className="gradient-text">Delivered Fast.</span></h1>
          <p className="hero-subtitle">
            Experience the best online food ordering system. Fresh ingredients, masterful chefs, and lightning-fast delivery straight to your door.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn-primary">
              Order Now
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
            <Link to="/dashboard" className="btn-secondary">Track Order</Link>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <h3>4.9★</h3>
              <span>2k+ Reviews</span>
            </div>
            <div className="stat">
              <h3>30min</h3>
              <span>Avg Delivery</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          {/* A high quality abstract food placeholder image, represented by CSS shapes/gradients or a placeholder URL */}
          <div className="food-blob">
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Delicious Pizza" className="hero-img-real" />
            <div className="floating-badge badge-1 glass">🔥 Hot & Fresh</div>
            <div className="floating-badge badge-2 glass">⭐ Top Rated</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <div className="section-header">
          <h2>Why Choose <span className="gradient-text">BiteSpeed?</span></h2>
          <p>We redefine your dining experience at home.</p>
        </div>
        <div className="grid-cards">
          <div className="feature-card glass">
            <div className="feature-icon">🚀</div>
            <h3>Fast Delivery</h3>
            <p>We deliver your food in under 30 minutes, keeping it hot and fresh.</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">🥗</div>
            <h3>Fresh Ingredients</h3>
            <p>Locally sourced, organic ingredients prepared by top chefs.</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">💳</div>
            <h3>Easy Payment</h3>
            <p>Seamless and secure checkout options for a smooth experience.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;