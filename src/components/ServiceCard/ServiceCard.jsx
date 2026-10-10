import Button from "../Button/Button";
import InfoCard from "../InfoCard/InfoCard";
import "./ServiceCard.css";

export default function ServiceCard({ service, isFlipped, onFlipChange }) {
  return (
    <article className={`service-card${isFlipped ? " is-flipped" : ""}`}
      onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) onFlipChange(true); }}
      onMouseLeave={() => onFlipChange(false)}>
      <div className="service-card-inner">
        <div className="service-card-face service-card-front" aria-hidden={isFlipped}>
          <div className="service-card-top"><span className="service-number">{service.number}</span><div className="service-icon" aria-hidden="true">{service.icon}</div></div>
          <InfoCard as="div" className="service-card-content" title={service.title} text={service.text} />
        </div>
        <InfoCard as="div" className="service-card-face service-card-back" id={`service-details-${service.number}`} aria-hidden={!isFlipped}
          kickerClassName="service-card-eyebrow" kicker={`HOW WE HELP · ${service.number}`} title={service.title} text={service.details}>
          <ul>{service.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
        </InfoCard>
      </div>
      <Button variant="plain" className="service-card-toggle" arrow arrowClassName="service-card-arrow"
        aria-label={`${isFlipped ? "Show front of" : "Show details for"} ${service.title}`}
        aria-expanded={isFlipped} aria-controls={`service-details-${service.number}`} onClick={() => onFlipChange(!isFlipped)}>
        {isFlipped ? "Show front" : "Explore service"}
      </Button>
    </article>
  );
}
