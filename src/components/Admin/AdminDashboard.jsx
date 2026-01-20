import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <Navbar showSearchBar={false} /> */}

      <div className="admin-page">
        <h1>Admin Dashboard</h1>

        <div className="admin-grid">
          <div onClick={() => navigate("/admin/users")}>
            👤 Users
          </div>

          <div onClick={() => navigate("/admin/products")}>
            📦 Products
          </div>

          <div onClick={() => navigate("/admin/orders")}>
            🧾 Orders
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
