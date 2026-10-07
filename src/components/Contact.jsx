import ArrowUpRight from "./ArrowUpRight";
import CircuitDots from "./CircuitDots";
import "./Contact.css";

function Contact() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <CircuitDots />
      <div className="contact-inner">
        <div className="contact-intro">
          <span className="contact-eyebrow">LET&apos;S TALK</span>
          <h2 id="contact-heading">Tell us what you have in mind.</h2>
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
      </div>
    </section>
  );
}

export default Contact;
