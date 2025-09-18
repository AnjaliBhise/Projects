const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "transparent",
        color: "black",
        padding: "20px 10px",   
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0, fontSize: "0.95rem" }}>
        &copy; {new Date().getFullYear()} <b>PaperLeaf</b>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
