
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" aria-label="GitHub" className="rounded-full">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter" className="rounded-full">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="LinkedIn" className="rounded-full">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Email" className="rounded-full">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
