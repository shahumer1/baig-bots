import useServiceDetails from "../../../hooks/useServiceDetails";
import { LuWorkflow } from "react-icons/lu";
import Section from "../../../components/Section/Section";
import GraphBackground from "../../../components/GraphBackground/GraphBackground";
import ServiceCard from "../../../components/ServiceCard/ServiceCard";
import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import { homeServices } from "../../../content/homeServices";
import "./ServiceHighlights.css";

export default function ServiceHighlights() {
  const { dialogRef, selectedService, explore } = useServiceDetails();

  return (
    <Section graph circuits containerClassName="services-container" className="services-section" id="services" aria-labelledby="services-heading">
      <div className="services-panel">
        <GraphBackground />
        <header className="services-heading">
          <span className="services-badge"><LuWorkflow aria-hidden="true" /> Services</span>
          <h2 id="services-heading">Our services</h2>
        </header>
        <div className="services-grid">
          {homeServices.map((service) => (
            <ServiceCard key={service.id} service={service} onExplore={explore} />
          ))}
        </div>
      </div>
      <ServiceDetails ref={dialogRef} service={selectedService} />
    </Section>
  );
}
