import "./Hero.css";
import HeroParallax from "./HeroParallax";
import ArrowUpRight from "./ArrowUpRight";
import heroImage from "../assets/H1.png";

function Hero() {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-background">
          <div className="hero-grid"></div>

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
            <img
              src={heroImage}
              alt="Red steps leading upward to an arrow"
              fetchPriority="high"
            />
          </div>

          <p className="hero-description hero-enter hero-delay-2">
            Baigbots.com is the dedicated demo platform for{" "}
            <strong>InovioCloud</strong> projects. Each subdomain hosts a
            unique client showcase, bringing concepts to reality.
          </p>

          <div className="hero-buttons hero-enter hero-delay-3">
            <a href="#contact" className="hero-btn-primary">
              <span>Contact Us</span>
              <ArrowUpRight className="button-arrow" />
            </a>

            <a
              href="https://inoviocloud.com"
              target="_blank"
              rel="noreferrer"
              className="hero-btn-secondary"
            >
              <span>Visit InovioCloud</span>
              <ArrowUpRight className="button-arrow" />
            </a>
          </div>

          <div className="hero-stats hero-enter hero-delay-4">
            <div className="hero-stat">
              <h2>15+</h2>
              <p>Active Demos</p>
            </div>

            <div className="hero-stat">
              <h2>30+</h2>
              <p>Happy Clients</p>
            </div>

            <div className="hero-stat">
              <h2>∞</h2>
              <p>Possibilities</p>
            </div>
          </div>
        </div>
      </section>

      <HeroParallax />
    </>
  );
}

export default Hero;
