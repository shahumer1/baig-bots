import "./CircuitDots.css";

function CircuitDots({ dark = false }) {
  return (
    <div className={`circuit-dots${dark ? " circuit-dots-dark" : ""}`} aria-hidden="true">
      <span className="circuit-path circuit-path-one"><i className="moving-dot" /></span>
      <span className="circuit-path circuit-path-two"><i className="moving-dot" /></span>
      <span className="circuit-path circuit-path-three"><i className="moving-dot" /></span>
      <span className="circuit-path circuit-path-four"><i className="moving-dot" /></span>
    </div>
  );
}

export default CircuitDots;
