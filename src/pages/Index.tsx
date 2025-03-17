
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeSection, setActiveSection] = useState("about");

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Itay Schechner
          </h1>
          <p className="text-xl text-center mt-4 max-w-2xl mx-auto text-muted-foreground">
            Explore my projects, blog posts, and get in touch to discuss how we can work together.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 md:py-16 flex-grow">
        <AnimatePresence mode="wait">
          {activeSection === "about" && (
            <motion.div key="about" {...pageTransition}>
              <About />
            </motion.div>
          )}

          {activeSection === "projects" && (
            <motion.div key="projects" {...pageTransition}>
              <Projects />
            </motion.div>
          )}

          {activeSection === "blog" && (
            <motion.div key="blog" {...pageTransition}>
              <Blog />
            </motion.div>
          )}

          {activeSection === "contact" && (
            <motion.div key="contact" {...pageTransition}>
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
