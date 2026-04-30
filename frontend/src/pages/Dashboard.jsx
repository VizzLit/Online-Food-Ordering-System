import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const API_URL = 'https://online-food-ordering-system-r9ya.onrender.com/api';

const MOCK_ORDERS = [
  { id: '#ORD-001', customer: 'Rahul Sharma', items: '2x Margherita, 1x Cola', status: 'Delivered', total: 548, date: '10 mins ago' },
  { id: '#ORD-002', customer: 'Priya Singh', items: '1x Dragon Roll, 1x Miso Soup', status: 'Preparing', total: 499, date: '25 mins ago' },
  { id: '#ORD-003', customer: 'Arjun Patel', items: '3x Classic Cheeseburger', status: 'Pending', total: 447, date: 'Just now' },
  { id: '#ORD-004', customer: 'Sneha Gupta', items: '1x Pepperoni Feast, 2x Nachos', status: 'Delivered', total: 707, date: '1 hour ago' },
];

const Dashboard = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(storedUser);

    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${API_URL}/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.orders?.length > 0) setOrders(data.orders);
        })
        .catch(() => {});
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || o.totalAmount || 0), 0);

  return (
    <div className="dashboard-page container animate-fade-in">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Admin <span className="gradient-text">Dashboard</span></h1>
          <p>Welcome back{user?.name ? `, ${user.name}` : ''}! Manage orders and track performance</p>
        </div>
        <button onClick={handleLogout} className="btn-secondary" style={{ alignSelf: 'center' }}>
          🚪 Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass">
          <div className="stat-icon-wrap gradient-bg">📦</div>
          <div><span className="stat-label">Total Orders</span><p className="stat-value">{orders.length}</p></div>
        </div>
        <div className="stat-card glass">
          <div className="stat-icon-wrap gradient-bg">💰</div>
          <div><span className="stat-label">Revenue</span><p className="stat-value">₹{totalRevenue.toLocaleString()}</p></div>
        </div>
        <div className="stat-card glass">
          <div className="stat-icon-wrap gradient-bg">⭐</div>
          <div><span className="stat-label">Avg Rating</span><p className="stat-value">4.8</p></div>
        </div>
        <div className="stat-card glass">
          <div className="stat-icon-wrap gradient-bg">🚀</div>
          <div><span className="stat-label">Avg Delivery</span><p className="stat-value">28 min</p></div>
        </div>
      </div>

      <div className="orders-section glass">
        <div className="orders-title">
          <h2>Recent Orders</h2>
          <span className="orders-count">{orders.length} orders</span>
        </div>
        <div className="table-responsive">
          <table className="orders-table">
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id || order._id}>
                  <td className="font-mono">{order.id || order._id}</td>
                  <td>{order.customer || order.user?.name || 'Customer'}<br /><span className="text-sm">{order.date || ''}</span></td>
                  <td>{order.items || order.orderItems?.map((i) => `${i.quantity}x ${i.name}`).join(', ')}</td>
                  <td className="font-bold">₹{order.total || order.totalAmount}</td>
                  <td><span className={`status-badge status-${(order.status || '').toLowerCase()}`}>{order.status}</span></td>
                  <td>
                    {order.status === 'Pending' && <button className="btn-secondary btn-sm" onClick={() => updateStatus(order.id || order._id, 'Preparing')}>Accept</button>}
                    {order.status === 'Preparing' && <button className="btn-primary btn-sm" onClick={() => updateStatus(order.id || order._id, 'Delivered')}>Deliver</button>}
                    {order.status === 'Delivered' && <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Completed</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
