
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Skill } from "@/types/skill";

const SkillsManager = () => {
  const [skills, setSkills] = useState<Skill[]>(() => {
    const savedSkills = localStorage.getItem('portfolio-skills');
    return savedSkills ? JSON.parse(savedSkills) : [
      { id: 1, name: "React", level: 90, category: "Frontend" },
      { id: 2, name: "TypeScript", level: 85, category: "Languages" },
      { id: 3, name: "Node.js", level: 80, category: "Backend" },
      { id: 4, name: "CSS/Tailwind", level: 90, category: "Frontend" },
      { id: 5, name: "UI/UX Design", level: 75, category: "Design" }
    ];
  });
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);
  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>({
    name: "",
    level: 50,
    category: ""
  });

  // Save skills to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolio-skills', JSON.stringify(skills));
  }, [skills]);

  const handleAddSkill = () => {
    if (!newSkill.name || !newSkill.category) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const id = skills.length > 0 ? Math.max(...skills.map(skill => skill.id)) + 1 : 1;
    
    setSkills([...skills, { id, ...newSkill }]);
    setNewSkill({ name: "", level: 50, category: "" });
    setIsAddDialogOpen(false);
    toast.success("Skill added successfully");
  };

  const handleEditSkill = () => {
    if (!currentSkill || !currentSkill.name || !currentSkill.category) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setSkills(skills.map(skill => 
      skill.id === currentSkill.id ? currentSkill : skill
    ));
    setIsEditDialogOpen(false);
    toast.success("Skill updated successfully");
  };

  const handleDeleteSkill = () => {
    if (!currentSkill) return;
    
    setSkills(skills.filter(skill => skill.id !== currentSkill.id));
    setIsDeleteDialogOpen(false);
    toast.success("Skill deleted successfully");
  };

  const openEditDialog = (skill: Skill) => {
    setCurrentSkill(skill);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (skill: Skill) => {
    setCurrentSkill(skill);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Skills</h3>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No skills added yet. Click "Add Skill" to get started.
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell className="font-medium">{skill.name}</TableCell>
                  <TableCell>{skill.category}</TableCell>
                  <TableCell>{skill.level}%</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openEditDialog(skill)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openDeleteDialog(skill)}
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

      {/* Add Skill Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Skill Name</Label>
              <Input 
                id="name" 
                value={newSkill.name}
                onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                placeholder="e.g. React, JavaScript, UI Design"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category" 
                value={newSkill.category}
                onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                placeholder="e.g. Frontend, Backend, Design"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="level">Proficiency Level: {newSkill.level}%</Label>
              <Input 
                id="level" 
                type="range" 
                min="0" 
                max="100" 
                value={newSkill.level}
                onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddSkill}>Add Skill</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Skill Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Skill</DialogTitle>
          </DialogHeader>
          {currentSkill && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Skill Name</Label>
                <Input 
                  id="edit-name" 
                  value={currentSkill.name}
                  onChange={(e) => setCurrentSkill({...currentSkill, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input 
                  id="edit-category" 
                  value={currentSkill.category}
                  onChange={(e) => setCurrentSkill({...currentSkill, category: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-level">Proficiency Level: {currentSkill.level}%</Label>
                <Input 
                  id="edit-level" 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={currentSkill.level}
                  onChange={(e) => setCurrentSkill({...currentSkill, level: parseInt(e.target.value)})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditSkill}>Save Changes</Button>
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
            Are you sure you want to delete the skill "{currentSkill?.name}"? 
            This action cannot be undone.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteSkill}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SkillsManager;
