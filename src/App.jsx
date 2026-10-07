import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import BreakSection from "./components/BreakSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <BreakSection />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
