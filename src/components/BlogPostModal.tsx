
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogPostModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogPostModal = ({ post, isOpen, onClose }: BlogPostModalProps) => {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{post.title}</DialogTitle>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <Clock className="mr-1 h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </DialogHeader>
        
        <div className="my-4">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
        
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
          ) : (
            <p className="text-muted-foreground">No content available for this post.</p>
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostModal;
