import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const API_URL = 'https://online-food-ordering-system-r9ya.onrender.com/api';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const body = isLogin
        ? { email, password }
        : { name: document.getElementById('signup-name').value, email, password };

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || 'Something went wrong.');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/menu');
      }
    } catch (err) {
      setError('Could not connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page container animate-fade-in">
      <div className="auth-card glass">
        <div className="auth-header">
          <div className="auth-logo">🔥</div>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to order your favorite food' : 'Join BiteSpeed for fast delivery'}</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255,107,107,0.15)',
            border: '1px solid #ff6b6b',
            color: '#ff6b6b',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            fontSize: '0.9rem',
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}

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
          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>

        <div className="auth-divider"><span>or</span></div>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button className="text-btn accent" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
