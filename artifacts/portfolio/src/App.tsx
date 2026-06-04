import { useState, useEffect } from "react";
import { Loader } from "./components/Loader";
import { CustomCursor } from "./components/CustomCursor";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Leadership } from "./components/Leadership";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AnimatePresence } from "framer-motion";

function App() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  return (
    <div className="bg-[#050816] text-white min-h-screen font-sans selection:bg-primary/30 selection:text-white">
      <CustomCursor />
      
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navigation />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Education />
            <Leadership />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
