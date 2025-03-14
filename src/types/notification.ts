
import { Timestamp } from "firebase/firestore";

export type NotificationType = 
  | "message" 
  | "application" 
  | "project_update" 
  | "connection"
  | "review";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  content: string;
  read: boolean;
  createdAt: Timestamp | Date;
  link?: string;
  relatedId?: string; // ID of related item (project, application, message, etc.)
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
}
