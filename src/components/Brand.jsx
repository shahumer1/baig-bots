import logo from "../assets/baig-bots-logo.png";
import "./Brand.css";

function Brand({ variant = "nav" }) {
  return (
    <a className={`brand-lockup brand-lockup--${variant}`} href="?page=home" aria-label="Baig Bots, back to top">
      <img src={logo} alt="" />
      <span>
        Baig Bots{variant === "footer" && <span className="brand-dot">.</span>}
      </span>
    </a>
  );
}

export default Brand;
