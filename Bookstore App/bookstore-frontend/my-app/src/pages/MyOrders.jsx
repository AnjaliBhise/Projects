import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userDashboardBg from "../assets/booklist1.jpg";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view your orders.");
      return;
    }

    const userId = JSON.parse(atob(token.split(".")[1])).userId;

    fetch(`http://localhost:8080/api/orders/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then(setOrders)
      .catch((err) => setError(err.message));
  }, []);

  const handleCancel = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/cancel/${orderId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to cancel the order");

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "CANCELLED" } : order
        )
      );
      toast.success("Order cancelled successfully!");
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `url(${userDashboardBg}) no-repeat center top`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#4b0035" }}>
        My Orders
      </h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {orders.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th style={tableHeaderStyle}>Book Title</th>
                <th style={tableHeaderStyle}>Shipping Address</th>
                <th style={tableHeaderStyle}>Total Amount</th>
                <th style={tableHeaderStyle}>Order Date</th>
                <th style={tableHeaderStyle}>Payment Method</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ textAlign: "center" }}>
                  <td style={tableCellStyle}>{order.bookTitle}</td>
                  <td style={tableCellStyle}>{order.shippingAddress}</td>
                  <td style={tableCellStyle}>₹{order.totalAmount}</td>
                  <td style={tableCellStyle}>
                    {new Date(order.orderDate).toLocaleString()}
                  </td>
                  <td style={tableCellStyle}>{order.paymentMethod}</td>
                  <td style={tableCellStyle}>{order.status}</td>
                  <td style={tableCellStyle}>
                    {order.status !== "CANCELLED" &&
                    order.status !== "DELIVERED" ? (
                      <button
                        onClick={() => handleCancel(order.id)}
                        style={{
                          backgroundColor: "#ff4d4d",
                          color: "#fff",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No orders found.</p>
      )}
    </div>
  );
};
const tableHeaderStyle = {
  padding: "12px",
  backgroundColor: "#4b0035",
  color: "#fff",
  fontWeight: "bold",
};

const tableCellStyle = {
  padding: "12px",
  borderBottom: "1px solid #ccc",
};

export default MyOrders;
