import PageLayout from "../../components/PageLayout/PageLayout";
import Hero from "./Hero/Hero";
import ServiceHighlights from "./ServiceHighlights/ServiceHighlights";
import Industries from "./Industries/Industries";
import ExpertiseWall from "./ExpertiseWall/ExpertiseWall";
import BreakSection from "./BreakSection/BreakSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import FAQSection from "../../components/FAQSection/FAQSection";

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <ServiceHighlights />
      <Industries />
      <ExpertiseWall />
      <BreakSection />
      <ContactSection />
      <FAQSection />
    </PageLayout>
  );
}
