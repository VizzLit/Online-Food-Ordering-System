import { useState } from 'react';
import './Dashboard.css';

const MOCK_ORDERS = [
  { id: '#ORD-001', customer: 'Rahul Sharma', items: '2x Margherita, 1x Cola', status: 'Delivered', total: 548, date: '10 mins ago' },
  { id: '#ORD-002', customer: 'Priya Singh', items: '1x Dragon Roll, 1x Miso Soup', status: 'Preparing', total: 499, date: '25 mins ago' },
  { id: '#ORD-003', customer: 'Arjun Patel', items: '3x Classic Cheeseburger', status: 'Pending', total: 447, date: 'Just now' },
  { id: '#ORD-004', customer: 'Sneha Gupta', items: '1x Pepperoni Feast, 2x Nachos', status: 'Delivered', total: 707, date: '1 hour ago' },
];

const Dashboard = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="dashboard-page container animate-fade-in">
      <div className="dashboard-header">
        <h1>Admin <span className="gradient-text">Dashboard</span></h1>
        <p>Manage orders and track store performance</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card glass">
          <div className="stat-icon-wrap gradient-bg">📦</div>
          <div>
            <span className="stat-label">Total Orders</span>
            <p className="stat-value">{orders.length}</p>
          </div>
        </div>
        <div className="stat-card glass">
          <div className="stat-icon-wrap gradient-bg">💰</div>
          <div>
            <span className="stat-label">Revenue</span>
            <p className="stat-value">₹{totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        <div className="stat-card glass">
          <div className="stat-icon-wrap gradient-bg">⭐</div>
          <div>
            <span className="stat-label">Avg Rating</span>
            <p className="stat-value">4.8</p>
          </div>
        </div>
        <div className="stat-card glass">
          <div className="stat-icon-wrap gradient-bg">🚀</div>
          <div>
            <span className="stat-label">Avg Delivery</span>
            <p className="stat-value">28 min</p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-section glass">
        <div className="orders-title">
          <h2>Recent Orders</h2>
          <span className="orders-count">{orders.length} orders</span>
        </div>
        <div className="table-responsive">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td className="font-mono">{order.id}</td>
                  <td>
                    {order.customer}
                    <br/><span className="text-sm">{order.date}</span>
                  </td>
                  <td>{order.items}</td>
                  <td className="font-bold">₹{order.total}</td>
                  <td>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.status === 'Pending' && (
                      <button className="btn-secondary btn-sm" onClick={() => updateStatus(order.id, 'Preparing')}>
                        Accept
                      </button>
                    )}
                    {order.status === 'Preparing' && (
                      <button className="btn-primary btn-sm" onClick={() => updateStatus(order.id, 'Delivered')}>
                        Deliver
                      </button>
                    )}
                    {order.status === 'Delivered' && (
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Completed</span>
                    )}
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
