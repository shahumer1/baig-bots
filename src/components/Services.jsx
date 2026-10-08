import { useState } from "react";
import ArrowUpRight from "./ArrowUpRight";
import CircuitDots from "./CircuitDots";
import GraphBackground from "./GraphBackground";
import SectionEyebrow from "./SectionEyebrow";
import SiteContainer from "./SiteContainer";
import { homeServices } from "../content/siteContent";
import "./Services.css";

function Services() {
  const [flippedCard, setFlippedCard] = useState(null);



  return (
    <section className="services-section" id="services">
      <GraphBackground />
      <CircuitDots />

      <SiteContainer className="services-container">
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
          {homeServices.map((service) => {
            const isFlipped = flippedCard === service.number;

            return (
              <article
                className={`service-card${isFlipped ? " is-flipped" : ""}`}
                key={service.number}
                onMouseEnter={() => {
                  if (window.matchMedia("(hover: hover)").matches) {
                    setFlippedCard(service.number);
                  }
                }}
                onMouseLeave={() => setFlippedCard(null)}
              >
                <div className="service-card-inner">
                  <div className="service-card-face service-card-front" aria-hidden={isFlipped}>
                    <div className="service-card-top">
                      <span className="service-number">{service.number}</span>
                      <div className="service-icon" aria-hidden="true">{service.icon}</div>
                    </div>

                    <div className="service-card-content">
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                    </div>
                  </div>

                  <div
                    className="service-card-face service-card-back"
                    id={`service-details-${service.number}`}
                    aria-hidden={!isFlipped}
                  >
                    <span className="service-card-eyebrow">HOW WE HELP · {service.number}</span>
                    <h3>{service.title}</h3>
                    <p>{service.details}</p>
                    <ul>
                      {service.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  className="service-card-toggle"
                  aria-label={`${isFlipped ? "Show front of" : "Show details for"} ${service.title}`}
                  aria-expanded={isFlipped}
                  aria-controls={`service-details-${service.number}`}
                  onClick={() => setFlippedCard(isFlipped ? null : service.number)}
                >
                  <span>{isFlipped ? "Show front" : "Explore service"}</span>
                  <ArrowUpRight className="service-card-arrow" />
                </button>
              </article>
            );
          })}
        </div>
      </SiteContainer>
    </section>
  );
}

export default Services;
