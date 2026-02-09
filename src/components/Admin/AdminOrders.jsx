import { useEffect, useState, Fragment } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./adminOrders.css";

// Register AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);

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

      {Object.entries(groupedOrders).map(([username, orders]) => (
        <Fragment key={username}>
          {/* USER GRID */}
          <div
            className="ag-theme-quartz"
            style={{ height: 300, width: "100%" }}
          >
            <AgGridReact
              rowData={[
                {
                  username,
                  totalOrders: orders.length
                }
              ]}
              columnDefs={[
                { field: "username", headerName: "User", flex: 1 },
                {
                  field: "totalOrders",
                  headerName: "Total Orders",
                  width: 160
                },
                {
                  headerName: "Action",
                  width: 160,
                  cellRenderer: () => (
                    <button
                      className="toggle-btn"
                      onClick={() => toggleUser(username)}
                    >
                      {openUser === username
                        ? "Hide Orders"
                        : "View Orders"}
                    </button>
                  )
                }
              ]}
              headerHeight={40}
              rowHeight={40}
              suppressRowClickSelection
            />
          </div>

          {/* ORDERS GRID */}
          {openUser === username && (
            <div
              className="ag-theme-alpine"
              style={{ height: 300, marginBottom: 20 }}
            >
              <AgGridReact
                rowData={orders}
                columnDefs={[
                  { field: "_id", headerName: "Order ID", flex: 1 },
                  {
                    field: "createdAt",
                    headerName: "Date",
                    width: 180,
                    valueFormatter: p =>
                      new Date(p.value).toLocaleString()
                  },
                  {
                    field: "paymentMethod",
                    headerName: "Payment",
                    width: 150
                  },
                  {
                    headerName: "Items",
                    flex: 2,
                    valueGetter: p =>
                      p.data.items
                        .map(i => `${i.title} × ${i.quantity}`)
                        .join(", ")
                  },
                  {
                    field: "totalAmount",
                    headerName: "Total",
                    width: 120,
                    valueFormatter: p => `₹ ${p.value}`
                  }
                ]}
                defaultColDef={{
                  sortable: true,
                  filter: true
                }}
              />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default AdminOrders;
