import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-gradient-line"></div>
      <div className="container footer-content">
        <div className="footer-brand">
          <h3 className="footer-logo">
            <span className="logo-icon">🔥</span>{' '}
            Bite<span className="gradient-text">Speed</span>
          </h3>
          <p>
            The fastest food delivery service in town. Serving hot and fresh
            food to your doorstep since 2024. Quality meals, lightning speed.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Twitter" className="social-link">𝕏</a>
            <a href="#" aria-label="Instagram" className="social-link">📷</a>
            <a href="#" aria-label="LinkedIn" className="social-link">in</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <Link to="#">Terms of Service</Link>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Refund Policy</Link>
        </div>

        <div className="footer-col">
          <h4>Stay Updated</h4>
          <p className="newsletter-text">Get the latest deals and offers directly in your inbox.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="your@email.com" aria-label="Email for newsletter" />
            <button className="btn-primary newsletter-btn">→</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BiteSpeed. Crafted with ❤️ for food lovers.</p>
      </div>
    </footer>
  );
};

export default Footer;
