
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SkillsManager from "@/components/admin/SkillsManager";
import BlogManager from "@/components/admin/BlogManager";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your portfolio content</p>
          </div>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="skills" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-2">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills Management</CardTitle>
                <CardDescription>
                  Add, edit, or remove skills that appear in your portfolio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SkillsManager />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="blog" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Blog Management</CardTitle>
                <CardDescription>
                  Create, edit, or delete blog posts for your portfolio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BlogManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
