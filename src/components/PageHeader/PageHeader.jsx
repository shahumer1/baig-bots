import Button from "../Button/Button";
import Section from "../Section/Section";
import SectionEyebrow from "../SectionEyebrow/SectionEyebrow";
import "../ContentPage/ContentPage.css";

export default function PageHeader({ kicker, title, lead }) {
  return (
    <Section className="content-hero" containerClassName="content-hero-inner" graph circuits>
      <div className="content-hero-copy">
        <SectionEyebrow>{kicker}</SectionEyebrow>
        <h1>{title}</h1>
        <p>{lead}</p>
        <Button href="?page=contact" arrow>Start a conversation</Button>
      </div>
      <div className="content-hero-visual" aria-hidden="true">
        <span className="content-orbit content-orbit-one" />
        <span className="content-orbit content-orbit-two" />
        <span className="content-orbit-core">B<span>B</span></span>
        <span className="content-orbit-dot content-orbit-dot-one" />
        <span className="content-orbit-dot content-orbit-dot-two" />
      </div>
    </Section>
  );
}
