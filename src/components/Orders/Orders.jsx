import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import "./orders.css";

const Orders = () => {
  const username = useSelector(state => state.login.username);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!username) return;

    fetch(`http://localhost:5000/api/orders/${encodeURIComponent(username)}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [username]);

  return (
    <>
      {/* ✅ Navbar ALWAYS rendered */}
      <Navbar 
        activePage="orders" 
        showSearchBar={false} 
        showHomeIcon={true}
      />

      {orders.length === 0 ? (
        <div className="orders-page-empty">
          🧾 No orders yet. Start shopping!
        </div>
      ) : (
        <div className="orders-page">
          <h2>Orders History</h2>

          {orders.map(order => (
            <div key={order._id} className="order-card">
              <p><b>Order ID:</b> {order._id}</p>
              <p><b>Total:</b> ₹ {order.totalAmount}</p>

              {order.items.map(item => (
                <div key={item.productId}>
                  {item.title} × {item.quantity}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Orders;
