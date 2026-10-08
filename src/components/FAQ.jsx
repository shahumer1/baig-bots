import CircuitDots from "./CircuitDots";
import GraphBackground from "./GraphBackground";
import SectionEyebrow from "./SectionEyebrow";
import SiteContainer from "./SiteContainer";
import "./FAQ.css";

const questions = [
  {
    question: "How does a new project begin?",
    answer: "We start with a conversation about your goals, audience, and challenges. From there we shape a scope, timeline, and practical next steps.",
  },
  {
    question: "How is a project priced?",
    answer: "Pricing depends on the work involved, the features needed, and the level of ongoing support. We discuss the scope before preparing a tailored proposal.",
  },
  {
    question: "Can you handle design and development together?",
    answer: "Yes. We can connect user experience, visual design, and development so the finished product feels consistent and works as intended.",
  },
  {
    question: "Can a solution grow with my business?",
    answer: "We consider future content, features, integrations, and performance when planning the foundation. The right approach depends on your roadmap.",
  },
  {
    question: "Do you support projects after launch?",
    answer: "Ongoing updates, monitoring, and improvements can be planned around the needs of the product and the team that runs it.",
  },
];

function FAQ({ headingLevel = 2 }) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <GraphBackground />
      <CircuitDots />

      <SiteContainer className="faq-inner">
        <div className="faq-intro">
          <SectionEyebrow className="faq-eyebrow">GOOD TO KNOW</SectionEyebrow>
          <Heading id="faq-heading">Frequently asked questions.</Heading>
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
