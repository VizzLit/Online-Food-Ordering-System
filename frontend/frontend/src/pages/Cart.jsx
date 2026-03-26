import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, setCart }) => {
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutComplete(true);
    setCart([]); // Clear cart
  };

  if (checkoutComplete) {
    return (
      <div className="cart-page container container-centered animate-fade-in">
        <div className="success-card glass">
          <div className="success-icon">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p>Your delicious food is being prepared and will be delivered shortly.</p>
          <Link to="/menu" className="btn-primary mt-4">Order More Food</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container animate-fade-in">
      <div className="cart-header">
        <h1>Your <span className="gradient-text">Cart</span></h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart glass">
          <h2>Your cart is empty 😢</h2>
          <p>Explore our menu and discover your next favorite meal.</p>
          <Link to="/menu" className="btn-primary mt-4">Browse Menu</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item glass">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-cat">{item.category}</p>
                </div>
                <div className="cart-item-price">
                  ${item.price.toFixed(2)}
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => handleRemove(index)}
                  title="Remove Item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary glass">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>$2.99</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${(total + 2.99).toFixed(2)}</span>
            </div>
            
            <button className="btn-primary checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;