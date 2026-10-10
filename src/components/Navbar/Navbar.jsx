import { useState } from "react";
import Brand from "../Brand/Brand";
import NavigationLinks from "../NavigationLinks/NavigationLinks";
import Button from "../Button/Button";
import "./Navbar.css";

function Navbar({ currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar" aria-label="Main navigation">
      <Brand />
      <NavigationLinks as="ul" id="primary-navigation" className={`nav-links${menuOpen ? " open" : ""}`} currentPage={currentPage} onNavigate={() => setMenuOpen(false)} />
      <Button variant="unstyled"
        type="button"
        className={`menu-toggle${menuOpen ? " active" : ""}`}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
      >
        <span />
        <span />
        <span />
      </Button>
    </nav>
  );
}

export default Navbar;
