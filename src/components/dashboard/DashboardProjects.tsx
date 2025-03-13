
import { useState, useEffect } from "react";
import { Briefcase, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Project } from "@/types/project";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const fetchProjects = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        console.log("Fetching projects for user:", currentUser.uid);
        
        // Directly fetch projects from Firestore
        const projectsCollection = collection(db, "projects");
        const projectsQuery = query(
          projectsCollection,
          where("userId", "==", currentUser.uid)
        );
        
        const projectsSnapshot = await getDocs(projectsQuery);
        console.log("Query snapshot size:", projectsSnapshot.size);
        
        const fetchedProjects = projectsSnapshot.docs.map(doc => {
          const data = doc.data();
          // Handle various timestamp formats
          let createdAt;
          if (data.createdAt instanceof Timestamp) {
            createdAt = data.createdAt.toDate();
          } else if (data.createdAt && typeof data.createdAt.toDate === 'function') {
            createdAt = data.createdAt.toDate();
          } else {
            createdAt = new Date();
          }
          
          return {
            id: doc.id,
            ...data,
            createdAt
          } as Project;
        });
        
        console.log("Raw fetched projects:", fetchedProjects);
        
        // Sort projects by creation date (newest first)
        const sortedProjects = fetchedProjects.sort((a, b) => {
          const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
          const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
        
        console.log("Sorted user projects:", sortedProjects);
        setProjects(sortedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [currentUser]);
  
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Active Projects
        </h2>
        <Button variant="outline" className="gap-1" onClick={() => navigate('/explore-projects')}>
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((skeleton) => (
            <Card key={skeleton} className="overflow-hidden shadow-md">
              <CardHeader>
                <Skeleton className="h-6 w-2/3 rounded animate-pulse" />
                <Skeleton className="h-4 w-full rounded animate-pulse mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full rounded animate-pulse" />
                <Skeleton className="h-20 w-full rounded animate-pulse mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Card key={project.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress || 0}%</span>
                    </div>
                    <Progress value={project.progress || 0} className="h-2" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.skills && project.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-600">
                      <Clock className="inline-block h-3 w-3 mr-1" />
                      Deadline: {project.deadline || "Not set"}
                    </div>
                    <Badge className={
                      project.status === "Urgent" ? "bg-red-100 text-red-800 hover:bg-red-100" :
                      project.status === "Closed" ? "bg-gray-100 text-gray-800 hover:bg-gray-100" :
                      "bg-green-100 text-green-800 hover:bg-green-100"
                    }>
                      {project.status}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="default" className="w-full" onClick={() => navigate(`/project/${project.id}`)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-10 bg-gray-50 rounded-md">
              <p className="text-gray-600 mb-4">You haven't created any projects yet.</p>
              <Button onClick={() => navigate('/explore-projects')}>
                Create Your First Project
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
