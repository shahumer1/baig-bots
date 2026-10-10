import { useId, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Section from "../../../components/Section/Section";
import Button from "../../../components/Button/Button";
import PixelCircuitIcon from "../../../components/PixelCircuitIcon/PixelCircuitIcon";
import ServiceCard from "../../../components/ServiceCard/ServiceCard";
import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import useServiceDetails from "../../../hooks/useServiceDetails";
import { industries } from "../../../content/industries";
import { homeServices } from "../../../content/homeServices";
import "./Industries.css";

const servicesById = Object.fromEntries(homeServices.map((service) => [service.id, service]));

export default function Industries() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef(null);
  const tabsRef = useRef(null);
  const sectionId = useId();
  const { dialogRef, selectedService, explore } = useServiceDetails();
  const industry = industries[selectedIndex];
  const panelId = `${sectionId}-panel`;

  function selectIndustry(index) {
    setSelectedIndex(index);
    setScrollProgress(0);
    trackRef.current.scrollTo({ left: 0, behavior: "instant" });
  }

  function onTabKeyDown(event, index) {
    let nextIndex;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % industries.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + industries.length) % industries.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = industries.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    selectIndustry(nextIndex);
    tabsRef.current.querySelectorAll('[role="tab"]')[nextIndex].focus();
  }

  function slide(direction) {
    const track = trackRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * (track.firstElementChild.offsetWidth + 18), behavior: reducedMotion ? "instant" : "smooth" });
  }

  return (
    <Section graph circuits className="industries-section" containerClassName="industries-layout" id="industries" aria-labelledby={`${sectionId}-heading`}>
      <aside className="industries-sidebar">
        <p className="industries-sidebar-label">ALL INDUSTRIES</p>
        <div className="industries-tabs" ref={tabsRef} role="tablist" aria-label="Select an industry" aria-orientation="vertical">
          {industries.map((item, index) => (
            <Button key={item.id} variant="unstyled" className="industry-tab" role="tab"
              id={`${sectionId}-tab-${item.id}`} aria-controls={panelId} aria-selected={selectedIndex === index}
              tabIndex={selectedIndex === index ? 0 : -1}
              onClick={() => selectIndustry(index)} onKeyDown={(event) => onTabKeyDown(event, index)}>
              <span className="industry-tab-icon"><PixelCircuitIcon /></span>
              <span>{item.name}</span>
            </Button>
          ))}
        </div>
      </aside>

      <div className="industries-content">
        <header className="industries-header">
          <span className="industries-badge"><PixelCircuitIcon /> Industries</span>
          <h2 id={`${sectionId}-heading`}>Built around your industry.</h2>
          <p>From financial operations to growing digital businesses, we connect the right software, automation, and expertise to the way you work.</p>
        </header>
        <div id={panelId} role="tabpanel" aria-labelledby={`${sectionId}-tab-${industry.id}`}>
          <p className="industries-selected" aria-live="polite">{industry.name}<span>{industry.solutions.length} connected solutions</span></p>
          <div key={industry.id} className="industries-track" ref={trackRef} tabIndex={0} role="region" aria-label={`${industry.name} solutions. Scroll to explore.`}
            onScroll={(event) => {
              const track = event.currentTarget;
              const maxScroll = track.scrollWidth - track.clientWidth;
              setScrollProgress(maxScroll > 0 ? track.scrollLeft / maxScroll : 0);
            }}>
            {industry.solutions.map(({ serviceId, text }) => (
              <ServiceCard key={`${industry.id}-${serviceId}`} variant="industry"
                service={{ ...servicesById[serviceId], text }} onExplore={explore} />
            ))}
          </div>
        </div>
        <div className="industries-controls">
          <div className="industries-progress" aria-hidden="true"><span style={{ transform: `translateX(${scrollProgress * 300}%)` }} /></div>
          <div className="industries-arrows">
            {[{ direction: -1, label: "Previous industry solution", Icon: LuChevronLeft }, { direction: 1, label: "Next industry solution", Icon: LuChevronRight }].map(({ direction, label, Icon }) => (
              <Button key={direction} variant="icon" aria-label={label} disabled={direction < 0 ? scrollProgress <= 0.001 : scrollProgress >= 0.999} onClick={() => slide(direction)}><Icon aria-hidden="true" /></Button>
            ))}
          </div>
        </div>
      </div>
      <ServiceDetails ref={dialogRef} service={selectedService} />
    </Section>
  );
}
