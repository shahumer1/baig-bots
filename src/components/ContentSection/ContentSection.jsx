import Section from "../Section/Section";
import SectionEyebrow from "../SectionEyebrow/SectionEyebrow";
import "../ContentPage/ContentPage.css";

export default function ContentSection({ title, eyebrow, lead, alternate = false, graph = false, containerClassName = "content-block-inner", children }) {
  return (
    <Section className={`content-block${alternate ? " content-block-alternate" : ""}`} containerClassName={containerClassName} graph={graph}>
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <h2>{title}</h2>
      {lead && <p className="content-group-lead">{lead}</p>}
      {children}
    </Section>
  );
}
