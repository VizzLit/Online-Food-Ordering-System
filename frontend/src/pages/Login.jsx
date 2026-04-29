import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-page container animate-fade-in">
      <div className="auth-card glass">
        <div className="auth-header">
          <div className="auth-logo">🔥</div>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to order your favorite food' : 'Join BiteSpeed for fast delivery'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required id="signup-name" />
            </div>
          )}
          
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" placeholder="john@example.com" required id="auth-email" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required id="auth-password" />
          </div>

          {isLogin && (
            <div className="auth-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button type="button" className="forgot-btn">Forgot password?</button>
            </div>
          )}

          <button type="submit" className="btn-primary auth-submit" id="auth-submit-btn">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button className="text-btn accent" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
          {isLogin && (
            <button className="btn-ghost admin-btn" onClick={() => navigate('/dashboard')}>
              🔒 Login as Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;