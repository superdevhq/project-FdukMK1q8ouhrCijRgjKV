
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", 
    "Node.js", "CSS/SCSS", "Tailwind CSS", "UI/UX Design"
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <section className="space-y-12 py-8">
      <motion.div 
        className="space-y-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Hello, I'm <span className="text-primary">Jane Doe</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Frontend Developer & UI Designer
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        variants={{
          initial: { opacity: 0 },
          animate: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 } 
          }
        }}
        initial="initial"
        animate="animate"
      >
        <motion.div {...fadeInUp}>
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">About Me</h2>
              <p className="text-muted-foreground">
                I'm a passionate frontend developer with 5 years of experience creating 
                beautiful, responsive, and user-friendly websites. I specialize in 
                modern JavaScript frameworks and have a keen eye for design.
              </p>
              <p className="text-muted-foreground">
                When I'm not coding, you can find me hiking, reading sci-fi novels, 
                or experimenting with new cooking recipes.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeInUp}>
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
