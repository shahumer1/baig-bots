import ArrowUpRight from "./ArrowUpRight";
import CircuitDots from "./CircuitDots";
import GraphBackground from "./GraphBackground";
import SectionEyebrow from "./SectionEyebrow";
import SiteContainer from "./SiteContainer";
import "./Contact.css";

function Contact({ headingLevel = 2 }) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <GraphBackground />
      <CircuitDots />
      <SiteContainer className="contact-inner">
        <div className="contact-intro">
          <SectionEyebrow className="contact-eyebrow">LET&apos;S TALK</SectionEyebrow>
          <Heading id="contact-heading">Tell us what you have in mind.</Heading>
          <p>
            A quick note is enough to get started. Share your idea, challenge,
            or the project you want to bring to life.
          </p>
          <div className="contact-circles" aria-hidden="true" />
        </div>

        <form
          className="contact-form"
          aria-label="Contact form"
          onSubmit={(event) => event.preventDefault()}
        >
          <svg
            className="contact-form-shape"
            viewBox="0 0 1000 850"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M105 55 C155 25 195 22 245 48 S325 12 402 39 S480 8 560 38 S650 14 730 39 S815 14 885 55 S970 70 954 145 S968 220 949 300 S980 400 950 485 S980 570 945 650 S960 730 914 790 S850 828 790 815 S700 844 635 812 S540 842 475 815 S380 844 315 813 S225 837 160 808 S65 810 55 755 S28 680 48 610 S22 530 50 455 S20 370 51 300 S35 210 60 145 S50 80 105 55 Z" />
          </svg>
          <div className="contact-form-grid">
            <label className="contact-field">
              <span>Your name</span>
              <input type="text" name="name" autoComplete="name" placeholder="Your name" />
            </label>

            <label className="contact-field">
              <span>Email address</span>
              <input type="email" name="email" autoComplete="email" placeholder="you@example.com" />
            </label>

            <label className="contact-field contact-field-full">
              <span>What can we help with?</span>
              <input type="text" name="subject" placeholder="Tell us about your project" />
            </label>

            <label className="contact-field contact-field-full">
              <span>Your message</span>
              <textarea name="message" rows="5" placeholder="A few details about what you have in mind..." />
            </label>
          </div>

          <div className="contact-form-actions">
            <button type="button" disabled>
              <span>Send message</span>
              <ArrowUpRight />
            </button>
          </div>
        </form>
      </SiteContainer>
    </section>
  );
}

export default Contact;
