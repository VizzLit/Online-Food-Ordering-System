import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login success
    navigate('/dashboard');
  };

  return (
    <div className="login-page container animate-fade-in">
      <div className="auth-card glass">
        <div className="auth-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to order your favorite food' : 'Join BiteSpeed for fast delivery'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>
          )}
          
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" placeholder="john@example.com" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          <button type="submit" className="btn-primary auth-submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button className="text-btn accent" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
          {isLogin && (
            <button className="text-btn">Login as Admin</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;