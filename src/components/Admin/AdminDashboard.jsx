import { useNavigate } from "react-router-dom";
import "./admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">Admin</h2>

        <ul className="sidebar-menu">
          <li onClick={() => navigate("/admin/users")}>
            👤 Users
          </li>
          <li onClick={() => navigate("/admin/products")}>
            📦 Products
          </li>
          <li onClick={() => navigate("/admin/orders")}>
            🧾 Orders
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <h1>Admin Dashboard</h1>
        <p>Select an option from the sidebar</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
