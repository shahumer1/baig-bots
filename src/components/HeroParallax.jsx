import { useEffect, useRef, useState } from "react";
import "./HeroParallax.css";
import GraphBackground from "./GraphBackground";
import SectionEyebrow from "./SectionEyebrow";

import stage5 from "../assets/5.png";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function HeroParallax() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = null;
    let currentProgress = 0;
    let targetProgress = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      const distance = targetProgress - currentProgress;
      currentProgress = reduceMotion || Math.abs(distance) < 0.001
        ? targetProgress
        : currentProgress + distance * 0.18;
      setProgress(currentProgress);
      frameId = currentProgress === targetProgress
        ? null
        : window.requestAnimationFrame(animate);
    };

    const updateProgress = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable =
        sectionRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      targetProgress = clamp(scrolled / totalScrollable, 0, 1);
      if (frameId === null) frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const revealEdge = 20 + progress * 90;
  const revealMask = `linear-gradient(to right, #000 ${revealEdge - 5}%, transparent ${revealEdge + 5}%)`;
  const bulbGlowOpacity = clamp((progress - 0.74) / 0.18, 0, 1);

  let activeStep = 1;
  if (progress >= 0.33 && progress < 0.66) activeStep = 2;
  if (progress >= 0.66) activeStep = 3;

  return (
    <section ref={sectionRef} className="hp-section">
      <div className="hp-sticky">
        {/* background */}
        <div className="hp-bg">
          <GraphBackground />

          <div className="hp-circuits">
            {/* left side */}
            <span className="hp-line hp-line-1"></span>
            <span className="hp-line hp-line-2"></span>
            <span className="hp-line hp-line-3"></span>
            <span className="hp-line hp-line-4"></span>

            <span className="moving-dot hp-dot-1"></span>
            <span className="moving-dot hp-dot-2"></span>
            <span className="moving-dot hp-dot-3"></span>

            {/* right side */}
            <span className="hp-line hp-line-5"></span>
            <span className="hp-line hp-line-6"></span>
            <span className="hp-line hp-line-7"></span>
            <span className="hp-line hp-line-8"></span>

            <span className="moving-dot hp-dot-4"></span>
            <span className="moving-dot hp-dot-5"></span>
            <span className="moving-dot hp-dot-6"></span>
          </div>
        </div>

        {/* heading */}
        <div className="hp-heading">
          <SectionEyebrow>FROM CONNECTION TO CREATION</SectionEyebrow>
          <h2>
            Powering Ideas Into <span>Reality.</span>
          </h2>
          <div className="hp-heading-line"></div>
        </div>

        {/* stage canvas */}
        <div className="hp-stage-wrap">
          <div className="hp-stage-canvas">
            <div className="hp-stage-visual" style={{ transform: `translate3d(0, ${8 - progress * 16}px, 0)` }}>
              <div
                className="hp-bulb-glow"
                style={{ opacity: bulbGlowOpacity }}
              ></div>

              <img
                src={stage5}
                alt="A connection growing into an idea and a lit bulb"
                style={{ maskImage: revealMask, WebkitMaskImage: revealMask }}
              />
            </div>
          </div>
        </div>

        {/* steps */}
        <div className="hp-steps">
          <div className={activeStep === 1 ? "hp-step active" : "hp-step"}>
            <span>01</span>
            Connect
          </div>

          <div className={activeStep === 2 ? "hp-step active" : "hp-step"}>
            <span>02</span>
            Think
          </div>

          <div className={activeStep === 3 ? "hp-step active" : "hp-step"}>
            <span>03</span>
            Create
          </div>
        </div>

        <div
          className="hp-scroll-hint"
          style={{ opacity: 1 - clamp(progress / 0.08, 0, 1) }}
        >
          <span>Scroll to activate</span>
          <b>↓</b>
        </div>
      </div>
    </section>
  );
}

export default HeroParallax;
