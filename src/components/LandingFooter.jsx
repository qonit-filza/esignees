import React from "react";

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{ backgroundColor: "black", color: "white" }}
    >
      <p className="copyright">&copy; {new Date().getFullYear()} esignee</p>
      <ul className="footer-links">
        <li>
          <p href="#" style={{ color: "white" }}>
            About
          </p>
        </li>
        <li>
          <p href="#" style={{ color: "white" }}>
            Contact
          </p>
        </li>
        <li>
          <p href="#" style={{ color: "white" }}>
            Terms of Use
          </p>
        </li>
        <li>
          <p href="#" style={{ color: "white" }}>
            Privacy Policy
          </p>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
