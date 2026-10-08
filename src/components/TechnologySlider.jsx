import { useEffect, useRef } from "react";
import {
  SiWordpress, SiFlutter, SiPhp, SiShopify, SiGoogleads,
  SiMeta, SiNodedotjs, SiNextdotjs, SiGoogleanalytics,
  SiElevenlabs, SiClaude, SiLangchain, SiGooglegemini,
  SiDotnet, SiReact, SiTypescript,
} from "react-icons/si";
import { TbBrandOpenai, TbBrandAws } from "react-icons/tb";
import { LuBotMessageSquare, LuChartColumnBig } from "react-icons/lu";
import "./TechnologySlider.css";

const technologies = [
  { name: "WordPress", icon: SiWordpress },
  { name: "Flutter", icon: SiFlutter },
  { name: "PHP", icon: SiPhp },
  { name: "Shopify", icon: SiShopify },
  { name: "Google Ads", icon: SiGoogleads },
  { name: "Meta", icon: SiMeta },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Analytics", icon: SiGoogleanalytics },
  { name: "Power BI", icon: LuChartColumnBig },
  { name: "Botpress", icon: LuBotMessageSquare },
  { name: "ElevenLabs", icon: SiElevenlabs },
  { name: "Claude", icon: SiClaude },
  { name: "LangChain", icon: SiLangchain },
  { name: "OpenAI", icon: TbBrandOpenai },
  { name: "Gemini", icon: SiGooglegemini },
  { name: ".NET", icon: SiDotnet },
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "AWS", icon: TbBrandAws },
];

function TechnologySlider() {
  const scrollerRef = useRef(null);
  const interactionRef = useRef({ hovering: false, dragging: false, pauseUntil: 0 });

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const segmentWidth = () => scroller.scrollWidth / 3;
    const normalize = () => {
      const segment = segmentWidth();
      if (scroller.scrollLeft < segment * 0.5) scroller.scrollLeft += segment;
      if (scroller.scrollLeft > segment * 1.5) scroller.scrollLeft -= segment;
    };
    scroller.scrollLeft = segmentWidth();

    const pause = () => {
      interactionRef.current.pauseUntil = performance.now() + 3000;
    };
    const onWheel = (event) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        scroller.scrollLeft += event.deltaY;
      }
      pause();
      normalize();
    };
    scroller.addEventListener("wheel", onWheel, { passive: false });

    const resizeObserver = new ResizeObserver(() => {
      scroller.scrollLeft = segmentWidth();
    });
    resizeObserver.observe(scroller);

    let frame;
    let previousTime = 0;
    const move = (now) => {
      if (previousTime) {
        const elapsed = Math.min(now - previousTime, 50);
        const interaction = interactionRef.current;
        if (
          document.visibilityState === "visible" &&
          !interaction.hovering &&
          !interaction.dragging &&
          now > interaction.pauseUntil &&
          document.activeElement !== scroller
        ) {
          scroller.scrollLeft += elapsed * 0.045;
        }
        normalize();
      }
      previousTime = now;
      frame = window.requestAnimationFrame(move);
    };
    frame = window.requestAnimationFrame(move);

    return () => {
      scroller.removeEventListener("wheel", onWheel);
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const moveByButton = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    interactionRef.current.pauseUntil = performance.now() + 3500;
    scroller.scrollBy({
      left: direction * Math.min(scroller.clientWidth * 0.7, 340),
      behavior: "smooth",
    });
  };

  const dragRef = useRef({ startX: 0, startScroll: 0 });
  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse") return;
    const scroller = scrollerRef.current;
    interactionRef.current.dragging = true;
    dragRef.current = { startX: event.clientX, startScroll: scroller.scrollLeft };
    scroller.classList.add("is-dragging");
    scroller.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event) => {
    if (!interactionRef.current.dragging) return;
    scrollerRef.current.scrollLeft =
      dragRef.current.startScroll - (event.clientX - dragRef.current.startX);
  };
  const onPointerUp = () => {
    interactionRef.current.dragging = false;
    interactionRef.current.pauseUntil = performance.now() + 3000;
    scrollerRef.current?.classList.remove("is-dragging");
  };

  return (
    <section className="technology-slider" aria-labelledby="technology-slider-heading">
      <div className="technology-slider-heading">
        <div>
          <span className="technology-slider-eyebrow">BUILT TOGETHER</span>
          <h2 id="technology-slider-heading">Tools behind the work.</h2>
        </div>
        <div className="technology-slider-controls">
          {/* <span>Scroll or drag to explore</span> */}
          <button type="button" onClick={() => moveByButton(-1)} aria-label="Scroll technologies left">‹</button>
          <button type="button" onClick={() => moveByButton(1)} aria-label="Scroll technologies right">›</button>
        </div>
      </div>
      <div
        className="technology-slider-track"
        ref={scrollerRef}
        role="region"
        aria-label="Technology logos"
        tabIndex={0}
        onPointerEnter={() => { interactionRef.current.hovering = true; }}
        onPointerLeave={() => { interactionRef.current.hovering = false; onPointerUp(); }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {[0, 1, 2].map((copy) => (
          <div className="technology-slider-group" aria-hidden={copy !== 1} key={copy}>
            {technologies.map(({ name, icon: Icon }) => (
              <div className="technology-slider-item" key={name}>
                <Icon aria-hidden="true" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default TechnologySlider;
