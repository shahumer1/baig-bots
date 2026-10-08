import "./Hero.css";
import TechnologySlider from "./TechnologySlider";
import ArrowUpRight from "./ArrowUpRight";
import GraphBackground from "./GraphBackground";
import AutomationDiagram from "./AutomationDiagram";

function Hero() {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-background">
          <GraphBackground />

          <div className="hero-circuits">
            <span className="hero-line hero-line-1"></span>
            <span className="hero-line hero-line-2"></span>
            <span className="hero-line hero-line-3"></span>
            <span className="hero-line hero-line-4"></span>

            <span className="moving-dot hero-dot-1"></span>
            <span className="moving-dot hero-dot-2"></span>
            <span className="moving-dot hero-dot-3"></span>
          </div>
        </div>

        <div className="hero-inner">
          <h1 className="hero-title hero-enter hero-delay-1">
            Where Ideas
            <br />
            Come to <span>Life</span>
          </h1>

          <div className="hero-visual hero-enter hero-delay-2">
            <AutomationDiagram />
          </div>

          <p className="hero-description hero-enter hero-delay-2">
            One connected team for <strong>AI solutions</strong>, websites,
            design, cloud hosting, and digital growth. We shape useful
            experiences around the people and goals that matter to your business.
          </p>

          <div className="hero-buttons hero-enter hero-delay-3">
            <a href="?page=contact" className="hero-btn-primary">
              <span>Contact Us</span>
              <ArrowUpRight className="button-arrow" />
            </a>

            <a href="?page=services" className="hero-btn-secondary">
              <span>Explore Services</span>
              <ArrowUpRight className="button-arrow" />
            </a>
          </div>

          <div className="hero-stats hero-enter hero-delay-4">
            <div className="hero-stat">
              <h2>AI</h2>
              <p>Intelligent Tools</p>
            </div>

            <div className="hero-stat">
              <h2>Web</h2>
              <p>Digital Experiences</p>
            </div>

            <div className="hero-stat">
              <h2>Brand</h2>
              <p>Creative Growth</p>
            </div>
          </div>
        </div>
      </section>

      <TechnologySlider />
    </>
  );
}

export default Hero;
