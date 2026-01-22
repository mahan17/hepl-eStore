import { NavLink, Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "./admin.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">Admin</h2>

        <ul className="sidebar-menu">
          <li>
            <NavLink to="/admin/users">👤 Users</NavLink>
          </li>
          <li>
            <NavLink to="/admin/products">📦 Products</NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders">🧾 Orders</NavLink>
          </li>
        </ul>
      </aside>

      {/* Right Side Content */}
       <div className="admin-right">
        <AdminNavbar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
