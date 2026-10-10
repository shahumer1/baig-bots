import Section from "../../../components/Section/Section";
import ServiceCard from "../../../components/ServiceCard/ServiceCard";
import { useState } from "react";
import SectionEyebrow from "../../../components/SectionEyebrow/SectionEyebrow";
import { homeServices } from "../../../content/siteContent";
import "./ServiceHighlights.css";

function ServiceHighlights() {
  const [flippedCard, setFlippedCard] = useState(null);

  return (
    <Section graph circuits containerClassName="services-container" className="services-section" id="services">

        <div className="services-heading">
          <SectionEyebrow>WHAT WE DO</SectionEyebrow>

          <h2>
            Services Built for
            <br />
            <strong>Modern Businesses.</strong>
          </h2>

          <p>
            Explore joined-up support across websites, AI, design, and
            growth. Every solution starts with your audience and a clear
            business goal.
          </p>
        </div>

        <div className="services-grid">
          {homeServices.map((service) => (
            <ServiceCard key={service.number} service={service} isFlipped={flippedCard === service.number}
              onFlipChange={(flipped) => setFlippedCard(flipped ? service.number : null)} />
          ))}
        </div>
    </Section>
  );
}

export default ServiceHighlights;
