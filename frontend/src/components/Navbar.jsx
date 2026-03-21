import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const location = useLocation();

  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          🍔 <span>Bite<span className="accent">Speed</span></span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/menu" className={location.pathname === '/menu' ? 'active' : ''}>Menu</Link>
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
        </div>
        <div className="nav-actions">
          <Link to="/cart" className="cart-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link to="/login" className="btn-primary login-btn">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
