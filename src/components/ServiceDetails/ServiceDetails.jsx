import { useId } from "react";
import Button from "../Button/Button";
import "./ServiceDetails.css";

export default function ServiceDetails({ ref, service }) {
  const headingId = useId();
  return (
    <dialog ref={ref} className="service-details" aria-labelledby={headingId}
      onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      <div className="service-details-inner">
        <div className="service-details-top">
          <span>{service?.category}</span>
          <Button variant="icon" aria-label="Close service details" onClick={() => ref.current.close()}>×</Button>
        </div>
        <h2 id={headingId}>{service?.title}</h2>
        <p>{service?.text}</p>
        <ul>{service?.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
        <Button href="?page=contact" arrow>Discuss your project</Button>
      </div>
    </dialog>
  );
}
