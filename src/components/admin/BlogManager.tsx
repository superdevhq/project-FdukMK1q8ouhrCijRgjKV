
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { BlogPost } from "@/types/blog";
import BlogPostModal from "@/components/BlogPostModal";

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const savedPosts = localStorage.getItem('portfolio-blog-posts');
    return savedPosts ? JSON.parse(savedPosts) : [
      {
        id: 1,
        title: "Getting Started with React Hooks",
        excerpt: "Learn how to use React Hooks to simplify your functional components and manage state effectively.",
        date: "May 15, 2023",
        readTime: "5 min read",
        category: "React",
        image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop",
        content: "This is a sample blog post about React Hooks. In this article, we'll explore how to use useState, useEffect, and other hooks to build powerful React applications."
      },
      {
        id: 2,
        title: "Mastering CSS Grid Layout",
        excerpt: "A comprehensive guide to CSS Grid Layout and how it can transform your web design approach.",
        date: "April 22, 2023",
        readTime: "8 min read",
        category: "CSS",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop",
        content: "CSS Grid Layout is a powerful tool for creating complex web layouts. In this article, we'll dive deep into grid templates, areas, and responsive design techniques."
      },
      {
        id: 3,
        title: "TypeScript Best Practices",
        excerpt: "Discover the best practices for writing clean, maintainable TypeScript code in your projects.",
        date: "March 10, 2023",
        readTime: "6 min read",
        category: "TypeScript",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
        content: "TypeScript has become an essential tool for modern web development. This article covers type definitions, interfaces, and patterns to make your TypeScript code more robust."
      },
      {
        id: 4,
        title: "Building Accessible Web Applications",
        excerpt: "Why accessibility matters and how to implement it in your web applications for all users.",
        date: "February 5, 2023",
        readTime: "7 min read",
        category: "Accessibility",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2069&auto=format&fit=crop",
        content: "Web accessibility is crucial for ensuring your applications can be used by everyone. Learn about ARIA attributes, keyboard navigation, and testing tools for accessibility."
      }
    ];
  });
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState<Omit<BlogPost, 'id'>>({
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    readTime: "5 min read",
    category: "",
    image: ""
  });

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolio-blog-posts', JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = () => {
    if (!newPost.title || !newPost.excerpt || !newPost.category || !newPost.image) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const id = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
    
    setPosts([...posts, { id, ...newPost }]);
    setNewPost({
      title: "",
      excerpt: "",
      content: "",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: "5 min read",
      category: "",
      image: ""
    });
    setIsAddDialogOpen(false);
    toast.success("Blog post added successfully");
  };

  const handleEditPost = () => {
    if (!currentPost || !currentPost.title || !currentPost.excerpt || !currentPost.category || !currentPost.image) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setPosts(posts.map(post => 
      post.id === currentPost.id ? currentPost : post
    ));
    setIsEditDialogOpen(false);
    toast.success("Blog post updated successfully");
  };

  const handleDeletePost = () => {
    if (!currentPost) return;
    
    setPosts(posts.filter(post => post.id !== currentPost.id));
    setIsDeleteDialogOpen(false);
    toast.success("Blog post deleted successfully");
  };

  const openEditDialog = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (post: BlogPost) => {
    setCurrentPost(post);
    setIsDeleteDialogOpen(true);
  };

  const openPreviewModal = (post: BlogPost) => {
    setCurrentPost(post);
    setIsPreviewModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Blog Posts</h3>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No blog posts added yet. Click "Add Post" to get started.
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openPreviewModal(post)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openEditDialog(post)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openDeleteDialog(post)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add Post Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Blog Post</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                placeholder="Enter blog post title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category" 
                value={newPost.category}
                onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                placeholder="e.g. React, CSS, TypeScript"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input 
                id="image" 
                value={newPost.image}
                onChange={(e) => setNewPost({...newPost, image: e.target.value})}
                placeholder="Enter image URL"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="readTime">Read Time</Label>
              <Input 
                id="readTime" 
                value={newPost.readTime}
                onChange={(e) => setNewPost({...newPost, readTime: e.target.value})}
                placeholder="e.g. 5 min read"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea 
                id="excerpt" 
                value={newPost.excerpt}
                onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                placeholder="Brief summary of the blog post"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                placeholder="Full blog post content"
                rows={10}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddPost}>Add Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          {currentPost && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input 
                  id="edit-title" 
                  value={currentPost.title}
                  onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input 
                  id="edit-category" 
                  value={currentPost.category}
                  onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input 
                  id="edit-image" 
                  value={currentPost.image}
                  onChange={(e) => setCurrentPost({...currentPost, image: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-readTime">Read Time</Label>
                <Input 
                  id="edit-readTime" 
                  value={currentPost.readTime}
                  onChange={(e) => setCurrentPost({...currentPost, readTime: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-excerpt">Excerpt</Label>
                <Textarea 
                  id="edit-excerpt" 
                  value={currentPost.excerpt}
                  onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea 
                  id="edit-content" 
                  value={currentPost.content}
                  onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                  rows={10}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditPost}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete the blog post "{currentPost?.title}"? 
            This action cannot be undone.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeletePost}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <BlogPostModal 
        post={currentPost} 
        isOpen={isPreviewModalOpen} 
        onClose={() => setIsPreviewModalOpen(false)} 
      />
    </div>
  );
};

export default BlogManager;
