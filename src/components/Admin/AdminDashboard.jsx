import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import "./admin.css";
// import './sideBar.css';
// import './adminStats.css'

// DATA FROM DB (API)
import { useEffect, useState } from "react";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [usersData, setUsersData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/dashboard");
      const data = await res.json();

      setUsersData(data.usersGrowth);
      setOrdersData(data.ordersMonthly);
      setProductsByCategory(data.productsByCategory);
    } catch (err) {
      console.error("Dashboard API error", err);
    }
  };
  

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">Admin</h2>

        <ul className="sidebar-menu">
          <li onClick={() => navigate("/admin/users")}>👤 Users</li>
          <li onClick={() => navigate("/admin/products")}>📦 Products</li>
          <li onClick={() => navigate("/admin/orders")}>🧾 Orders</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <h1>Dashboard Overview</h1>

        {/* Summary Cards */}
        <div className="stats-grid">
          <div className="stat-card">👤 Users<br /><b>{usersData?.at(-1)?.count || 0}</b></div>
          <div className="stat-card">📦 Products<br /><b>{productsByCategory.reduce((a, b) => a + b.value, 0)}</b></div>
          <div className="stat-card">🧾 Orders<br /><b>{ordersData.reduce((a, b) => a + b.orders, 0)}</b></div>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          {/* Line Chart */}
          <div className="chart-card">
            <h3>User Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={usersData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line dataKey="count" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="chart-card">
            <h3>Orders per Month</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ordersData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="chart-card full-width">
            <h3>Products by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={productsByCategory} dataKey="value" nameKey="name" outerRadius={110}>
                  {productsByCategory.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;