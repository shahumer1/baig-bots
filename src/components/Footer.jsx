import Brand from "./Brand";
import SiteContainer from "./SiteContainer";
import { navigationLinks } from "./navigationLinks";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <SiteContainer className="footer-inner">
        <div className="footer-main">
          <div>
            <Brand variant="footer" />
            <p>Ideas, built into real digital experiences.</p>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            {navigationLinks.map(({ label, href }) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} Baig Bots. All rights reserved.</small>
          <a href="#top">Back to top ↑</a>
        </div>
      </SiteContainer>
    </footer>
  );
}

export default Footer;
