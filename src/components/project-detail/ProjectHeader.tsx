import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Pencil, Trash2, Share2, Tag } from "lucide-react";
import { Project } from "@/types/project";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ProjectHeaderProps {
  project: Project;
  isEditing: boolean;
  isOwner: boolean;
  editedProject: Partial<Project>;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleEditClick: () => void;
  handleDeleteProject: () => void;
  handleApplyClick: () => void;
  navigateBack: () => void;
}

export function ProjectHeader({
  project,
  isEditing,
  isOwner,
  editedProject,
  deleteDialogOpen,
  setDeleteDialogOpen,
  handleInputChange,
  handleEditClick,
  handleDeleteProject,
  handleApplyClick,
  navigateBack
}: ProjectHeaderProps) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-8">
        <Button 
          variant="ghost" 
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          onClick={navigateBack}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Button>
        
        <div className="flex gap-3">
          {isOwner ? (
            <>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleEditClick}
              >
                <Pencil size={16} className="mr-2" />
                Edit Project
              </Button>
              
              <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete Project
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your project.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteProject}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleApplyClick}
            >
              Apply to Collaborate
            </Button>
          )}
          
          <Button 
            variant="outline" 
            className="border-purple-600 text-purple-600 hover:bg-purple-50"
          >
            <Share2 size={16} className="mr-2" />
            Share Project
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          {isEditing ? (
            <div className="space-y-4 max-w-2xl">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input 
                  id="title" 
                  name="title"
                  value={editedProject.title || ''}
                  onChange={handleInputChange}
                  className="text-2xl font-bold"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={editedProject.category || ''}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Writing">Writing</option>
                  <option value="Music">Music</option>
                  <option value="Video">Video</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Tag size={16} />
                <span>{project.category}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.skills && project.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex gap-4">
          {project.progress !== undefined && !isEditing && (
            <div className="bg-white p-4 rounded-lg shadow-sm border min-w-40">
              <p className="text-sm text-gray-500 mb-2">Project Progress</p>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          )}
        </div>
      </div>
      
      {isEditing ? (
        <div className="mb-4">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            value={editedProject.status || 'Open'}
            onChange={handleInputChange}
            className="flex h-10 w-48 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            <option value="Open">Open</option>
            <option value="Urgent">Urgent</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      ) : (
        <Badge className={
          project.status === "Urgent" ? "bg-red-100 text-red-800 hover:bg-red-100" :
          project.status === "Closed" ? "bg-gray-100 text-gray-800 hover:bg-gray-100" :
          "bg-green-100 text-green-800 hover:bg-green-100"
        }>
          {project.status}
        </Badge>
      )}
    </div>
  );
}
