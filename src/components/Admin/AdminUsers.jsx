import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./adminUsers.css";

const AdminUsers = () => {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();

    setAdmins(data.filter(u => u.role === "admin"));
    setUsers(data.filter(u => u.role !== "admin"));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const removeUser = async (id) => {
    if (!window.confirm("Remove this user?")) return;

    const res = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    alert(data.message);
    fetchUsers();
  };

  return (
    <>
      <div className="admin-users">

        {/* ================= ADMINS ================= */}
        <h2>Admins</h2>
        <table className="users-table admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin._id}>
                <td>{index + 1}</td>
                <td>{admin.username}</td>
                <td>
                  <span className="role admin">admin</span>
                </td>
                <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ================= USERS ================= */}
        <h2 className="section-gap">Users</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>
                  <span className="role user">user</span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => removeUser(user._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
};

export default AdminUsers;
