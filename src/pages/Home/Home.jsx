import PageLayout from "../../components/PageLayout/PageLayout";
import Hero from "./Hero/Hero";
import ServiceHighlights from "./ServiceHighlights/ServiceHighlights";
import HomeOverview from "./HomeOverview/HomeOverview";
import BreakSection from "./BreakSection/BreakSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import FAQSection from "../../components/FAQSection/FAQSection";

export default function Home() {
  return <PageLayout><Hero /><ServiceHighlights /><HomeOverview /><BreakSection /><ContactSection /><FAQSection /></PageLayout>;
}
