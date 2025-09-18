import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import loginRegBackground from "../assets/login_reg.jpg";

const ViewProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: ""
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
    if (!email) return;

    fetch(`http://localhost:8080/api/users/email/${email}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setFormData({
          name: data.name || "",
          address: data.address || "",
          email: data.email || ""
        });
      })
      .catch((err) => console.error("Failed to fetch user:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <h2 className="text-center mb-4">My Profile</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly
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
              readOnly
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

          <div
  className="text-center mt-4"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px", 
    marginTop: "30px",
    backgroundColor: "#6b4f4f",
    color: "white",
    height: "40px",
    borderRadius: "30px",
    fontFamily: "'Merienda', cursive",
    fontSize: "1.1rem",
    cursor: "pointer"
  }}
>
  <span>Want to edit the profile?</span>
  <a
    href="/editprofile"
    style={{ textDecoration: "underline", color: "white", fontWeight: "bold" }}
  >
    Edit
  </a>
</div>

        </form>
      </div>
    </div>
  );
};

export default ViewProfile;
 