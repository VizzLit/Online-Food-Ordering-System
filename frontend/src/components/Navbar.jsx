import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar({ cartCount }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar glass-strong">
      <div className="nav-container container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🔥</span>
          <span className="logo-text">
            Bite<span className="gradient-text">Speed</span>
          </span>
        </Link>

        <div className={`nav-links ${mobileOpen ? "nav-links--open" : ""}`}>
          <Link
            to="/"
            className={isActive("/") ? "active" : ""}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className={isActive("/menu") ? "active" : ""}
            onClick={() => setMobileOpen(false)}
          >
            Menu
          </Link>
          <Link
            to="/dashboard"
            className={isActive("/dashboard") ? "active" : ""}
            onClick={() => setMobileOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/login"
            className="nav-login-mobile"
            onClick={() => setMobileOpen(false)}
          >
            Login
          </Link>
        </div>

        <div className="nav-actions">
          <Link to="/cart" className="cart-btn" id="cart-button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>

          <Link to="/login" className="btn-primary nav-login-btn" id="login-button">
            Login
          </Link>

          <button
            className="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <span className={`bar ${mobileOpen ? "bar--open" : ""}`}></span>
            <span className={`bar ${mobileOpen ? "bar--open" : ""}`}></span>
            <span className={`bar ${mobileOpen ? "bar--open" : ""}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;