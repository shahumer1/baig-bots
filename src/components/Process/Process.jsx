import ContentSection from "../ContentSection/ContentSection";
import InfoCard from "../InfoCard/InfoCard";

export default function Process({ title, steps, eyebrow = "HOW WE WORK" }) {
  return (
    <ContentSection title={title} eyebrow={eyebrow}>
      <div className="content-process-grid">
        {steps.map((step, index) => <InfoCard as="div" className="content-process-step" key={step.title} {...step} number={String(index + 1).padStart(2, "0")} />)}
      </div>
    </ContentSection>
  );
}
