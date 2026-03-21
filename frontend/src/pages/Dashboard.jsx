import { useState } from 'react';
import './Dashboard.css';

const MOCK_ORDERS = [
  { id: '#ORD-001', customer: 'John Doe', items: '2x Margherita, 1x Cola', status: 'Delivered', total: 28.98, date: '10 mins ago' },
  { id: '#ORD-002', customer: 'Sarah Smith', items: '1x Caesar Salad, 1x Water', status: 'Preparing', total: 10.99, date: '25 mins ago' },
  { id: '#ORD-003', customer: 'Mike Johnson', items: '3x Classic Cheeseburger', status: 'Pending', total: 29.97, date: 'Just now' },
];

const Dashboard = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  return (
    <div className="dashboard-page container animate-fade-in">
      <div className="dashboard-header">
        <h1>Admin <span className="gradient-text">Dashboard</span></h1>
        <p>Manage recent orders and store performance.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass">
          <div className="stat-icon">📈</div>
          <div>
            <h3>Total Orders</h3>
            <p className="stat-value">124</p>
          </div>
        </div>
        <div className="stat-card glass">
          <div className="stat-icon">💰</div>
          <div>
            <h3>Revenue</h3>
            <p className="stat-value">$1,240</p>
          </div>
        </div>
        <div className="stat-card glass">
          <div className="stat-icon">⭐</div>
          <div>
            <h3>Avg Rating</h3>
            <p className="stat-value">4.8</p>
          </div>
        </div>
      </div>

      <div className="orders-section glass">
        <h2>Recent Orders</h2>
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
                  <td>{order.customer}<br/><span className="text-sm">{order.date}</span></td>
                  <td>{order.items}</td>
                  <td className="font-bold">${order.total.toFixed(2)}</td>
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
