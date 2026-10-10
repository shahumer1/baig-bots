import Button from "../Button/Button";
import Section from "../Section/Section";
import SectionEyebrow from "../SectionEyebrow/SectionEyebrow";
import { pageContent } from "../../content/siteContent";
import "../ContentPage/ContentPage.css";

export default function RelatedPages({ ids }) {
  if (!ids?.length) return null;
  return (
    <Section className="content-related" containerClassName="content-related-inner">
      <div><SectionEyebrow>KEEP EXPLORING</SectionEyebrow><h2>Find the right next step.</h2></div>
      <div className="content-related-links">
        {ids.map((id) => <Button key={id} href={`?page=${id}`} variant="plain" arrow>
          {pageContent[id]?.shortTitle || pageContent[id]?.kicker || (id === "services" ? "All services" : "Portfolio")}
        </Button>)}
      </div>
    </Section>
  );
}
