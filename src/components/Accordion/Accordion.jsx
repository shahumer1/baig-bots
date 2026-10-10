export default function Accordion({ items }) {
  return (
    <div className="faq-list">
      {items.map(({ question, answer }, index) => (
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
  );
}
