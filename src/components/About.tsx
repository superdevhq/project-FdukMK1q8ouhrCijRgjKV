
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skill } from "@/types/skill";

const About = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    // Load skills from localStorage
    const savedSkills = localStorage.getItem('portfolio-skills');
    const loadedSkills = savedSkills 
      ? JSON.parse(savedSkills) 
      : [
          { id: 1, name: "React", level: 90, category: "Frontend" },
          { id: 2, name: "TypeScript", level: 85, category: "Languages" },
          { id: 3, name: "Node.js", level: 80, category: "Backend" },
          { id: 4, name: "CSS/Tailwind", level: 90, category: "Frontend" },
          { id: 5, name: "UI/UX Design", level: 75, category: "Design" }
        ];
    
    setSkills(loadedSkills);
    
    // Extract unique categories
    const uniqueCategories = Array.from(new Set(loadedSkills.map(skill => skill.category)));
    setCategories(uniqueCategories);
  }, []);

  const filteredSkills = selectedCategory 
    ? skills.filter(skill => skill.category === selectedCategory)
    : skills;

  return (
    <section className="space-y-8 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          I'm a passionate web developer with expertise in modern frontend technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4">Who I Am</h3>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Hello! I'm a web developer with a passion for creating beautiful, 
              functional, and user-centered digital experiences. I'm currently 
              focused on building accessible, responsive web applications.
            </p>
            <p>
              With 5+ years of experience in the field, I've worked on a variety 
              of projects from small business websites to complex enterprise 
              applications. I'm always looking to learn new technologies and improve 
              my skills.
            </p>
            <p>
              When I'm not coding, you can find me hiking, reading, or experimenting 
              with new recipes in the kitchen.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">My Skills</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedCategory === null 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedCategory === category 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
      >
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h4 className="text-4xl font-bold text-primary">5+</h4>
              <p className="text-muted-foreground mt-2">Years of Experience</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h4 className="text-4xl font-bold text-primary">50+</h4>
              <p className="text-muted-foreground mt-2">Projects Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h4 className="text-4xl font-bold text-primary">20+</h4>
              <p className="text-muted-foreground mt-2">Happy Clients</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default About;
