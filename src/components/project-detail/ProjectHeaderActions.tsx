
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Share2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ProjectHeaderActionsProps {
  isOwner: boolean;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  handleEditClick: () => void;
  handleDeleteProject: () => void;
  handleApplyClick: () => void;
}

export function ProjectHeaderActions({
  isOwner,
  deleteDialogOpen,
  setDeleteDialogOpen,
  handleEditClick,
  handleDeleteProject,
  handleApplyClick
}: ProjectHeaderActionsProps) {
  return (
    <div className="flex gap-3">
      {isOwner ? (
        <>
          <Button 
            variant="purple"
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
          variant="purple"
          onClick={handleApplyClick}
        >
          Apply to Collaborate
        </Button>
      )}
      
      <Button 
        variant="purpleOutline"
      >
        <Share2 size={16} className="mr-2" />
        Share Project
      </Button>
    </div>
  );
}
