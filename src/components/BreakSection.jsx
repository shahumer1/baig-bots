import "./BreakSection.css";
import CircuitDots from "./CircuitDots";
import SectionEyebrow from "./SectionEyebrow";
import SiteContainer from "./SiteContainer";

function BreakSection() {
  return (
    <section className="break-section" aria-labelledby="break-heading">
      <CircuitDots dark />
      <SiteContainer className="break-section-inner">
        <SectionEyebrow className="break-eyebrow">FROM IDEA TO IMPACT</SectionEyebrow>
        <h2 id="break-heading">
          Make room for <span>what comes next.</span>
        </h2>
        <p>
          The best ideas deserve space to grow. Let&apos;s turn yours into
          something people can use.
        </p>
      </SiteContainer>
    </section>
  );
}

export default BreakSection;
