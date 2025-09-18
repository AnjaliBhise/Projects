import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Admin not authenticated. Please log in.");
      return;
    }

    fetch("http://localhost:8080/api/orders/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to fetch orders: ${response.status}`);
        return response.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => setError(err.message));
  }, []);

  const markAsDelivered = (orderId) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/api/orders/deliver/${orderId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update order status");
        return response.text();
      })
      .then(() => {
        toast.success("Order marked as Delivered!");
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, status: "DELIVERED" } : order
          )
        );
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px" }}>Admin - Manage Orders</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Payment</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={tdStyle}>{order.id}</td>
                <td style={tdStyle}>{order.user?.email || "Unknown"}</td>
                <td style={tdStyle}>₹{order.totalAmount}</td>
                <td style={tdStyle}>{order.status}</td>
                <td style={tdStyle}>{order.paymentMethod}</td>
                <td style={tdStyle}>
                  {order.status !== "DELIVERED" ? (
                    <button
                      onClick={() => markAsDelivered(order.id)}
                      style={{
                        backgroundColor: "#4b0035",
                        color: "#fff",
                        padding: "6px 12px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Mark as Delivered
                    </button>
                  ) : (
                    "Delivered"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = { padding: "10px", textAlign: "left", fontWeight: "bold" };
const tdStyle = { padding: "10px" };

export default AdminOrders;
