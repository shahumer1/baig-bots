import CircuitDots from "./CircuitDots";
import GraphBackground from "./GraphBackground";
import SectionEyebrow from "./SectionEyebrow";
import SiteContainer from "./SiteContainer";
import "./FAQ.css";

const questions = [
  {
    question: "What does Baig Bots build?",
    answer:
      "We build custom websites, web apps, automation workflows, and AI tools around real business needs.",
  },
  {
    question: "How does a project get started?",
    answer:
      "Start by sharing your idea, the challenge you want to solve, and the outcome you have in mind. From there, we can shape a practical scope.",
  },
  {
    question: "Can you improve an existing website or workflow?",
    answer:
      "Yes. Existing products and processes can be reviewed for useful improvements, integrations, or automation opportunities.",
  },
  {
    question: "Do you offer AI and automation solutions?",
    answer:
      "Yes. We create tools and workflows that help reduce repetitive work and make everyday processes more efficient.",
  },
  {
    question: "How long does a project take?",
    answer:
      "It depends on the features, integrations, and complexity involved. A clearer timeline comes after the project scope is defined.",
  },
];

function FAQ() {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <GraphBackground />
      <CircuitDots />

      <SiteContainer className="faq-inner">
        <div className="faq-intro">
          <SectionEyebrow className="faq-eyebrow">GOOD TO KNOW</SectionEyebrow>
          <h2 id="faq-heading">Frequently asked questions.</h2>
          <p>Quick answers to help you understand how we work.</p>
        </div>

        <div className="faq-list">
          {questions.map(({ question, answer }, index) => (
            <details className="faq-item" key={question}>
              <summary>
                <span className="faq-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="faq-question">{question}</span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <p className="faq-answer">{answer}</p>
            </details>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}

export default FAQ;
