
import { useState, useEffect } from "react";
import { Briefcase, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db, getUserFullName } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Project } from "@/types/project"; // Import Project type

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
        // Get projects created by the current user (using userId field), limited to 3
        const projectsQuery = query(
          collection(db, "projects"),
          where("userId", "==", currentUser.uid),
          orderBy("createdAt", "desc"),
          limit(3)
        );
        
        const querySnapshot = await getDocs(projectsQuery);
        const fetchedProjects = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (fetchedProjects.length > 0) {
          setProjects(fetchedProjects as Project[]);
        } else {
          // Fallback to sample data if no projects yet
          // User can create projects using the AddProjectButton
          setProjects([]);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
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
                <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
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
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2" 
                        style={{ width: `${project.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-600">
                      <Clock className="inline-block h-3 w-3 mr-1" />
                      Deadline: {project.deadline}
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
              <Button onClick={() => document.querySelector('button:has(.h-4.w-4)')?.click()}>
                Create Your First Project
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
