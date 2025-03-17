
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{post.category}</Badge>
          </div>
          <DialogTitle className="text-2xl font-bold">{post.title}</DialogTitle>
          <DialogDescription className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <Clock className="mr-1 h-4 w-4" />
            <span>{post.readTime}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          {post.image && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
            
            {/* Full blog content - this would normally come from your CMS or API */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
              nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl 
              nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl 
              aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Key Concepts</h2>
            <p>
              Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id 
              nibh ultricies vehicula ut id elit. Nullam quis risus eget urna mollis 
              ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.
            </p>
            
            <ul className="list-disc pl-5 my-4">
              <li>First important point about this topic</li>
              <li>Second key concept that readers should understand</li>
              <li>Third insight that makes this article valuable</li>
              <li>Final thought to wrap up the list of key points</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Practical Applications</h2>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla 
              non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, 
              vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor mauris 
              condimentum nibh, ut fermentum massa justo sit amet risus.
            </p>
            
            <blockquote className="border-l-4 border-primary pl-4 italic my-6">
              "This is an important quote from the article that emphasizes a key point 
              and adds visual interest to the page layout."
            </blockquote>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Conclusion</h2>
            <p>
              Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis 
              ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. 
              Etiam porta sem malesuada magna mollis euismod.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostModal;
