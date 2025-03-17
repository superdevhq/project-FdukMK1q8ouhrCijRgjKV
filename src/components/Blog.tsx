
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import BlogPostModal from "./BlogPostModal";
import { BlogPost } from "@/types/blog";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    // Load blog posts from localStorage
    const savedPosts = localStorage.getItem('portfolio-blog-posts');
    const loadedPosts = savedPosts 
      ? JSON.parse(savedPosts) 
      : [
          {
            id: 1,
            title: "Getting Started with React Hooks",
            excerpt: "Learn how to use React Hooks to simplify your functional components and manage state effectively.",
            date: "May 15, 2023",
            readTime: "5 min read",
            category: "React",
            image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop"
          },
          {
            id: 2,
            title: "Mastering CSS Grid Layout",
            excerpt: "A comprehensive guide to CSS Grid Layout and how it can transform your web design approach.",
            date: "April 22, 2023",
            readTime: "8 min read",
            category: "CSS",
            image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop"
          },
          {
            id: 3,
            title: "TypeScript Best Practices",
            excerpt: "Discover the best practices for writing clean, maintainable TypeScript code in your projects.",
            date: "March 10, 2023",
            readTime: "6 min read",
            category: "TypeScript",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
          },
          {
            id: 4,
            title: "Building Accessible Web Applications",
            excerpt: "Why accessibility matters and how to implement it in your web applications for all users.",
            date: "February 5, 2023",
            readTime: "7 min read",
            category: "Accessibility",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2069&auto=format&fit=crop"
          }
        ];
    
    setBlogPosts(loadedPosts);
    
    // Extract unique categories
    const uniqueCategories = Array.from(new Set(loadedPosts.map(post => post.category)));
    setCategories(uniqueCategories);
  }, []);

  const filteredPosts = selectedCategory 
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optional: Add a small delay before clearing the selected post
    setTimeout(() => setSelectedPost(null), 300);
  };

  return (
    <section className="space-y-8 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">Blog</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Thoughts, tutorials, and insights about web development and design.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-8">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className="rounded-full"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary"
                  onClick={() => handleReadMore(post)}
                >
                  Read more
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <BlogPostModal 
        post={selectedPost} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </section>
  );
};

export default Blog;
