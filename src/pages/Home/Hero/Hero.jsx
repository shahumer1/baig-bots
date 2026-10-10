import "./Hero.css";
import TechnologySlider from "../../../components/TechnologySlider/TechnologySlider";
import Button from "../../../components/Button/Button";
import GraphBackground from "../../../components/GraphBackground/GraphBackground";
import AutomationDiagram from "../AutomationDiagram/AutomationDiagram";

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
            <Button href="?page=contact" className="hero-button" arrow>Contact Us</Button>

            <Button href="?page=services" variant="secondary" className="hero-button" arrow>Explore Services</Button>
          </div>

          <div className="hero-stats hero-enter hero-delay-4">
            {[["AI", "Intelligent Tools"], ["Web", "Digital Experiences"], ["Brand", "Creative Growth"]].map(([title, description]) => (
              <div className="hero-stat" key={title}><h2>{title}</h2><p>{description}</p></div>
            ))}
          </div>
        </div>
      </section>

      <TechnologySlider />
    </>
  );
}

export default Hero;
