
import Footer from "../components/Footer";
import backgroundImg from "../assets/about_contact.jpg"; 

const AboutUs = () => {
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
        About Us
      </h1>

      <p style={{ fontSize: "1.2rem", maxWidth: "700px", textAlign: "center" }}>
        Welcome to PaperLeaf! We are passionate about providing readers with a
        curated selection of books that inspire, educate, and entertain. Our
        mission is to make quality books accessible to everyone, anywhere.
      </p>

      <div>
        <Footer />
      </div>

    </div>
  );
};

export default AboutUs;
