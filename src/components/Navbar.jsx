import { useState } from "react";
import Brand from "./Brand";
import { navigationLinks } from "./navigationLinks";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPage = new URLSearchParams(window.location.search).get("page") || "home";

  return (
    <nav className="navbar" aria-label="Main navigation">
      <Brand />
      <ul id="primary-navigation" className={`nav-links${menuOpen ? " open" : ""}`}>
        {navigationLinks.map(({ label, href, page }) => (
          <li key={href}>
            <a href={href} aria-current={currentPage === page ? "page" : undefined} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          </li>
        ))}
      </ul>
      <button
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
      </button>
    </nav>
  );
}

export default Navbar;
