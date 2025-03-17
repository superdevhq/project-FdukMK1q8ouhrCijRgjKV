
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogPost, BlogPostClient, toClientBlogPost, toDbBlogPost } from "@/types/blog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Edit, Eye, Plus } from "lucide-react";
import BlogPostModal from "../BlogPostModal";

const BlogManager = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostClient[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPostClient | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPostClient>>({
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: "5 min read",
    category: "",
    image: ""
  });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPost = async () => {
    try {
      // Validate form data
      if (!formData.title || !formData.excerpt || !formData.category || !formData.image) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }

      // Convert to DB format
      const dbPost = toDbBlogPost({
        id: 0, // Will be assigned by the database
        title: formData.title!,
        excerpt: formData.excerpt!,
        content: formData.content || "",
        date: formData.date!,
        readTime: formData.readTime!,
        category: formData.category!,
        image: formData.image!
      });

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([dbPost])
        .select();

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        toast({
          title: "Success",
          description: "Blog post added successfully!",
        });
        
        // Reset form and close dialog
        setFormData({
          title: "",
          excerpt: "",
          content: "",
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          readTime: "5 min read",
          category: "",
          image: ""
        });
        setIsAddDialogOpen(false);
        
        // Refresh blog posts
        fetchBlogPosts();
      }
    } catch (error) {
      console.error('Error adding blog post:', error);
      toast({
        title: "Error",
        description: "Failed to add blog post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEditPost = async () => {
    if (!currentPost) return;

    try {
      // Validate form data
      if (!formData.title || !formData.excerpt || !formData.category || !formData.image) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }

      // Convert to DB format
      const dbPost = toDbBlogPost({
        ...currentPost,
        title: formData.title!,
        excerpt: formData.excerpt!,
        content: formData.content || "",
        date: formData.date!,
        readTime: formData.readTime!,
        category: formData.category!,
        image: formData.image!
      });

      const { error } = await supabase
        .from('blog_posts')
        .update(dbPost)
        .eq('id', currentPost.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Blog post updated successfully!",
      });
      
      // Reset form and close dialog
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        readTime: "5 min read",
        category: "",
        image: ""
      });
      setCurrentPost(null);
      setIsEditDialogOpen(false);
      
      // Refresh blog posts
      fetchBlogPosts();
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast({
        title: "Error",
        description: "Failed to update blog post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Blog post deleted successfully!",
      });
      
      // Refresh blog posts
      fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (post: BlogPostClient) => {
    setCurrentPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content || "",
      date: post.date,
      readTime: post.readTime,
      category: post.category,
      image: post.image
    });
    setIsEditDialogOpen(true);
  };

  const openPreviewDialog = (post: BlogPostClient) => {
    setCurrentPost(post);
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Post
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          {Array.from(new Set(blogPosts.map(post => post.category))).map(category => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-muted rounded"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 bg-muted rounded w-full"></div>
                  </CardFooter>
                </Card>
              ))
            ) : blogPosts.length > 0 ? (
              blogPosts.map(post => (
                <Card key={post.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span className="line-clamp-1">{post.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm px-2 py-1 bg-secondary rounded-full">{post.category}</span>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                    <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => openPreviewDialog(post)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(post)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">No blog posts found. Add your first post!</p>
              </div>
            )}
          </div>
        </TabsContent>

        {Array.from(new Set(blogPosts.map(post => post.category))).map(category => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogPosts
                .filter(post => post.category === category)
                .map(post => (
                  <Card key={post.id}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span className="line-clamp-1">{post.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm px-2 py-1 bg-secondary rounded-full">{post.category}</span>
                        <span className="text-sm text-muted-foreground">{post.date}</span>
                      </div>
                      <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openPreviewDialog(post)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(post)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Add Post Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Blog Post</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter post title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Enter a short excerpt"
                rows={2}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Enter post content"
                rows={8}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="e.g., May 15, 2023"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="readTime">Read Time</Label>
                <Input
                  id="readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  placeholder="e.g., 5 min read"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., React, CSS, TypeScript"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </div>
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                  }}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPost}>Add Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter post title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-excerpt">Excerpt</Label>
              <Textarea
                id="edit-excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Enter a short excerpt"
                rows={2}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Enter post content"
                rows={8}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="e.g., May 15, 2023"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-readTime">Read Time</Label>
                <Input
                  id="edit-readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  placeholder="e.g., 5 min read"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <Input
                id="edit-category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., React, CSS, TypeScript"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </div>
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                  }}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPost}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <BlogPostModal
        post={currentPost}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};

export default BlogManager;
