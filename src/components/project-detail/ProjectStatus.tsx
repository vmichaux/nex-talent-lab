
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface ProjectStatusProps {
  isEditing: boolean;
  status: string;
  editedStatus: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function ProjectStatus({
  isEditing,
  status,
  editedStatus,
  handleInputChange
}: ProjectStatusProps) {
  return isEditing ? (
    <div className="mb-4">
      <Label htmlFor="status">Status</Label>
      <select
        id="status"
        name="status"
        value={editedStatus || 'Open'}
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
      status === "Urgent" ? "bg-red-100 text-red-800 hover:bg-red-100" :
      status === "Closed" ? "bg-gray-100 text-gray-800 hover:bg-gray-100" :
      "bg-green-100 text-green-800 hover:bg-green-100"
    }>
      {status}
    </Badge>
  );
}
