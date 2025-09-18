import backgroundImg from "../assets/about_contact.jpg";
import Footer from "../components/Footer";

const ContactUs = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 20px",
        color: "#333",
      }}
    >
      <h1 style={{ fontFamily: "'Merienda', cursive", marginBottom: "20px" }}>
        Contact Us
      </h1>

      <p style={{ fontSize: "1.2rem", maxWidth: "700px", textAlign: "center" }}>
        Have questions or need assistance? We're here to help! You can reach
        out to us via email at support@paperleaf.com or call us at
        +1-234-567-890.
      </p>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
