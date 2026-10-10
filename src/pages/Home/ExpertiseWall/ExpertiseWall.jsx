import { LuLayers } from "react-icons/lu";
import Section from "../../../components/Section/Section";
import GraphBackground from "../../../components/GraphBackground/GraphBackground";
import InfoCard from "../../../components/InfoCard/InfoCard";
import VerticalMarquee from "../../../components/VerticalMarquee/VerticalMarquee";
import { homeServices } from "../../../content/homeServices";
import "./ExpertiseWall.css";

const columns = [0, 1, 2].map((index) => homeServices.filter((_, itemIndex) => itemIndex % 3 === index));

function renderCard(service) {
  return <InfoCard key={service.id} className="expertise-card" kicker={service.category} title={service.title} text={service.text} />;
}

export default function ExpertiseWall() {
  return (
    <Section graph circuits className="expertise-section" containerClassName="expertise-container" aria-labelledby="expertise-heading">
      <div className="expertise-panel">
        <GraphBackground />
        <header className="expertise-header">
          <span className="expertise-badge"><LuLayers aria-hidden="true" /> Connected expertise</span>
          <h2 id="expertise-heading">Better together. Built for you.</h2>
        </header>
        <div className="expertise-columns">
          {columns.map((items, index) => (
            <VerticalMarquee key={index} items={items} renderItem={renderCard} direction={index === 1 ? "down" : "up"} label={`Company capabilities, column ${index + 1}`} />
          ))}
        </div>
      </div>
    </Section>
  );
}
