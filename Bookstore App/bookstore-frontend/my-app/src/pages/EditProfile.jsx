import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import loginRegBackground from "../assets/login_reg.jpg";

const EditUserPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    password: ""
  });

  const extractEmailFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.sub;
    } catch (err) {
      console.error("Failed to decode JWT:", err);
      return null;
    }
  };

  useEffect(() => {
    const email = extractEmailFromToken();
    if (!email) {
      console.error("Email not found in token");
      return;
    }

    fetch(`http://localhost:8080/api/users/email/${email}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setFormData({
          name: data.name || "",
          address: data.address || "",
          email: data.email || "",
          password: ""
        });
      })
      .catch((err) => console.error("Failed to fetch user:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success("User updated successfully!", {
          position: "top-right",
          autoClose: 3000
        });

        setTimeout(() => navigate("/user-dashboard"), 1500);
      } else {
        toast.error("Failed to update user!", {
          position: "top-right",
          autoClose: 3000
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${loginRegBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: "100px"
      }}
    >
      <div
        className="p-5 rounded shadow"
        style={{
          width: "500px",
          backgroundColor: "white",
          fontFamily: "'Merienda', cursive"
        }}
      >
        <h2 className="text-center mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password if changing"
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#6b4f4f",
              color: "white",
              borderRadius: "30px",
              fontFamily: "'Merienda', cursive"
            }}
          >
            Update
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditUserPage;
