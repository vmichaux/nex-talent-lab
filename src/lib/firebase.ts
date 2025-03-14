
// Re-export from our smaller modules for backward compatibility
import app, { auth, db, storage, googleProvider } from './firebase-config';
import { UserProfile, getUserProfile, getUserFullName } from './user-service';
import { ProjectData, getProjects, getUserProjects } from './project-service';

export {
  app as default,
  auth,
  db,
  storage,
  googleProvider,
  // User types and functions
  type UserProfile,
  getUserProfile,
  getUserFullName,
  // Project types and functions
  type ProjectData,
  getProjects,
  getUserProjects
};
