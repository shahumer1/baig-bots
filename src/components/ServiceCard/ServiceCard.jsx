import { useId } from "react";
import {
  LuBrainCircuit, LuWorkflow, LuCodeXml, LuNetwork, LuCreditCard,
  LuChartNoAxesCombined, LuCloud, LuHeadset, LuMonitorSmartphone,
  LuDatabase, LuPanelsTopLeft, LuPalette, LuMegaphone, LuVideo,
  LuSparkles, LuUsers,
} from "react-icons/lu";
import Button from "../Button/Button";
import PixelCircuitIcon from "../PixelCircuitIcon/PixelCircuitIcon";
import "./ServiceCard.css";

const icons = {
  brain: LuBrainCircuit, workflow: LuWorkflow, code: LuCodeXml,
  network: LuNetwork, credit: LuCreditCard, chart: LuChartNoAxesCombined,
  cloud: LuCloud, support: LuHeadset, web: LuMonitorSmartphone,
  database: LuDatabase, design: LuPanelsTopLeft, palette: LuPalette,
  marketing: LuMegaphone, video: LuVideo, sparkles: LuSparkles, team: LuUsers,
};

export default function ServiceCard({ service, onExplore, variant = "default" }) {
  const Icon = icons[service.icon];
  const titleId = useId();
  return (
    <article className={`service-card${variant === "industry" ? " service-card--industry" : ""}`} aria-labelledby={titleId}>
      <span className="service-card-category">{service.category}</span>
      <div className="service-card-title">
        <span className="service-card-icon"><Icon aria-hidden="true" /></span>
        <h3 id={titleId}>{service.title}</h3>
      </div>
      <p>{service.text}</p>
      <div className="service-card-actions">
        <Button variant="reveal" onClick={() => onExplore(service)} aria-label={`More about ${service.title}`} aria-haspopup="dialog">
          <span className="button-reveal-icon"><PixelCircuitIcon /></span>
          <span className="button-reveal-label" aria-hidden="true">More</span>
        </Button>
      </div>
    </article>
  );
}
