import { useEffect, useState } from "react";
import "./adminOrders.css";
// import "./admin.css";

const AdminOrders = () => {
  const [groupedOrders, setGroupedOrders] = useState({});
  const [openUser, setOpenUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders/admin/all")
      .then(res => res.json())
      .then(data => {
        const grouped = data.reduce((acc, order) => {
          if (!acc[order.username]) acc[order.username] = [];
          acc[order.username].push(order);
          return acc;
        }, {});
        setGroupedOrders(grouped);
      })
      .catch(console.error);
  }, []);

  const toggleUser = (username) => {
    setOpenUser(openUser === username ? null : username);
  };

  return (
    <div className="admin-orders-page">
      <h2>Orders by User</h2>

      {Object.keys(groupedOrders).length === 0 && <p>No orders found</p>}

      <table className="admin-orders-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Total Orders</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(groupedOrders).map(([username, orders]) => (
            <>
              {/* USER ROW */}
              <tr key={username} className="user-row">
                <td>{username}</td>
                <td>{orders.length}</td>
                <td>
                  <button
                    className="toggle-btn"
                    onClick={() => toggleUser(username)}
                  >
                    {openUser === username ? "Hide Orders" : "View Orders"}
                  </button>
                </td>
              </tr>

              {/* EXPANDED ORDERS */}
              {openUser === username && (
                <tr className="orders-expand-row">
                  <td colSpan="3">
                    <table className="user-orders-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Payment</th>
                          <th>Items</th>
                          <th>Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {orders.map(order => (
                          <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                            <td>{order.paymentMethod}</td>
                            <td>
                              {order.items.map(item => (
                                <div key={item.productId}>
                                  {item.title} × {item.quantity}
                                </div>
                              ))}
                            </td>
                            <td>₹ {order.totalAmount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
