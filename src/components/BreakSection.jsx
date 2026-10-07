import "./BreakSection.css";
import CircuitDots from "./CircuitDots";

function BreakSection() {
  return (
    <section className="break-section" aria-labelledby="break-heading">
      <CircuitDots dark />
      <div className="break-section-inner">
        <span className="break-eyebrow">FROM IDEA TO IMPACT</span>
        <h2 id="break-heading">
          Make room for <span>what comes next.</span>
        </h2>
        <p>
          The best ideas deserve space to grow. Let&apos;s turn yours into
          something people can use.
        </p>
      </div>
    </section>
  );
}

export default BreakSection;
