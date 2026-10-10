import Brand from "../Brand/Brand";
import SiteContainer from "../SiteContainer/SiteContainer";
import NavigationLinks from "../NavigationLinks/NavigationLinks";
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

          <NavigationLinks className="footer-links" aria-label="Footer navigation" />
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
