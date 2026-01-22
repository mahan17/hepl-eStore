import { useNavigate } from "react-router-dom";
import { FiPower, FiHome } from "react-icons/fi";
import "./adminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="admin-navbar">
      <h1>ShopEase Admin Page</h1>

      <div className="admin-nav-actions">
        {/* Dashboard button */}
        <button
          className="dashboard-btn"
          onClick={() => navigate("/admin")}
          title="Dashboard"
        >
          <FiHome size={16} /> Home
        </button>

        {/* Logout button */}
        <button
          className="logout-btn"
          onClick={handleLogout}
          title="Logout"
        >
          <FiPower size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
