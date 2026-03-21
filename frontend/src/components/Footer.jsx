import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-surface">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3>Bite<span className="accent">Speed</span></h3>
          <p>The fastest food delivery service in town, serving hot and fresh food to your doorsteps since 2024.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div className="footer-links">
          <h4>Legal</h4>
          <Link to="#">Terms of Service</Link>
          <Link to="#">Privacy Policy</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BiteSpeed by Team Leader & Co. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
