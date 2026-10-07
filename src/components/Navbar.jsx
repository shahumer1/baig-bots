import { useState } from "react";
import "./Navbar.css";
import logo from "../assets/baig-bots-logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="brand">
        <img src={logo} alt="Baig Bots Logo" className="brand-logo" />
        <span className="brand-name">Baig Bots</span>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <a href="#home" className="active" onClick={() => setMenuOpen(false)}>
            Home
          </a>
        </li>

        <li>
          <a href="#services" className="dropdown-link" onClick={() => setMenuOpen(false)}>
            Services
            <span className="chevron"></span>
          </a>
        </li>

        <li>
          <a href="#solutions" className="dropdown-link" onClick={() => setMenuOpen(false)}>
            Solutions
            <span className="chevron"></span>
          </a>
        </li>

        <li>
          <a href="#cases" onClick={() => setMenuOpen(false)}>
            Cases
          </a>
        </li>

        <li>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
        </li>

        <li>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </li>
      </ul>

      <button
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

export default Navbar;