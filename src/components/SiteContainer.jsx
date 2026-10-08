import "./SiteContainer.css";

function SiteContainer({ children, className = "" }) {
  return <div className={`site-container ${className}`.trim()}>{children}</div>;
}

export default SiteContainer;
