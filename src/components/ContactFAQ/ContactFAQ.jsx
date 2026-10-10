import PageLayout from "../PageLayout/PageLayout";
import ContactSection from "../ContactSection/ContactSection";
import FAQSection from "../FAQSection/FAQSection";

const sections = { contact: ContactSection, faq: FAQSection };
export default function ContactFAQ({ primary }) {
  const order = primary === "faq" ? ["faq", "contact"] : ["contact", "faq"];
  return <PageLayout>{order.map((id, index) => {
    const Component = sections[id];
    return <Component key={id} headingLevel={index === 0 ? 1 : 2} />;
  })}</PageLayout>;
}
