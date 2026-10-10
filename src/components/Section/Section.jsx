import GraphBackground from "../GraphBackground/GraphBackground";
import CircuitDots from "../CircuitDots/CircuitDots";
import SiteContainer from "../SiteContainer/SiteContainer";

export default function Section({ className = "", containerClassName = "", graph = false, circuits = false, darkCircuits = false, children, ...props }) {
  return (
    <section className={className} {...props}>
      {graph && <GraphBackground />}
      {circuits && <CircuitDots dark={darkCircuits} />}
      <SiteContainer className={containerClassName}>{children}</SiteContainer>
    </section>
  );
}
