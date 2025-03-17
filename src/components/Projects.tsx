
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl: string;
  repoUrl: string;
  category: string;
};

const Projects = () => {
  const [filter, setFilter] = useState("all");
  
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      description: "A responsive dashboard for e-commerce analytics with real-time data visualization.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      demoUrl: "#",
      repoUrl: "#",
      category: "web"
    },
    {
      id: 2,
      title: "Recipe Finder App",
      description: "Mobile app that helps users find recipes based on ingredients they have at home.",
      tags: ["React Native", "Firebase", "API Integration"],
      image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=2067&auto=format&fit=crop",
      demoUrl: "#",
      repoUrl: "#",
      category: "mobile"
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A minimalist portfolio website with dark mode and smooth animations.",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2070&auto=format&fit=crop",
      demoUrl: "#",
      repoUrl: "#",
      category: "web"
    },
    {
      id: 4,
      title: "Weather Visualization",
      description: "Interactive weather data visualization with historical trends and forecasts.",
      tags: ["D3.js", "React", "Weather API"],
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop",
      demoUrl: "#",
      repoUrl: "#",
      category: "data"
    }
  ];

  const categories = [
    { id: "all", label: "All" },
    { id: "web", label: "Web" },
    { id: "mobile", label: "Mobile" },
    { id: "data", label: "Data" }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section className="space-y-8 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">My Projects</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A selection of my recent work across different platforms and technologies.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={filter === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(category.id)}
            className="rounded-full"
          >
            {category.label}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Projects;
