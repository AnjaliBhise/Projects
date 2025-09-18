import React, { useEffect, useState } from "react";
import AdminDashboardHeader from "../components/AdminDashboardHeader";
import manageOrderBg from "../assets/manageOrder.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/orders/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load orders.");
      setLoading(false);
    }
  };

  const markAsDelivered = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/orders/deliver/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      toast.success("Order marked as delivered successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update order status.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const deleteOrder = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      toast.success("Order deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (err) {
      toast.error("Failed to delete the order.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        backgroundImage: `url(${manageOrderBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="header-wrapper" style={{ paddingTop: "20px" }}>
        <AdminDashboardHeader />
      </div>
      <h2
        style={{
          textAlign: "center",
          color: "black",
          margin: "30px 0 20px",
          fontSize: "28px",
        }}
      >
        Manage Orders
      </h2>

      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "93%",
          margin: "0 auto",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                User
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Address
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Total Amount
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Status
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                }}
              >
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {order.user?.name || "N/A"}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {order.shippingAddress}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  ₹{order.totalAmount}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  <span
                    style={{
                      color: order.status === "PLACED" ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {order.status === "ORDER PLACED" ? (
                    <button
                      onClick={() => markAsDelivered(order.id)}
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Mark as Delivered
                    </button>
                  ) : order.status === "DELIVERED" || order.status === "CANCELLED" ? (
                    <button
                      onClick={() => deleteOrder(order.id)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Delete Order
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageOrders;
