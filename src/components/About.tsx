
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skill } from "@/types/skill";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const About = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });

      if (error) {
        throw error;
      }

      if (data) {
        setSkills(data);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast({
        title: "Error",
        description: "Failed to load skills. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero section with name */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground">
            Hey, I'm Itay
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            I'm a passionate web developer with expertise in modern frontend and backend technologies.
            I love creating beautiful, responsive, and user-friendly web applications.
          </p>
        </motion.div>

        {/* About section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm a passionate web developer with expertise in modern frontend and backend technologies.
            I love creating beautiful, responsive, and user-friendly web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-foreground">My Journey</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I started my journey as a web developer 5 years ago, focusing on creating 
                responsive and accessible web applications. My passion for clean code and 
                user-centric design has driven me to continuously learn and improve.
              </p>
              <p>
                Throughout my career, I've worked with various technologies and frameworks, 
                always striving to find the best tools for each specific project. I believe 
                in writing maintainable code that solves real problems.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing 
                to open-source projects, or sharing my knowledge through blog posts and community events.
              </p>
            </div>
            <div className="mt-6">
              <Button>Download Resume</Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-foreground">My Skills</h3>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                    <div className="h-2 bg-muted rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : skills.length > 0 ? (
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">
                          {skill.category}
                        </span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-secondary/30 dark:bg-secondary/20 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No skills found.</p>
            )}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-card rounded-lg p-8 border shadow-sm"
        >
          <h3 className="text-2xl font-bold mb-4 text-foreground">Education & Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-foreground">Education</h4>
              <ul className="space-y-6">
                <li>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-foreground">Master's in Computer Science</span>
                    <span className="text-sm text-muted-foreground">2018-2020</span>
                  </div>
                  <p className="text-muted-foreground">University of Technology</p>
                </li>
                <li>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-foreground">Bachelor's in Software Engineering</span>
                    <span className="text-sm text-muted-foreground">2014-2018</span>
                  </div>
                  <p className="text-muted-foreground">State University</p>
                </li>
                <li>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-foreground">Web Development Bootcamp</span>
                    <span className="text-sm text-muted-foreground">2013</span>
                  </div>
                  <p className="text-muted-foreground">Code Academy</p>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4 text-foreground">Experience</h4>
              <ul className="space-y-6">
                <li>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-foreground">Senior Frontend Developer</span>
                    <span className="text-sm text-muted-foreground">2021-Present</span>
                  </div>
                  <p className="text-muted-foreground">Tech Innovations Inc.</p>
                </li>
                <li>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-foreground">Full Stack Developer</span>
                    <span className="text-sm text-muted-foreground">2018-2021</span>
                  </div>
                  <p className="text-muted-foreground">Digital Solutions Ltd.</p>
                </li>
                <li>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-foreground">Junior Web Developer</span>
                    <span className="text-sm text-muted-foreground">2016-2018</span>
                  </div>
                  <p className="text-muted-foreground">Creative Web Agency</p>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
