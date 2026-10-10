import Section from "../../../components/Section/Section";
import "./BreakSection.css";
import SectionEyebrow from "../../../components/SectionEyebrow/SectionEyebrow";

function BreakSection() {
  return (
    <Section circuits darkCircuits containerClassName="break-section-inner" className="break-section" aria-labelledby="break-heading">

        <SectionEyebrow className="break-eyebrow">FROM IDEA TO IMPACT</SectionEyebrow>
        <h2 id="break-heading">
          Make room for <span>what comes next.</span>
        </h2>
        <p>
          The best ideas deserve space to grow. Let&apos;s turn yours into
          something people can use.
        </p>
    </Section>
  );
}

export default BreakSection;
