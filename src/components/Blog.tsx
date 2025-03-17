
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import BlogPostModal from "./BlogPostModal";
import { BlogPost, BlogPostClient, toClientBlogPost } from "@/types/blog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const Blog = () => {
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
const [selectedPost, setSelectedPost] = useState<BlogPostClient | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [blogPosts, setBlogPosts] = useState<BlogPostClient[]>([]);
const [categories, setCategories] = useState<string[]>([]);
const [loading, setLoading] = useState(true);
const { toast } = useToast();

useEffect(() => {
fetchBlogPosts();
}, []);

const fetchBlogPosts = async () => {
setLoading(true);
try {
const { data, error } = await supabase
.from('blog_posts')
.select('*')
.order('created_at', { ascending: false });

if (error) {
throw error;
}

if (data) {
// Convert from DB format to client format
const clientPosts = data.map(post => toClientBlogPost(post));
setBlogPosts(clientPosts);

// Extract unique categories
const uniqueCategories = Array.from(new Set(data.map(post => post.category)));
setCategories(uniqueCategories);
}
} catch (error) {
console.error('Error fetching blog posts:', error);
toast({
title: "Error",
description: "Failed to load blog posts. Please try again later.",
variant: "destructive"
});
} finally {
setLoading(false);
}
};

const filteredPosts = selectedCategory 
? blogPosts.filter(post => post.category === selectedCategory)
: blogPosts;

const handleReadMore = async (post: BlogPostClient) => {
try {
// Fetch the latest version of the post from Supabase
const { data, error } = await supabase
.from('blog_posts')
.select('*')
.eq('id', post.id)
.single();

if (error) {
throw error;
}

if (data) {
setSelectedPost(toClientBlogPost(data));
} else {
setSelectedPost(post);
}
} catch (error) {
console.error('Error fetching blog post details:', error);
setSelectedPost(post); // Fallback to the post we already have
}

setIsModalOpen(true);
};

const handleCloseModal = () => {
setIsModalOpen(false);
// Optional: Add a small delay before clearing the selected post
setTimeout(() => setSelectedPost(null), 300);
};

// Refresh blog posts when modal is closed to ensure we have the latest data
useEffect(() => {
if (!isModalOpen) {
fetchBlogPosts();
}
}, [isModalOpen]);

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

{loading ? (
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{[1, 2, 3, 4].map((i) => (
<Card key={i} className="h-full flex flex-col overflow-hidden">
<div className="h-48 bg-muted animate-pulse"></div>
<CardHeader>
<div className="w-24 h-6 bg-muted animate-pulse rounded-full mb-2"></div>
<div className="w-full h-8 bg-muted animate-pulse rounded"></div>
</CardHeader>
<CardContent className="flex-grow">
<div className="w-full h-16 bg-muted animate-pulse rounded"></div>
</CardContent>
<CardFooter className="flex justify-between border-t pt-4">
<div className="w-32 h-4 bg-muted animate-pulse rounded"></div>
<div className="w-24 h-8 bg-muted animate-pulse rounded"></div>
</CardFooter>
</Card>
))}
</div>
) : (
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{filteredPosts.length > 0 ? (
filteredPosts.map((post, index) => (
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
))
) : (
<div className="col-span-2 text-center py-12">
<p className="text-muted-foreground">No blog posts found in this category.</p>
</div>
)}
</div>
)}

<BlogPostModal 
post={selectedPost} 
isOpen={isModalOpen} 
onClose={handleCloseModal} 
/>
</section>
);
};
