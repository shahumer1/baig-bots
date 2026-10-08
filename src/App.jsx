import { useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import HomeOverview from "./components/HomeOverview";
import BreakSection from "./components/BreakSection";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { ContentPage, ServiceDirectory } from "./components/ContentPage";
import { pageContent } from "./content/siteContent";

function App() {
  const pageId = new URLSearchParams(window.location.search).get("page") || "home";

  useEffect(() => {
    const label = pageContent[pageId]?.kicker || (
      { home: "Home", services: "Services", contact: "Contact", faq: "FAQ" }[pageId]
    ) || "Page";
    document.title = label + " | Baig Bots";
  }, [pageId]);

  let page;
  if (pageId === "home") {
    page = (
      <main id="top">
        <Hero />
        <Services />
        <HomeOverview />
        <BreakSection />
        <Contact />
        <FAQ />
      </main>
    );
  } else if (pageId === "services") {
    page = <ServiceDirectory />;
  } else if (pageId === "contact") {
    page = <main id="top"><Contact headingLevel={1} /><FAQ /></main>;
  } else if (pageId === "faq") {
    page = <main id="top"><FAQ headingLevel={1} /><Contact /></main>;
  } else {
    page = <ContentPage pageId={pageId} />;
  }

  return (
    <>
      <Navbar />
      {page}
      <Footer />
    </>
  );
}

export default App;
