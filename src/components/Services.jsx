import { useState } from "react";
import ArrowUpRight from "./ArrowUpRight";
import CircuitDots from "./CircuitDots";
import GraphBackground from "./GraphBackground";
import SectionEyebrow from "./SectionEyebrow";
import SiteContainer from "./SiteContainer";
import "./Services.css";

function Services() {
  const [flippedCard, setFlippedCard] = useState(null);

  const services = [
    {
      number: "01",
      title: "Software Development",
      text: "Custom websites, web apps and digital platforms built around your business needs.",
      icon: "</>",
      details: "From the first idea to launch, we build practical digital products around the way your business works.",
      highlights: ["Websites", "Web apps", "Digital platforms"],
    },
    {
      number: "02",
      title: "Automation Solutions",
      text: "Smart automation systems that reduce repetitive work and improve efficiency.",
      icon: "⚙",
      details: "We connect your tools and streamline everyday processes so your team can focus on higher-value work.",
      highlights: ["Workflow design", "System integrations", "Less manual work"],
    },
    {
      number: "03",
      title: "AI Solutions",
      text: "AI-powered tools, assistants and intelligent workflows designed to help businesses scale.",
      icon: "AI",
      details: "We turn useful AI ideas into assistants and workflows that support real business goals.",
      highlights: ["AI assistants", "Smart tools", "Scalable workflows"],
    },
  ];

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
            From custom software to intelligent automation, we create
            solutions designed to make your business faster, smarter and
            easier to scale.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => {
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
