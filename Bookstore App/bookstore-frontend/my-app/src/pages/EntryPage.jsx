import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import EntryHeader from "../components/EntryHeader";
import Footer from "../components/Footer";
import entryBackground from "../assets/entry.jpg";

const EntryPage = () => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${entryBackground})`,
          backgroundSize: "100% 100%", 
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <EntryHeader />

        <div
          className="flex-grow-1 d-flex flex-column justify-content-center text-start ps-5 ps-md-7"
          style={{
            maxWidth: "600px",
            paddingTop: "100px",
            paddingBottom: "30px",
            marginLeft: "30px"
          }}
        >
          <h1
            className="fw-bold"
            style={{
              fontFamily: "'Merienda', cursive",
              color: "#3b3b3b",
            }}
          >
            Welcome to PaperLeaf
          </h1>

          <blockquote
            className="mt-4"
            style={{
              fontStyle: "italic",
              fontSize: "1.5rem",
              fontFamily: "'Georgia', serif",
              lineHeight: "1.6",
              color: "#4a4a4a",
            }}
          >
            "A reader lives a thousand lives before he dies. The man who never reads lives only one."
            <footer
              className="mt-2"
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#5c5c5c",
              }}
            >
              – George R.R. Martin
            </footer>
          </blockquote>

          <Link
            to="/login"
            className="btn btn-sm mt-4 shadow-sm text-white fw-semibold"
            style={{
              width: "140px",
              backgroundColor: "#6b4f4f",
              fontFamily: "'Merienda', cursive",
              borderRadius: "30px",
              transition: "all 0.3s ease",
              display: "inline-block",
              textAlign: "center",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a3e3e")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6b4f4f")}
          >
            Explore Now
          </Link>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default EntryPage;
