import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import NotFound from "./pages/NotFound/NotFound";
import { pages } from "./pages/routes";
import { pageContent } from "./content/siteContent";
import "./App.css";

export default function App() {
  const pageId = new URLSearchParams(window.location.search).get("page") || "home";
  const Page = Object.hasOwn(pages, pageId) ? pages[pageId] : NotFound;
  useEffect(() => {
    const label = pageContent[pageId]?.kicker || { home: "Home", services: "Services", contact: "Contact", faq: "FAQ" }[pageId] || "Page";
    document.title = `${label} | Baig Bots`;
  }, [pageId]);
  return <><Navbar currentPage={pageId} /><Page /><Footer /></>;
}
