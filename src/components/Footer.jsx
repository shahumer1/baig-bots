import "./Footer.css";
import logo from "../assets/baig-bots-logo.png";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div>
            <a className="footer-brand" href="#home">
              <img src={logo} alt="" className="footer-logo" />
              <span>Baig Bots<span className="footer-brand-dot">.</span></span>
            </a>
            <p>Ideas, built into real digital experiences.</p>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} Baig Bots. All rights reserved.</small>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
