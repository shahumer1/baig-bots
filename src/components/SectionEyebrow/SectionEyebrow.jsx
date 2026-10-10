import "./SectionEyebrow.css";

function SectionEyebrow({ children, className = "" }) {
  return <span className={`section-eyebrow ${className}`.trim()}>{children}</span>;
}

export default SectionEyebrow;
