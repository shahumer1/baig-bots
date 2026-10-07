import { useEffect, useRef, useState } from "react";
import "./HeroParallax.css";

import stage1 from "../assets/1.png";
import stage2 from "../assets/2.png";
import stage3 from "../assets/3.png";
import stage4 from "../assets/4.png";
import stage5 from "../assets/5.png";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function fadeInOut(progress, inStart, inEnd, outStart, outEnd) {
  if (progress < inStart) return 0;

  if (progress >= inStart && progress <= inEnd) {
    return (progress - inStart) / (inEnd - inStart);
  }

  if (progress > inEnd && progress < outStart) {
    return 1;
  }

  if (progress >= outStart && progress <= outEnd) {
    return 1 - (progress - outStart) / (outEnd - outStart);
  }

  return 0;
}

function fadeInOnly(progress, start, end) {
  if (progress < start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

function HeroParallax() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable =
        sectionRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const value = clamp(scrolled / totalScrollable, 0, 1);

      setProgress(value);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  /* stage opacities */
  const stage1Opacity = fadeInOut(progress, 0.00, 0.06, 0.16, 0.24);
  const stage2Opacity = fadeInOut(progress, 0.18, 0.26, 0.34, 0.42);
  const stage3Opacity = fadeInOut(progress, 0.36, 0.44, 0.54, 0.62);
  const stage4Opacity = fadeInOut(progress, 0.56, 0.64, 0.74, 0.82);
  const stage5Opacity = fadeInOnly(progress, 0.76, 0.90);

  const bulbGlowOpacity = fadeInOnly(progress, 0.84, 0.96);

  let activeStep = 1;
  if (progress >= 0.33 && progress < 0.66) activeStep = 2;
  if (progress >= 0.66) activeStep = 3;

  return (
    <section ref={sectionRef} className="hp-section">
      <div className="hp-sticky">
        {/* background */}
        <div className="hp-bg">
          <div className="hp-grid"></div>

          <div className="hp-circuits">
            {/* left side */}
            <span className="hp-line hp-line-1"></span>
            <span className="hp-line hp-line-2"></span>
            <span className="hp-line hp-line-3"></span>
            <span className="hp-line hp-line-4"></span>

            <span className="hp-dot hp-dot-1"></span>
            <span className="hp-dot hp-dot-2"></span>
            <span className="hp-dot hp-dot-3"></span>

            {/* right side */}
            <span className="hp-line hp-line-5"></span>
            <span className="hp-line hp-line-6"></span>
            <span className="hp-line hp-line-7"></span>
            <span className="hp-line hp-line-8"></span>

            <span className="hp-dot hp-dot-4"></span>
            <span className="hp-dot hp-dot-5"></span>
            <span className="hp-dot hp-dot-6"></span>
          </div>
        </div>

        {/* heading */}
        <div className="hp-heading">
          <p>FROM CONNECTION TO CREATION</p>
          <h2>
            Powering Ideas Into <span>Reality.</span>
          </h2>
          <div className="hp-heading-line"></div>
        </div>

        {/* stage canvas */}
        <div className="hp-stage-wrap">
          <div className="hp-stage-canvas">
            <div
              className="hp-stage hp-stage-1"
              style={{
                opacity: stage1Opacity,
                transform: `translateY(${20 - stage1Opacity * 20}px) scale(${0.96 + stage1Opacity * 0.04})`,
              }}
            >
              <img src={stage1} alt="Empty socket" />
            </div>

            <div
              className="hp-stage hp-stage-2"
              style={{
                opacity: stage2Opacity,
                transform: `translateY(${20 - stage2Opacity * 20}px) scale(${0.96 + stage2Opacity * 0.04})`,
              }}
            >
              <img src={stage2} alt="Socket with plug" />
            </div>

            <div
              className="hp-stage hp-stage-3"
              style={{
                opacity: stage3Opacity,
                transform: `translateY(${20 - stage3Opacity * 20}px) scale(${0.96 + stage3Opacity * 0.04})`,
              }}
            >
              <img src={stage3} alt="Socket plug and brain" />
            </div>

            <div
              className="hp-stage hp-stage-4"
              style={{
                opacity: stage4Opacity,
                transform: `translateY(${20 - stage4Opacity * 20}px) scale(${0.96 + stage4Opacity * 0.04})`,
              }}
            >
              <img src={stage4} alt="Socket plug brain and bulb" />
            </div>

            <div
              className="hp-stage hp-stage-5"
              style={{
                opacity: stage5Opacity,
                transform: `translateY(${20 - stage5Opacity * 20}px) scale(${0.96 + stage5Opacity * 0.04})`,
              }}
            >
              <div
                className="hp-bulb-glow"
                style={{
                  opacity: bulbGlowOpacity,
                }}
              ></div>

              <img src={stage5} alt="Complete powered idea flow" />
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
          style={{ opacity: progress < 0.08 ? 1 : 0 }}
        >
          <span>Scroll to activate</span>
          <b>↓</b>
        </div>
      </div>
    </section>
  );
}

export default HeroParallax;