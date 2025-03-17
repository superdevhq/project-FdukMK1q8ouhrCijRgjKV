
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h1 
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Hey, I'm Itay
              </motion.h1>
              <motion.p 
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                I'm a passionate developer with expertise in building modern web applications.
                I love creating elegant solutions to complex problems.
              </motion.p>
            </div>
            <motion.div 
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/contact">
                <Button className="group">
                  Contact Me
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline">
                Download CV
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
          <div className="flex items-center justify-center">
            <motion.div 
              className="relative aspect-square overflow-hidden rounded-xl bg-muted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Placeholder for profile image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted-foreground/20" />
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">Frontend Development</h3>
            <p className="text-muted-foreground">
              Expertise in React, TypeScript, and modern CSS frameworks.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">Backend Development</h3>
            <p className="text-muted-foreground">
              Experience with Node.js, Express, and database technologies.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">UI/UX Design</h3>
            <p className="text-muted-foreground">
              Creating intuitive and beautiful user interfaces.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
