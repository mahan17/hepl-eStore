import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./admin.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/orders")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Navbar showSearchBar={false} />

      <div className="admin-page">
        <h2>Orders</h2>

        {orders.map(order => (
          <div key={order._id} className="order-card">
            <h4>User: {order.username}</h4>
            <p>Total Items: {order.totalQuantity}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminOrders;
